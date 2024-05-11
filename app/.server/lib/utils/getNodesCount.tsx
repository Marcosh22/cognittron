import { Driver, Record, Session } from "neo4j-driver";

async function getNodesCount(driver: Driver, node: string) {
  const session: Session = driver.session();

  try {
    const result: Record = await session.executeRead(async (tx) => {
      const query = `
            CALL apoc.meta.stats() YIELD labels
            RETURN labels.${node} as total
            `;

      const response = await tx.run(query);
      return response.records[0];
    });

    if (!result) {
      return null
    }

    const total = result?.get('total')?.toInt() || 0;

   return total;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await session.close();
  }
}

export default getNodesCount;
