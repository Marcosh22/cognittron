import Step from "../../../domain/entity/step";
import StepRepositoryInterface from "../../../domain/repository/step.repository.interface";
import { InputListByTrailIdStepDto, OutputListByTrailIdStepDto } from "./listByTrailId.step.dto";

export default class ListByTrailIdStepUseCase {
  private stepRepository: StepRepositoryInterface;

  constructor(stepRepository: StepRepositoryInterface) {
    this.stepRepository = stepRepository;
  }

  async execute(input: InputListByTrailIdStepDto): Promise<OutputListByTrailIdStepDto> {
    const trails = await this.stepRepository.listByTrailId(
      input.trailId,
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
    data: Step[],
    total: number
  ): OutputListByTrailIdStepDto {
    return {
      data: data.map((step) => ({
        id: step.id,
        title: step.title,
        content: step.content,
        trailId: step.trailId
      })),
      total,
    };
  }
}
