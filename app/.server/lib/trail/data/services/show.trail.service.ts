import TrailRepository from "../../infrastructure/repository/trail.repository";
import { Driver } from "neo4j-driver";
import { InputShowTrailDto, OutputShowTrailDto } from "../../application/usecase/show/show.trail.dto";
import ShowTrailUseCase from "../../application/usecase/show/show.trail.usecase";


class ShowTrailService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ id }: InputShowTrailDto): Promise<OutputShowTrailDto> {
    const usecase = new ShowTrailUseCase(new TrailRepository(this._driver));
    const data = await usecase.execute({ id });
    return data;
  }
}

export default ShowTrailService;