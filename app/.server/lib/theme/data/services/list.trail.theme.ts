import ThemeRepository from "../../infrastructure/repository/theme.repository";
import { Driver } from "neo4j-driver";
import { InputListThemeDto, OutputListThemeDto } from "../../application/usecase/list/list.theme.dto";
import ListThemeUseCase from "../../application/usecase/list/list.theme.usecase";


class ListThemeService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ limit, page }: InputListThemeDto): Promise<OutputListThemeDto> {
    const usecase = new ListThemeUseCase(new ThemeRepository(this._driver));
    const data = await usecase.execute({ limit, page });
    return data;
  }
}

export default ListThemeService;