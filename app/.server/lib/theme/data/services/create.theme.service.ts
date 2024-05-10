import ThemeRepository from "../../infrastructure/repository/theme.repository";
import { Driver } from "neo4j-driver";
import { InputCreateThemeDto, OutputCreateThemeDto } from "../../application/usecase/create/create.theme.dto";
import CreateThemeUseCase from "../../application/usecase/create/create.theme.usecase";


class CreateThemeService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ id, title, academyId }: InputCreateThemeDto): Promise<OutputCreateThemeDto> {
    const usecase = new CreateThemeUseCase(new ThemeRepository(this._driver));
    const data = await usecase.execute({ id, title, academyId });
    return data;
  }
}

export default CreateThemeService;