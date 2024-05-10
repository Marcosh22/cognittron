import StepRepository from "../../infrastructure/repository/step.repository";
import { Driver } from "neo4j-driver";
import { InputListStepDto, OutputListStepDto } from "../../application/usecase/list/list.step.dto";
import ListStepUseCase from "../../application/usecase/list/list.step.usecase";


class ListStepService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ limit, page }: InputListStepDto): Promise<OutputListStepDto> {
    const usecase = new ListStepUseCase(new StepRepository(this._driver));
    const data = await usecase.execute({ limit, page });
    return data;
  }
}

export default ListStepService;