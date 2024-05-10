import ThemeRepository from "../../infrastructure/repository/theme.repository";
import { Driver } from "neo4j-driver";
import { InputListByAcademyIdThemeDto, OutputListByAcademyIdThemeDto } from "../../application/usecase/listByAcademyId/listByAcademyId.theme.dto";
import ListByAcademyIdThemeUseCase from "../../application/usecase/listByAcademyId/listByAcademyId.theme.usecase";

class ListByAcademyIdThemeService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ academyId, limit, page }: InputListByAcademyIdThemeDto): Promise<OutputListByAcademyIdThemeDto> {
    const usecase = new ListByAcademyIdThemeUseCase(new ThemeRepository(this._driver));
    const data = await usecase.execute({ academyId, limit, page });
    return data;
  }
}

export default ListByAcademyIdThemeService;