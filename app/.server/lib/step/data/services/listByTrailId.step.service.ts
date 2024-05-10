import StepRepository from "../../infrastructure/repository/step.repository";
import { Driver } from "neo4j-driver";
import { InputListByTrailIdStepDto, OutputListByTrailIdStepDto } from "../../application/usecase/listByTrailId/listByTrailId.step.dto";
import ListByTrailIdStepUseCase from "../../application/usecase/listByTrailId/listByTrailId.step.usecase";

class ListByTrailIdStepService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ trailId, limit, page }: InputListByTrailIdStepDto): Promise<OutputListByTrailIdStepDto> {
    const usecase = new ListByTrailIdStepUseCase(new StepRepository(this._driver));
    const data = await usecase.execute({ trailId, limit, page });
    return data;
  }
}

export default ListByTrailIdStepService;