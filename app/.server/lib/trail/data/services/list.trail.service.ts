import TrailRepository from "../../infrastructure/repository/trail.repository";
import { Driver } from "neo4j-driver";
import { InputListTrailDto, OutputListTrailDto } from "../../application/usecase/list/list.trail.dto";
import ListTrailUseCase from "../../application/usecase/list/list.trail.usecase";


class ListTrailService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ limit, page }: InputListTrailDto): Promise<OutputListTrailDto> {
    const usecase = new ListTrailUseCase(new TrailRepository(this._driver));
    const data = await usecase.execute({ limit, page });
    return data;
  }
}

export default ListTrailService;