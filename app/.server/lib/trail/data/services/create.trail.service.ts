import TrailRepository from "../../infrastructure/repository/trail.repository";
import { Driver } from "neo4j-driver";
import { InputCreateTrailDto, OutputCreateTrailDto } from "../../application/usecase/create/create.trail.dto";
import CreateTrailUseCase from "../../application/usecase/create/create.trail.usecase";


class CreateTrailService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ id, title, themeId }: InputCreateTrailDto): Promise<OutputCreateTrailDto> {
    const usecase = new CreateTrailUseCase(new TrailRepository(this._driver));
    const data = await usecase.execute({ id, title, themeId });
    return data;
  }
}

export default CreateTrailService;