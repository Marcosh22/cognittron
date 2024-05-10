import TrailFactory from "../../../domain/factory/trail.factory";
import TrailRepositoryInterface from "../../../domain/repository/trail.repository.interface";
import { InputCreateTrailDto, OutputCreateTrailDto } from "./create.trail.dto";

export default class CreateTrailUseCase {
  private trailRepository: TrailRepositoryInterface;

  constructor(trailRepository: TrailRepositoryInterface) {
    this.trailRepository = trailRepository;
  }

  async execute(input: InputCreateTrailDto): Promise<OutputCreateTrailDto> {

    const trail = TrailFactory.create({
      id: input.id,
      title: input.title,
      themeId: input.themeId
    });

    const trailRow = await this.trailRepository.create(trail);

    return {
      id: trailRow.id,
      title: trailRow.title,
      themeId: trailRow.themeId
    };
  }
}
