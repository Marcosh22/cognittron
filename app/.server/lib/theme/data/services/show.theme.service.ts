import ThemeRepository from "../../infrastructure/repository/theme.repository";
import { Driver } from "neo4j-driver";
import { InputShowThemeDto, OutputShowThemeDto } from "../../application/usecase/show/show.theme.dto";
import ShowThemeUseCase from "../../application/usecase/show/show.theme.usecase";


class ShowThemeService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ id }: InputShowThemeDto): Promise<OutputShowThemeDto> {
    const usecase = new ShowThemeUseCase(new ThemeRepository(this._driver));
    const data = await usecase.execute({ id });
    return data;
  }
}

export default ShowThemeService;