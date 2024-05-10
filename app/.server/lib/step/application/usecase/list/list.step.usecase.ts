import Step from "../../../domain/entity/step";
import StepRepositoryInterface from "../../../domain/repository/step.repository.interface";
import { InputListStepDto, OutputListStepDto } from "./list.step.dto";

export default class ListStepUseCase {
  private stepRepository: StepRepositoryInterface;

  constructor(stepRepository: StepRepositoryInterface) {
    this.stepRepository = stepRepository;
  }

  async execute(input: InputListStepDto): Promise<OutputListStepDto> {
    const steps = await this.stepRepository.list(
      input.limit,
      input.page
    );
    return OutputMapper.toOutput(
      steps.data,
      steps.total
    );
  }
}

class OutputMapper {
  static toOutput(
    data: Step[],
    total: number
  ): OutputListStepDto {
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
