import { initDriver } from "./database/neo4j";
import CreateAcademyService from "./lib/academy/data/services/create.academy.service";
import ShowAcademyService from "./lib/academy/data/services/show.academy.service";
import { InputCreateStepDto } from "./lib/step/application/usecase/create/create.step.dto";
import { InputListByTrailIdStepDto } from "./lib/step/application/usecase/listByTrailId/listByTrailId.step.dto";
import CreateStepService from "./lib/step/data/services/create.step.service";
import ListByTrailIdStepService from "./lib/step/data/services/listByTrailId.step.service";
import ShowStepService from "./lib/step/data/services/show.step.service";
import { InputCreateThemeDto } from "./lib/theme/application/usecase/create/create.theme.dto";
import { InputListByAcademyIdThemeDto } from "./lib/theme/application/usecase/listByAcademyId/listByAcademyId.theme.dto";
import CreateThemeService from "./lib/theme/data/services/create.theme.service";
import ListByAcademyIdThemeService from "./lib/theme/data/services/listByAcademyId.theme.service";
import ShowThemeService from "./lib/theme/data/services/show.theme.service";
import { InputCreateTrailDto } from "./lib/trail/application/usecase/create/create.trail.dto";
import { InputListByThemeIdTrailDto } from "./lib/trail/application/usecase/listByThemeId/listByThemeId.trail.dto";
import CreateTrailService from "./lib/trail/data/services/create.trail.service";
import ListByThemeIdTrailService from "./lib/trail/data/services/listByThemeId.trail.service";
import ShowTrailService from "./lib/trail/data/services/show.trail.service";

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;
const driver = await initDriver(NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD);

export async function initAcademy() {
  let academy;

  try {
    const createAcademyService = new CreateAcademyService(driver);
    academy = await createAcademyService.execute({
      id: "academy-1",
      title: "A primeira academia",
    });
  } catch (error: any) {
    console.log(error?.message);
  }

  if (!academy) {
    try {
      const findAcademyService = new ShowAcademyService(driver);
      academy = await findAcademyService.execute({
        id: "academy-1",
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  if (!academy) {
    console.log("academy-1 already initialized or not found");
  }

  return academy;
}

export async function initTheme() {
  let theme;

  try {
    const createThemeService = new CreateThemeService(driver);
    theme = await createThemeService.execute({
      id: "theme-1",
      title: "O primeiro tema",
      academyId: "academy-1",
    });
  } catch (error: any) {
    console.log(error?.message);
  }

  if (!theme) {
    try {
      const findThemeService = new ShowThemeService(driver);
      theme = await findThemeService.execute({
        id: "theme-1",
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  if (!theme) {
    console.log("theme-1 already initialized or not found");
  }

  return theme;
}

export async function initTrail() {
  let trail;

  try {
    const createTrailService = new CreateTrailService(driver);
    trail = await createTrailService.execute({
      id: "trail-1",
      title: "A primeira trilha",
      themeId: "theme-1",
    });
  } catch (error: any) {
    console.log(error?.message);
  }

  if (!trail) {
    try {
      const findTrailService = new ShowTrailService(driver);
      trail = await findTrailService.execute({
        id: "trail-1",
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  if (!trail) {
    console.log("trail-1 already initialized or not found");
  }

  return trail;
}

export async function initStep() {
  let step;

  try {
    const createStepService = new CreateStepService(driver);
    step = await createStepService.execute({
      id: "step-1",
      title: "O primeiro passo",
      content: "O conteúdo do primeiro passo",
      trailId: "trail-1",
    });
  } catch (error: any) {
    console.log(error?.message);
  }

  if (!step) {
    try {
      const findStepService = new ShowStepService(driver);
      step = await findStepService.execute({
        id: "step-1",
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  }

  if (!step) {
    console.log("step-1 already initialized or not found");
  }

  return step;
}

export async function initializeData() {
  const academy = await initAcademy();
  const theme = await initTheme();
  const trail = await initTrail();
  const step = await initStep();

  return {
    academy,
    theme,
    trail,
    step
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


export async function createTheme({
  academyId,
  id,
  title,
}: InputCreateThemeDto) {
  try {
    const createThemesService = new CreateThemeService(driver);
    const theme = await createThemesService.execute({ academyId, id, title });

    return JSON.parse(JSON.stringify(theme));
  } catch (error: any) {
    return {
      error: error?.message || error
    }
  }
}

export async function getTheme(themeId: string) {
  try {
    const showThemeService = new ShowThemeService(driver);
    const foundTheme = await showThemeService.execute({ id: themeId });

    return JSON.parse(JSON.stringify(foundTheme));
  } catch (error) {
    console.error(error);
  }
}

export async function getThemesByAcademyId({
  academyId,
  page,
  limit,
}: InputListByAcademyIdThemeDto) {
  try {
    const listThemesService = new ListByAcademyIdThemeService(driver);
    const themes = await listThemesService.execute({ academyId, page, limit });

    return JSON.parse(JSON.stringify(themes));
  } catch (error) {
    console.error(error);
  }
}


export async function createTrail({
  themeId,
  id,
  title,
}: InputCreateTrailDto) {
  try {
    const createTrailService = new CreateTrailService(driver);
    const trail = await createTrailService.execute({ themeId, id, title });

    return JSON.parse(JSON.stringify(trail));
  } catch (error: any) {
    return {
      error: error?.message || error
    }
  }
}

export async function getTrail(trailId: string) {
  try {
    const showTrailService = new ShowTrailService(driver);
    const foundTrail = await showTrailService.execute({ id: trailId });

    return JSON.parse(JSON.stringify(foundTrail));
  } catch (error) {
    console.error(error);
  }
}

export async function getTrailsByThemeId({
  themeId,
  page,
  limit,
}: InputListByThemeIdTrailDto) {
  try {
    const listTrailService = new ListByThemeIdTrailService(driver);
    const trails = await listTrailService.execute({ themeId, page, limit });

    return JSON.parse(JSON.stringify(trails));
  } catch (error) {
    console.error(error);
  }
}


export async function createStep({
  trailId,
  id,
  title,
  content
}: InputCreateStepDto) {
  try {
    const createStepService = new CreateStepService(driver);
    const step = await createStepService.execute({ trailId, id, title, content });

    return JSON.parse(JSON.stringify(step));
  } catch (error: any) {
    return {
      error: error?.message || error
    }
  }
}

export async function getStepsByTrailId({
  trailId,
  page,
  limit,
}: InputListByTrailIdStepDto) {
  try {
    const listStepsService = new ListByTrailIdStepService(driver);
    const steps = await listStepsService.execute({ trailId, page, limit });

    return JSON.parse(JSON.stringify(steps));
  } catch (error) {
    console.error(error);
  }
}