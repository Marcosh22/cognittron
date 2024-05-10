import StepRepositoryInterface from "../../../domain/repository/step.repository.interface";
import { InputShowStepDto, OutputShowStepDto } from "./show.step.dto";

export default class ShowStepUseCase {
  private stepRepository: StepRepositoryInterface;

  constructor(stepRepository: StepRepositoryInterface) {
    this.stepRepository = stepRepository;
  }

  async execute(input: InputShowStepDto): Promise<OutputShowStepDto> {
    const step = await this.stepRepository.show(input.id);

    return {
      id: step.id,
      title: step.title,
      content: step.content,
      trailId: step.trailId
    };
  }
}
