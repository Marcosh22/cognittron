import Theme from "../../../domain/entity/theme";
import ThemeRepositoryInterface from "../../../domain/repository/theme.repository.interface";
import { InputListByAcademyIdThemeDto, OutputListByAcademyIdThemeDto } from "./listByAcademyId.theme.dto";

export default class ListByAcademyIdThemeUseCase {
  private themeRepository: ThemeRepositoryInterface;

  constructor(themeRepository: ThemeRepositoryInterface) {
    this.themeRepository = themeRepository;
  }

  async execute(input: InputListByAcademyIdThemeDto): Promise<OutputListByAcademyIdThemeDto> {
    const themes = await this.themeRepository.listByAcademyId(
      input.academyId,
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
  ): OutputListByAcademyIdThemeDto {
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
