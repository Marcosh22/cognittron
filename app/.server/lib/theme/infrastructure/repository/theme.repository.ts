import { Driver, Session, Record, int } from "neo4j-driver";
import Theme from "../../domain/entity/theme";
import ThemeRepositoryInterface from "../../domain/repository/theme.repository.interface";
import ThemeFactory from "../../domain/factory/theme.factory";
import NotFoundError from "../../../../errors/not-found.error";
import AcademyRepository from "../../../academy/infrastructure/repository/academy.repository";
import ValidationError from "../../../../errors/validation.error";
import getNodesCount from "../../../utils/getNodesCount";

export default class ThemeRepository implements ThemeRepositoryInterface {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async create(data: Theme): Promise<Theme> {
    const session: Session = this._driver.session();

    const idExists = await this.isIdExists(session, data.id);
    if (idExists) {
      throw new ValidationError(
        `There is already a Theme with id '${data.id}'`,
        { id: data.id }
      );
    }

    try {
      const academyRepository = new AcademyRepository(this._driver);
      await academyRepository.show(data.academyId);

      const result: Record = await session.executeWrite(async (tx) => {
        const query = `
          MATCH (a:Academy { id: $academyId })
          CREATE (t:Theme { id: $id, title: $title, createdAt: timestamp() })
          MERGE (t)-[:BELONGS_TO]->(a)
          RETURN t
        `;

        const params = {
          id: data.id,
          title: data.title,
          academyId: data.academyId,
        };

        const response = await tx.run(query, params);
        return response.records[0];
      });

      const createdTheme: Theme = ThemeFactory.create({
        id: result.get("t").properties.id,
        title: result.get("t").properties.title,
        academyId: data.academyId,
      });
      return createdTheme;
    } finally {
      await session.close();
    }
  }

  async show(id: string): Promise<Theme> {
    const session: Session = this._driver.session();

    try {
      const result: Record = await session.executeRead(async (tx) => {
        const query = `
        MATCH (t:Theme { id: $id })-[:BELONGS_TO]->(a:Academy)
        RETURN t, a.id as academyId
        `;
        const params = { id };

        const response = await tx.run(query, params);
        return response.records[0];
      });

      if (!result) {
        throw new NotFoundError(`Could not find an theme with the id '${id}'`);
      }

      const foundTheme: Theme = ThemeFactory.create({
        id: result.get("t").properties.id,
        title: result.get("t").properties.title,
        academyId: result.get("academyId"),
      });
      return foundTheme;
    } finally {
      await session.close();
    }
  }

  async list(
    limit: number = 10,
    page: number = 1
  ): Promise<{ data: Theme[]; total: number }> {
    const session: Session = this._driver.session();

    try {
      const skip = (page - 1) * limit;

      const result: Record[] = await session.executeRead(async (tx) => {
        const query = `
          MATCH (t:Theme)-[:BELONGS_TO]->(a:Academy)
          WITH t, COUNT(t) AS total, a
          RETURN t, total, a.id as academyId
          ORDER BY t.createdAt DESC
          SKIP $skip
          LIMIT $limit
        `;
        const params = { skip: int(skip), limit: int(limit) };

        const response = await tx.run(query, params);
        return response.records;
      });

      const themes = result.map((record) =>
        ThemeFactory.create({
          id: record.get("t").properties.id,
          title: record.get("t").properties.title,
          academyId: record.get("academyId"),
        })
      );

      const totalCount = await getNodesCount(this._driver, 'Theme');

      return { data: themes, total: totalCount };
    } finally {
      await session.close();
    }
  }

  async listByAcademyId(
    academyId: string,
    limit: number = 10,
    page: number = 1
  ): Promise<{ data: Theme[]; total: number }> {
    const session: Session = this._driver.session();

    try {
      const academyRepository = new AcademyRepository(this._driver);
      await academyRepository.show(academyId);

      const skip = (page - 1) * limit;

      const result: Record[] = await session.executeRead(async (tx) => {
        const query = `
          MATCH (t:Theme)-[:BELONGS_TO]->(a:Academy { id: $academyId })
          WITH t, COUNT(t) AS total
          RETURN t, total
          ORDER BY t.createdAt DESC
          SKIP $skip
          LIMIT $limit
        `;
        const params = { academyId, skip: int(skip), limit: int(limit) };

        const response = await tx.run(query, params);
        return response.records;
      });

      const themes = result.map((record) =>
        ThemeFactory.create({
          id: record.get("t").properties.id,
          title: record.get("t").properties.title,
          academyId: academyId,
        })
      );
      
      const totalCount = await getNodesCount(this._driver, 'Theme');

      return { data: themes, total: totalCount };
    } finally {
      await session.close();
    }
  }

  async isIdExists(session: Session, id: string): Promise<boolean> {
    const result = await session.executeRead(async (tx) => {
      const query = `
        MATCH (t:Theme { id: $id })
        RETURN t
      `;
  
      const params = { id };
      const response = await tx.run(query, params);
      return response.records.length > 0;
    });
  
    return result;
  }
}
