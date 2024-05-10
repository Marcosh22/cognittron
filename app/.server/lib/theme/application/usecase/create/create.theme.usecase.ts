import ThemeFactory from "../../../domain/factory/theme.factory";
import ThemeRepositoryInterface from "../../../domain/repository/theme.repository.interface";
import { InputCreateThemeDto, OutputCreateThemeDto } from "./create.theme.dto";

export default class CreateThemeUseCase {
  private themeRepository: ThemeRepositoryInterface;

  constructor(themeRepository: ThemeRepositoryInterface) {
    this.themeRepository = themeRepository;
  }

  async execute(input: InputCreateThemeDto): Promise<OutputCreateThemeDto> {

    const theme = ThemeFactory.create({
      id: input.id,
      title: input.title,
      academyId: input.academyId
    });

    const themeRow = await this.themeRepository.create(theme);

    return {
      id: themeRow.id,
      title: themeRow.title,
      academyId: themeRow.academyId
    };
  }
}
