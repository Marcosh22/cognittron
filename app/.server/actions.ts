import { initDriver } from "./database/neo4j";
import CreateAcademyService from "./lib/academy/data/services/create.academy.service";
import ShowAcademyService from "./lib/academy/data/services/show.academy.service";
import CreateStepService from "./lib/step/data/services/create.step.service";
import CreateThemeService from "./lib/theme/data/services/create.theme.service";
import ListByAcademyIdThemeService from "./lib/theme/data/services/listByAcademyId.theme.service";
import CreateTrailService from "./lib/trail/data/services/create.trail.service";

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
const driver = await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD);

export async function initializeData() {
  try {
    const createAcademyService = new CreateAcademyService(driver);
    await createAcademyService.execute({
      id: "academy-1",
      title: "A primeira academia",
    });
  } catch (error) {
    console.log("academy-1 already initialized");
  }

  try {
    const createThemeService = new CreateThemeService(driver);
    await createThemeService.execute({
      id: "theme-1",
      title: "O primeiro tema",
      academyId: "academy-1",
    });
  } catch (error) {
    console.log("theme-1 already initialized");
  }

  try {
    const createTrailService = new CreateTrailService(driver);
    await createTrailService.execute({
      id: "trail-1",
      title: "A primeira trilha",
      themeId: "theme-1",
    });
  } catch (error) {
    console.log("trail-1 already initialized");
  }

  try {
    const createStepService = new CreateStepService(driver);
    await createStepService.execute({
      id: "step-1",
      title: "O primeiro passo",
      content: "O conteúdo do primeiro passo",
      trailId: "trail-1",
    });
  } catch (error) {
    console.log("step-1 already initialized");
  }
}

export async function getAcademy(academyId: string) {
  try {
    const showAcademyService = new ShowAcademyService(driver);
    const foundAcademy = await showAcademyService.execute({ id: academyId });

    return JSON.parse(JSON.stringify(foundAcademy));
  } catch (error) {
    console.error(error);
  }
}

export async function getThemesByAcademyId(academyId: string) {
  try {
    const listThemesService = new ListByAcademyIdThemeService(driver);
    const themes = await listThemesService.execute({ academyId: academyId });

    return JSON.parse(JSON.stringify(themes))
  } catch (error) {
    console.error(error);
  }
}
