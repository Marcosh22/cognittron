import { Driver, Session, Record, int } from "neo4j-driver";
import Academy from "../../domain/entity/academy";
import AcademyRepositoryInterface from "../../domain/repository/academy.repository.interface";
import AcademyFactory from "../../domain/factory/academy.factory";
import NotFoundError from "../../../../errors/not-found.error";
import ValidationError from "../../../../errors/validation.error";

export default class AcademyRepository implements AcademyRepositoryInterface {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async create(data: Academy): Promise<Academy> {
    const session: Session = this._driver.session();

    const idExists = await this.isIdExists(session, data.id);
    if (idExists) {
      throw new ValidationError(
        `There is already an Academy with id '${data.id}'`,
        { id: data.id }
      );
    }

    try {
      const result: Record = await session.executeWrite(async (tx) => {
        const query = `
          CREATE (a:Academy { id: $id, title: $title })
          RETURN a
        `;
        const params = { id: data.id, title: data.title };

        const response = await tx.run(query, params);
        return response.records[0];
      });

      const createdAcademy: Academy = AcademyFactory.create({
        id: result.get("a").properties.id,
        title: result.get("a").properties.title,
      });
      return createdAcademy;
    } finally {
      await session.close();
    }
  }

  async show(id: string): Promise<Academy> {
    const session: Session = this._driver.session();

    try {
      const result: Record = await session.executeRead(async (tx) => {
        const query = `
          MATCH (a:Academy { id: $id })
          RETURN a
        `;
        const params = { id };

        const response = await tx.run(query, params);
        return response.records[0];
      });

      if (!result) {
        throw new NotFoundError(
          `Could not find an academy with the id '${id}'`
        );
      }

      const foundAcademy: Academy = AcademyFactory.create({
        id: result.get("a").properties.id,
        title: result.get("a").properties.title,
      });
      return foundAcademy;
    } finally {
      await session.close();
    }
  }

  async list(
    limit: number = 10,
    page: number = 1
  ): Promise<{ data: Academy[]; total: number }> {
    const session: Session = this._driver.session();

    try {
      const skip = (page - 1) * limit;

      const result: Record[] = await session.executeRead(async (tx) => {
        const query = `
          MATCH (a:Academy)
          WITH a, COUNT(a) AS total
          RETURN a, total
          SKIP $skip
          LIMIT $limit
        `;
        const params = { skip: int(skip), limit: int(limit)};

        const response = await tx.run(query, params);
        return response.records;
      });

      const academies = result.map((record) => AcademyFactory.create({
        id: record.get("a").properties.id,
        title: record.get("a").properties.title,
      }));
      const totalCount = result[0].get("total").toNumber();

      return { data: academies, total: totalCount };
    } finally {
      await session.close();
    }
  }

  async isIdExists(session: Session, id: string): Promise<boolean> {
    const result = await session.executeRead(async (tx) => {
      const query = `
        MATCH (a:Academy { id: $id })
        RETURN a
      `;
  
      const params = { id };
      const response = await tx.run(query, params);
      return response.records.length > 0;
    });
  
    return result;
  }
}
