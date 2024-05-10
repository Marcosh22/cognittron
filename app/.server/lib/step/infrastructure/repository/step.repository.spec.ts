import { config } from "dotenv";
import { closeDriver, getDriver, initDriver } from "../../../../database/neo4j";
import StepRepository from "./step.repository";
import StepFactory from "../../domain/factory/step.factory";

describe("Create a Step", () => {
  const academy = {
    id: "create-step-testing-academy-id-1",
    title: "Sample Academy 01",
  };
  const theme = {
    id: "create-step-testing-theme-id-1",
    title: "Sample Theme 01",
    academyId: academy.id,
  };
  const trail = {
    id: "create-step-testing-trail-id-1",
    title: "Sample Trail 01",
    themeId: theme.id,
  };
  const step1 = {
    id: "create-step-testing-step-id-1",
    title: "Sample Step 01",
    content: "Sample Step 01 Content",
    trailId: trail.id,
  };

  beforeAll(async () => {
    config();

    const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

    const driver = await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD);

    const session = driver.session();

    await session.executeWrite((tx) =>
      tx.run("CREATE (a:Academy { id: $id, title: $title }) RETURN a", academy)
    );

    await session.executeWrite((tx) =>
      tx.run(
        `MATCH (a:Academy { id: $academyId })
          CREATE (t:Theme { id: $id, title: $title })
          MERGE (t)-[:BELONGS_TO]->(a)
          RETURN t`,
        theme
      )
    );

    await session.executeWrite((tx) =>
      tx.run(
        `MATCH (t:Theme { id: $themeId })
          CREATE (tr:Trail { id: $id, title: $title })
          MERGE (tr)-[:BELONGS_TO]->(t)
          RETURN tr`,
        trail
      )
    );

    await session.close();
  });

  afterAll(async () => {
    const driver = getDriver();

    const session = driver.session();
    await session.executeWrite((tx) =>
      tx.run("MATCH (a:Academy {id: $id}) DETACH DELETE a", { id: academy.id })
    );
    await session.executeWrite((tx) =>
      tx.run("MATCH (t:Theme {id: $id}) DETACH DELETE t", { id: theme.id })
    );
    await session.executeWrite((tx) =>
      tx.run("MATCH (tr:Trail {id: $id}) DETACH DELETE tr", { id: trail.id })
    );
    await session.executeWrite((tx) =>
      tx.run("MATCH (s:Step {id: $id}) DETACH DELETE s", { id: step1.id })
    );
    await session.close();
    await closeDriver();
  });

  it("should create a step", async () => {
    const driver = getDriver();
    const repository = new StepRepository(driver);

    const step = StepFactory.create({
      id: step1.id,
      title: step1.title,
      content: step1.content,
      trailId: step1.trailId,
    });
    const output = await repository.create(step);

    expect(output.id).toEqual(step1.id);
    expect(output.title).toEqual(step1.title);
    expect(output.content).toEqual(step1.content);
    expect(output.trailId).toEqual(step1.trailId);

    const session = driver.session();

    const res = await session.executeRead((tx) =>
      tx.run(
        "MATCH (s:Step {id: $id})-[:BELONGS_TO]->(tr:Trail) RETURN s, tr.id as trailId",
        { id: step1.id }
      )
    );

    expect(res.records.length).toEqual(1);

    const stepRecord = res.records[0].get("s");
    const trailId = res.records[0].get("trailId");

    expect(stepRecord.properties.id).toEqual(step1.id);
    expect(stepRecord.properties.title).toEqual(step1.title);
    expect(stepRecord.properties.content).toEqual(step1.content);
    expect(trailId).toEqual(step1.trailId);
  });

  it("should throw error if id is repeated", async () => {
    const driver = getDriver();
    const repository = new StepRepository(driver);

    const step = StepFactory.create({
      id: step1.id,
      title: step1.title,
      content: step1.content,
      trailId: step1.trailId,
    });

    try {
      await repository.create(step);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should throw a NotFoundError if the trailId is invalid", async () => {
    const driver = getDriver();
    const repository = new StepRepository(driver);

    const step = StepFactory.create({
      id: step1.id,
      title: step1.title,
      content: step1.content,
      trailId: "invalid-theme-id",
    });

    try {
      await repository.create(step);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should retrieve step details by id", async () => {
    const driver = getDriver();
    const repository = new StepRepository(driver);

    const output = await repository.show(step1.id);

    expect(output).toBeDefined();
    expect(output.id).toEqual(step1.id);
    expect(output.title).toEqual(step1.title);
    expect(output.content).toEqual(step1.content);
    expect(output.trailId).toEqual(step1.trailId);
  });

  it("should throw a NotFoundError if the step do not exist", async () => {
    const stepId = "non-existing-testing-step-id";
    const driver = getDriver();
    const repository = new StepRepository(driver);

    try {
      await repository.show(stepId);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should list all steps", async () => {
    const driver = getDriver();
    const repository = new StepRepository(driver);

    const output = await repository.list();

    expect(output.data).toBeDefined();
    expect(output.data).toBeInstanceOf(Array);
    expect(output.total).toBeGreaterThan(0);
    expect(output.data.length).toBeGreaterThan(0);
  });

  it("should list all steps by trailId", async () => {
    const driver = getDriver();
    const repository = new StepRepository(driver);

    const output = await repository.listByTrailId(step1.trailId);

    expect(output.data).toBeDefined();
    expect(output.data).toBeInstanceOf(Array);
    expect(output.total).toBeGreaterThan(0);
    expect(output.data.length).toBeGreaterThan(0);
  });

  it("should not list steps if the trailId is invalid", async () => {
    const driver = getDriver();
    const repository = new StepRepository(driver);

    try {
      await repository.listByTrailId(step1.trailId);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });
});
