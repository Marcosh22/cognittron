import TrailRepositoryInterface from "../../../domain/repository/trail.repository.interface";
import { InputShowTrailDto, OutputShowTrailDto } from "./show.trail.dto";

export default class ShowTrailUseCase {
  private trailRepository: TrailRepositoryInterface;

  constructor(trailRepository: TrailRepositoryInterface) {
    this.trailRepository = trailRepository;
  }

  async execute(input: InputShowTrailDto): Promise<OutputShowTrailDto> {
    const trail = await this.trailRepository.show(input.id);

    return {
      id: trail.id,
      title: trail.title,
      themeId: trail.themeId
    };
  }
}
