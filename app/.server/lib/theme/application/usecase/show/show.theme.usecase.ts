import ThemeRepositoryInterface from "../../../domain/repository/theme.repository.interface";
import { InputShowThemeDto, OutputShowThemeDto } from "./show.theme.dto";

export default class ShowThemeUseCase {
  private themeRepository: ThemeRepositoryInterface;

  constructor(themeRepository: ThemeRepositoryInterface) {
    this.themeRepository = themeRepository;
  }

  async execute(input: InputShowThemeDto): Promise<OutputShowThemeDto> {
    const theme = await this.themeRepository.show(input.id);

    return {
      id: theme.id,
      title: theme.title,
      academyId: theme.academyId
    };
  }
}
