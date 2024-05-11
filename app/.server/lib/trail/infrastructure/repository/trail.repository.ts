import { Driver, Session, Record, int } from "neo4j-driver";
import Trail from "../../domain/entity/trail";
import TrailRepositoryInterface from "../../domain/repository/trail.repository.interface";
import TrailFactory from "../../domain/factory/trail.factory";
import NotFoundError from "../../../../errors/not-found.error";
import ThemeRepository from "../../../theme/infrastructure/repository/theme.repository";
import ValidationError from "../../../../errors/validation.error";
import getNodesCount from "../../../utils/getNodesCount";

export default class TrailRepository implements TrailRepositoryInterface {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async create(data: Trail): Promise<Trail> {
    const session: Session = this._driver.session();

    const idExists = await this.isIdExists(session, data.id);
    if (idExists) {
      throw new ValidationError(
        `There is already a Trail with id '${data.id}'`,
        { id: data.id }
      );
    }

    try {
      const themeRepository = new ThemeRepository(this._driver);
      await themeRepository.show(data.themeId);

      const result: Record = await session.executeWrite(async (tx) => {
        const query = `
          MATCH (t:Theme { id: $themeId })
          CREATE (tr:Trail { id: $id, title: $title, createdAt: timestamp() })
          MERGE (tr)-[:BELONGS_TO]->(t)
          RETURN tr
        `;

        const params = {
          id: data.id,
          title: data.title,
          themeId: data.themeId,
        };

        const response = await tx.run(query, params);
        return response.records[0];
      });

      const createdTrail: Trail = TrailFactory.create({
        id: result.get("tr").properties.id,
        title: result.get("tr").properties.title,
        themeId: data.themeId,
      });
      return createdTrail;
    } finally {
      await session.close();
    }
  }

  async show(id: string): Promise<Trail> {
    const session: Session = this._driver.session();

    try {
      const result: Record = await session.executeRead(async (tx) => {
        const query = `
        MATCH (tr:Trail { id: $id })-[:BELONGS_TO]->(t:Theme)
        RETURN tr, t.id as themeId
        `;
        const params = { id };

        const response = await tx.run(query, params);
        return response.records[0];
      });

      if (!result) {
        throw new NotFoundError(`Could not find a trail with the id '${id}'`);
      }

      const foundTrail: Trail = TrailFactory.create({
        id: result.get("tr").properties.id,
        title: result.get("tr").properties.title,
        themeId: result.get("themeId"),
      });
      return foundTrail;
    } finally {
      await session.close();
    }
  }

  async list(
    limit: number = 10,
    page: number = 1
  ): Promise<{ data: Trail[]; total: number }> {
    const session: Session = this._driver.session();

    try {
      const skip = (page - 1) * limit;

      const result: Record[] = await session.executeRead(async (tx) => {
        const query = `
          MATCH (tr:Trail)-[:BELONGS_TO]->(t:Theme)
          WITH tr, COUNT(tr) AS total, t
          RETURN tr, total, t.id as themeId
          ORDER BY tr.createdAt DESC
          SKIP $skip
          LIMIT $limit
        `;
        const params = { skip: int(skip), limit: int(limit) };

        const response = await tx.run(query, params);
        return response.records;
      });

      const trails = result.map((record) =>
        TrailFactory.create({
          id: record.get("tr").properties.id,
          title: record.get("tr").properties.title,
          themeId: record.get("themeId"),
        })
      );
      const totalCount = await getNodesCount(this._driver, 'Trail');

      return { data: trails, total: totalCount };
    } finally {
      await session.close();
    }
  }

  async listByThemeId(
    themeId: string,
    limit: number = 10,
    page: number = 1
  ): Promise<{ data: Trail[]; total: number }> {
    const session: Session = this._driver.session();

    try {
      const themeRepository = new ThemeRepository(this._driver);
      await themeRepository.show(themeId);

      const skip = (page - 1) * limit;

      const result: Record[] = await session.executeRead(async (tx) => {
        const query = `
          MATCH (tr:Trail)-[:BELONGS_TO]->(t:Theme { id: $themeId })
          WITH tr, COUNT(tr) AS total
          RETURN tr, total
          ORDER BY tr.createdAt DESC
          SKIP $skip
          LIMIT $limit
        `;
        const params = { themeId, skip: int(skip), limit: int(limit) };

        const response = await tx.run(query, params);
        return response.records;
      });

      const trails = result.map((record) =>
        TrailFactory.create({
          id: record.get("tr").properties.id,
          title: record.get("tr").properties.title,
          themeId: themeId,
        })
      );
      const totalCount = await getNodesCount(this._driver, 'Trail');

      return { data: trails, total: totalCount };
    } finally {
      await session.close();
    }
  }

  async isIdExists(session: Session, id: string): Promise<boolean> {
    const result = await session.executeRead(async (tx) => {
      const query = `
        MATCH (tr:Trail { id: $id })
        RETURN tr
      `;

      const params = { id };
      const response = await tx.run(query, params);
      return response.records.length > 0;
    });

    return result;
  }
}
