import Trail from "../../../domain/entity/trail";
import TrailRepositoryInterface from "../../../domain/repository/trail.repository.interface";
import { InputListTrailDto, OutputListTrailDto } from "./list.trail.dto";

export default class ListTrailUseCase {
  private trailRepository: TrailRepositoryInterface;

  constructor(trailRepository: TrailRepositoryInterface) {
    this.trailRepository = trailRepository;
  }

  async execute(input: InputListTrailDto): Promise<OutputListTrailDto> {
    const trails = await this.trailRepository.list(
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
  ): OutputListTrailDto {
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
