import StepFactory from "../../../domain/factory/step.factory";
import StepRepositoryInterface from "../../../domain/repository/step.repository.interface";
import { InputCreateStepDto, OutputCreateStepDto } from "./create.step.dto";

export default class CreateStepUseCase {
  private stepRepository: StepRepositoryInterface;

  constructor(stepRepository: StepRepositoryInterface) {
    this.stepRepository = stepRepository;
  }

  async execute(input: InputCreateStepDto): Promise<OutputCreateStepDto> {

    const step = StepFactory.create({
      id: input.id,
      title: input.title,
      content: input.content,
      trailId: input.trailId
    });

    const stepRow = await this.stepRepository.create(step);

    return {
      id: stepRow.id,
      title: stepRow.title,
      content: stepRow.content,
      trailId: stepRow.trailId
    };
  }
}
