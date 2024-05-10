import { Driver, Session, Record, int } from "neo4j-driver";
import Step from "../../domain/entity/step";
import StepRepositoryInterface from "../../domain/repository/step.repository.interface";
import StepFactory from "../../domain/factory/step.factory";
import NotFoundError from "../../../../errors/not-found.error";
import TrailRepository from "../../../trail/infrastructure/repository/trail.repository";
import ValidationError from "../../../../errors/validation.error";

export default class StepRepository implements StepRepositoryInterface {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async create(data: Step): Promise<Step> {
    const session: Session = this._driver.session();

    const idExists = await this.isIdExists(session, data.id);
    if (idExists) {
      throw new ValidationError(
        `There is already a Step with id '${data.id}'`,
        { id: data.id }
      );
    }

    try {
      const trailRepository = new TrailRepository(this._driver);
      await trailRepository.show(data.trailId);

      const result: Record = await session.executeWrite(async (tx) => {
        const query = `
          MATCH (tr:Trail { id: $trailId })
          CREATE (s:Step { id: $id, title: $title, content: $content })
          MERGE (s)-[:BELONGS_TO]->(tr)
          RETURN s
        `;

        const params = {
          id: data.id,
          title: data.title,
          content: data.content,
          trailId: data.trailId,
        };

        const response = await tx.run(query, params);
        return response.records[0];
      });

      const createdStep: Step = StepFactory.create({
        id: result.get("s").properties.id,
        title: result.get("s").properties.title,
        content: result.get("s").properties.content,
        trailId: data.trailId,
      });
      return createdStep;
    } finally {
      await session.close();
    }
  }

  async show(id: string): Promise<Step> {
    const session: Session = this._driver.session();

    try {
      const result: Record = await session.executeRead(async (tx) => {
        const query = `
        MATCH (s:Step { id: $id })-[:BELONGS_TO]->(tr:Trail)
        RETURN s, tr.id as trailId
        `;
        const params = { id };

        const response = await tx.run(query, params);
        return response.records[0];
      });

      if (!result) {
        throw new NotFoundError(`Could not find a step with the id '${id}'`);
      }

      const foundStep: Step = StepFactory.create({
        id: result.get("s").properties.id,
        title: result.get("s").properties.title,
        content: result.get("s").properties.content,
        trailId: result.get("trailId"),
      });
      return foundStep;
    } finally {
      await session.close();
    }
  }

  async list(
    limit: number = 10,
    page: number = 1
  ): Promise<{ data: Step[]; total: number }> {
    const session: Session = this._driver.session();

    try {
      const skip = (page - 1) * limit;

      const result: Record[] = await session.executeRead(async (tx) => {
        const query = `
          MATCH (s:Step)-[:BELONGS_TO]->(tr:Trail)
          WITH s, COUNT(s) AS total, tr
          RETURN s, total, tr.id as trailId
          SKIP $skip
          LIMIT $limit
        `;
        const params = { skip: int(skip), limit: int(limit) };

        const response = await tx.run(query, params);
        return response.records;
      });

      const steps = result.map((record) =>
        StepFactory.create({
          id: record.get("s").properties.id,
          title: record.get("s").properties.title,
          content: record.get("s").properties.content,
          trailId: record.get("trailId"),
        })
      );
      const totalCount = result[0].get("total").toNumber();

      return { data: steps, total: totalCount };
    } finally {
      await session.close();
    }
  }

  async listByTrailId(
    trailId: string,
    limit: number = 10,
    page: number = 1
  ): Promise<{ data: Step[]; total: number }> {
    const session: Session = this._driver.session();

    try {
      const trailRepository = new TrailRepository(this._driver);
      await trailRepository.show(trailId);

      const skip = (page - 1) * limit;

      const result: Record[] = await session.executeRead(async (tx) => {
        const query = `
          MATCH (s:Step)-[:BELONGS_TO]->(tr:Trail { id: $trailId })
          WITH s, COUNT(s) AS total
          RETURN s, total
          SKIP $skip
          LIMIT $limit
        `;
        const params = { trailId, skip: int(skip), limit: int(limit) };

        const response = await tx.run(query, params);
        return response.records;
      });

      const steps = result.map((record) =>
        StepFactory.create({
          id: record.get("s").properties.id,
          title: record.get("s").properties.title,
          content: record.get("s").properties.content,
          trailId: trailId,
        })
      );
      const totalCount = result[0].get("total").toNumber();

      return { data: steps, total: totalCount };
    } finally {
      await session.close();
    }
  }

  async isIdExists(session: Session, id: string): Promise<boolean> {
    const result = await session.executeRead(async (tx) => {
      const query = `
        MATCH (s:Step { id: $id })
        RETURN s
      `;

      const params = { id };
      const response = await tx.run(query, params);
      return response.records.length > 0;
    });

    return result;
  }
}
