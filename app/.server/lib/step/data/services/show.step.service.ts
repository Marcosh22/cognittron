import StepRepository from "../../infrastructure/repository/step.repository";
import { Driver } from "neo4j-driver";
import { InputShowStepDto, OutputShowStepDto } from "../../application/usecase/show/show.step.dto";
import ShowStepUseCase from "../../application/usecase/show/show.step.usecase";

class ShowStepService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ id }: InputShowStepDto): Promise<OutputShowStepDto> {
    const usecase = new ShowStepUseCase(new StepRepository(this._driver));
    const data = await usecase.execute({ id });
    return data;
  }
}

export default ShowStepService;