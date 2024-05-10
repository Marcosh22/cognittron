import StepRepository from "../../infrastructure/repository/step.repository";
import { Driver } from "neo4j-driver";
import { InputCreateStepDto, OutputCreateStepDto } from "../../application/usecase/create/create.step.dto";
import CreateStepUseCase from "../../application/usecase/create/create.step.usecase";

class CreateStepService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ id, title, content, trailId }: InputCreateStepDto): Promise<OutputCreateStepDto> {
    const usecase = new CreateStepUseCase(new StepRepository(this._driver));
    const data = await usecase.execute({ id, title, content, trailId });
    return data;
  }
}

export default CreateStepService;