import Theme from "../../../domain/entity/theme";
import ThemeRepositoryInterface from "../../../domain/repository/theme.repository.interface";
import { InputListThemeDto, OutputListThemeDto } from "./list.theme.dto";

export default class ListThemeUseCase {
  private themeRepository: ThemeRepositoryInterface;

  constructor(themeRepository: ThemeRepositoryInterface) {
    this.themeRepository = themeRepository;
  }

  async execute(input: InputListThemeDto): Promise<OutputListThemeDto> {
    const themes = await this.themeRepository.list(
      input.limit,
      input.page
    );
    return OutputMapper.toOutput(
      themes.data,
      themes.total
    );
  }
}

class OutputMapper {
  static toOutput(
    data: Theme[],
    total: number
  ): OutputListThemeDto {
    return {
      data: data.map((theme) => ({
        id: theme.id,
        title: theme.title,
        academyId: theme.academyId
      })),
      total,
    };
  }
}
