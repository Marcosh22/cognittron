import { config } from "dotenv";
import { closeDriver, getDriver, initDriver } from "../../../../database/neo4j";
import AcademyRepository from "./academy.repository";
import AcademyFactory from "../../domain/factory/academy.factory";

describe("Create an Academy", () => {
  const academy1 = {
    id: "create-academy-testing--academy-id-1",
    title: "Sample Academy 01",
  };
  const academy2 = {
    id: "create-academy-testing--academy-2",
    title: "Sample Academy 02",
  };

  beforeAll(async () => {
    config();

    const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

    const driver = await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD);

    const session = driver.session();

    await session.executeWrite((tx) =>
      tx.run("CREATE (a:Academy { id: $id, title: $title }) RETURN a", academy1)
    );

    await session.close();
  });

  afterAll(async () => {
    const driver = getDriver();

    const session = driver.session();
    await session.executeWrite((tx) =>
      tx.run("MATCH (a:Academy {id: $id}) DETACH DELETE a", { id: academy1.id })
    );
    await session.executeWrite((tx) =>
      tx.run("MATCH (a:Academy {id: $id}) DETACH DELETE a", { id: academy2.id })
    );
    await session.close();
    await closeDriver();
  });

  it("should create an academy", async () => {
    const driver = getDriver();
    const repository = new AcademyRepository(driver);

    const academy = AcademyFactory.create({
      id: academy2.id,
      title: academy2.title,
    });
    const output = await repository.create(academy);

    expect(output.id).toEqual(academy2.id);
    expect(output.title).toEqual(academy2.title);

    const session = driver.session();

    const res = await session.executeRead((tx) =>
      tx.run("MATCH (a:Academy {id: $id}) RETURN a", { id: academy2.id })
    );

    expect(res.records.length).toEqual(1);

    const user = res.records[0].get("a");

    expect(user.properties.id).toEqual(academy2.id);
    expect(user.properties.title).toEqual(academy2.title);
  });

  it("should throw error if id is repeated", async () => {
    const driver = getDriver();
    const repository = new AcademyRepository(driver);

    const academy = AcademyFactory.create({
      id: academy2.id,
      title: academy2.title,
    });

    try {
      await repository.create(academy);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should retrieve academy details by id", async () => {
    const driver = getDriver();
    const repository = new AcademyRepository(driver);

    const output = await repository.show(academy1.id);

    expect(output).toBeDefined();
    expect(output.id).toEqual(academy1.id);
    expect(output.title).toEqual(academy1.title);
  });

  it("should throw a NotFoundError if the academy do not exist", async () => {
    const academyId = "non-existing-testing-academy-id";
    const driver = getDriver();
    const repository = new AcademyRepository(driver);

    try {
      await repository.show(academyId);
      expect(false).toEqual(true);
    } catch (e) {
      expect(true).toEqual(true);
    }
  });

  it("should list all academies", async () => {
    const driver = getDriver();
    const repository = new AcademyRepository(driver);

    const output = await repository.list();

    expect(output.data).toBeDefined();
    expect(output.data).toBeInstanceOf(Array);
    expect(output.total).toBeGreaterThan(1);
    expect(output.data.length).toBeGreaterThan(1);
  });
});
