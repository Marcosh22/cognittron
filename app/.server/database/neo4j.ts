import neo4j, { Driver } from "neo4j-driver";

let driver: Driver;

export async function initDriver(
  uri: string,
  username: string,
  password: string
): Promise<Driver> {
  driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

  await driver.getServerInfo()

  return driver
}

export function getDriver() {
  return driver;
}

export async function closeDriver() {
  if (driver) {
    await driver.close();
  }
}
