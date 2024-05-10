import TrailRepository from "../../infrastructure/repository/trail.repository";
import { Driver } from "neo4j-driver";
import { InputListByThemeIdTrailDto, OutputListByThemeIdTrailDto } from "../../application/usecase/listByThemeId/listByThemeId.trail.dto";
import ListByThemeIdTrailUseCase from "../../application/usecase/listByThemeId/listByThemeId.trail.usecase";


class ListByThemeIdTrailService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ themeId, limit, page }: InputListByThemeIdTrailDto): Promise<OutputListByThemeIdTrailDto> {
    const usecase = new ListByThemeIdTrailUseCase(new TrailRepository(this._driver));
    const data = await usecase.execute({ themeId, limit, page });
    return data;
  }
}

export default ListByThemeIdTrailService;