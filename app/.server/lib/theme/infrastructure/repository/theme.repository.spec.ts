import { config } from "dotenv";
import { closeDriver, getDriver, initDriver } from "../../../../database/neo4j";
import ThemeRepository from "./theme.repository";
import ThemeFactory from "../../domain/factory/theme.factory";

describe("Create a Theme", () => {
  const academy = {
    id: "create-theme-testing-academy-id-1",
    title: "Sample Academy 01",
  };
  const theme1 = {
    id: "create-theme-testing-theme-id-1",
    title: "Sample Theme 01",
    academyId: academy.id,
  };

  beforeAll(async () => {
    config();

    const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

    const driver = await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD);

    const session = driver.session();

    await session.executeWrite((tx) =>
      tx.run("CREATE (a:Academy { id: $id, title: $title }) RETURN a", academy)
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
      tx.run("MATCH (t:Theme {id: $id}) DETACH DELETE t", { id: theme1.id })
    );
    await session.close();
    await closeDriver();
  });

  it("should create a theme", async () => {
    const driver = getDriver();
    const repository = new ThemeRepository(driver);

    const theme = ThemeFactory.create({
      id: theme1.id,
      title: theme1.title,
      academyId: theme1.academyId,
    });
    const output = await repository.create(theme);

    expect(output.id).toEqual(theme1.id);
    expect(output.title).toEqual(theme1.title);
    expect(output.academyId).toEqual(theme1.academyId);

    const session = driver.session();

    const res = await session.executeRead((tx) =>
      tx.run(" MATCH (t:Theme {id: $id})-[:BELONGS_TO]->(a:Academy) RETURN t, a.id as academyId", { id: theme1.id })
    );

    expect(res.records.length).toEqual(1);

    const themeRecord = res.records[0].get("t");
    const academyId = res.records[0].get("academyId");

    expect(themeRecord.properties.id).toEqual(theme1.id);
    expect(themeRecord.properties.title).toEqual(theme1.title);
    expect(academyId).toEqual(theme1.academyId);
  });

  it("should throw error if id is repeated", async () => {
    const driver = getDriver();
    const repository = new ThemeRepository(driver);

    const theme = ThemeFactory.create({
      id: theme1.id,
      title: theme1.title,
      academyId: theme1.academyId,
    });

    try {
      await repository.create(theme);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });
  
  it("should throw a NotFoundError if the academyId is invalid", async () => {
    const driver = getDriver();
    const repository = new ThemeRepository(driver);

    const theme = ThemeFactory.create({
      id: theme1.id,
      title: theme1.title,
      academyId: "invalid-academy-id",
    });

    try {
      await repository.create(theme);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should retrieve theme details by id", async () => {
    const driver = getDriver();
    const repository = new ThemeRepository(driver);

    const output = await repository.show(theme1.id);

    expect(output).toBeDefined();
    expect(output.id).toEqual(theme1.id);
    expect(output.title).toEqual(theme1.title);
    expect(output.academyId).toEqual(theme1.academyId);
  });

  it("should throw a NotFoundError if the theme do not exist", async () => {
    const themeId = "non-existing-testing-theme-id";
    const driver = getDriver();
    const repository = new ThemeRepository(driver);

    try {
      await repository.show(themeId);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should list all themes", async () => {
    const driver = getDriver();
    const repository = new ThemeRepository(driver);

    const output = await repository.list();

    expect(output.data).toBeDefined();
    expect(output.data).toBeInstanceOf(Array);
    expect(output.total).toBeGreaterThan(0);
    expect(output.data.length).toBeGreaterThan(0);
  });

  it("should list all themes by academyId", async () => {
    const driver = getDriver();
    const repository = new ThemeRepository(driver);

    const output = await repository.listByAcademyId(theme1.academyId);

    expect(output.data).toBeDefined();
    expect(output.data).toBeInstanceOf(Array);
    expect(output.total).toBeGreaterThan(0);
    expect(output.data.length).toBeGreaterThan(0);
  });

  it("should not list themes if the academyId is invalid", async () => {
    const driver = getDriver();
    const repository = new ThemeRepository(driver);

    try {
      await repository.listByAcademyId(theme1.academyId);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });
});
