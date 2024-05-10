import { config } from "dotenv";
import { closeDriver, getDriver, initDriver } from "../../../../database/neo4j";
import TrailRepository from "./trail.repository";
import TrailFactory from "../../domain/factory/trail.factory";

describe("Create a Trail", () => {
  const academy = {
    id: "create-trail-testing-academy-id-1",
    title: "Sample Academy 01",
  };
  const theme = {
    id: "create-trail-testing-theme-id-1",
    title: "Sample Theme 01",
    academyId: academy.id,
  };
  const trail1 = {
    id: "create-trail-testing-trail-id-1",
    title: "Sample Trail 01",
    themeId: theme.id,
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
      tx.run("MATCH (tr:Trail {id: $id}) DETACH DELETE tr", { id: trail1.id })
    );
    await session.close();
    await closeDriver();
  });

  it("should create a trail", async () => {
    const driver = getDriver();
    const repository = new TrailRepository(driver);

    const trail = TrailFactory.create({
      id: trail1.id,
      title: trail1.title,
      themeId: trail1.themeId,
    });
    const output = await repository.create(trail);

    expect(output.id).toEqual(trail1.id);
    expect(output.title).toEqual(trail1.title);
    expect(output.themeId).toEqual(trail1.themeId);

    const session = driver.session();

    const res = await session.executeRead((tx) =>
      tx.run(
        " MATCH (tr:Trail {id: $id})-[:BELONGS_TO]->(t:Theme) RETURN tr, t.id as themeId",
        { id: trail1.id }
      )
    );

    expect(res.records.length).toEqual(1);

    const trailRecord = res.records[0].get("tr");
    const themeId = res.records[0].get("themeId");

    expect(trailRecord.properties.id).toEqual(trail1.id);
    expect(trailRecord.properties.title).toEqual(trail1.title);
    expect(themeId).toEqual(trail1.themeId);
  });

  it("should throw error if id is repeated", async () => {
    const driver = getDriver();
    const repository = new TrailRepository(driver);

    const trail = TrailFactory.create({
      id: trail1.id,
      title: trail1.title,
      themeId: trail1.themeId,
    });

    try {
      await repository.create(trail);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should throw a NotFoundError if the themeId is invalid", async () => {
    const driver = getDriver();
    const repository = new TrailRepository(driver);

    const trail = TrailFactory.create({
      id: trail1.id,
      title: trail1.title,
      themeId: "invalid-theme-id",
    });

    try {
      await repository.create(trail);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should retrieve trail details by id", async () => {
    const driver = getDriver();
    const repository = new TrailRepository(driver);

    const output = await repository.show(trail1.id);

    expect(output).toBeDefined();
    expect(output.id).toEqual(trail1.id);
    expect(output.title).toEqual(trail1.title);
    expect(output.themeId).toEqual(trail1.themeId);
  });

  it("should throw a NotFoundError if the trail do not exist", async () => {
    const trailId = "non-existing-testing-trail-id";
    const driver = getDriver();
    const repository = new TrailRepository(driver);

    try {
      await repository.show(trailId);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should list all trails", async () => {
    const driver = getDriver();
    const repository = new TrailRepository(driver);

    const output = await repository.list();

    expect(output.data).toBeDefined();
    expect(output.data).toBeInstanceOf(Array);
    expect(output.total).toBeGreaterThan(0);
    expect(output.data.length).toBeGreaterThan(0);
  });

  it("should list all trails by themeId", async () => {
    const driver = getDriver();
    const repository = new TrailRepository(driver);

    const output = await repository.listByThemeId(trail1.themeId);

    expect(output.data).toBeDefined();
    expect(output.data).toBeInstanceOf(Array);
    expect(output.total).toBeGreaterThan(0);
    expect(output.data.length).toBeGreaterThan(0);
  });

  it("should not list trails if the themeId is invalid", async () => {
    const driver = getDriver();
    const repository = new TrailRepository(driver);

    try {
      await repository.listByThemeId(trail1.themeId);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });
});
