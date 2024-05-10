import Trail from "../../../domain/entity/trail";
import TrailRepositoryInterface from "../../../domain/repository/trail.repository.interface";
import { InputListByThemeIdTrailDto, OutputListByThemeIdTrailDto } from "./listByThemeId.trail.dto";

export default class ListByThemeIdTrailUseCase {
  private trailRepository: TrailRepositoryInterface;

  constructor(trailRepository: TrailRepositoryInterface) {
    this.trailRepository = trailRepository;
  }

  async execute(input: InputListByThemeIdTrailDto): Promise<OutputListByThemeIdTrailDto> {
    const trails = await this.trailRepository.listByThemeId(
      input.themeId,
      input.limit,
      input.page
    );
    return OutputMapper.toOutput(
      trails.data,
      trails.total
    );
  }
}

class OutputMapper {
  static toOutput(
    data: Trail[],
    total: number
  ): OutputListByThemeIdTrailDto {
    return {
      data: data.map((trail) => ({
        id: trail.id,
        title: trail.title,
        themeId: trail.themeId
      })),
      total,
    };
  }
}
