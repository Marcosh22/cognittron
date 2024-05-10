import AcademyRepository from "../../infrastructure/repository/academy.repository";
import { Driver } from "neo4j-driver";
import { InputCreateAcademyDto, OutputCreateAcademyDto } from "../../application/usecase/create/create.academy.dto";
import CreateAcademyUseCase from "../../application/usecase/create/create.academy.usecase";


class CreateAcademyService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ id, title }: InputCreateAcademyDto): Promise<OutputCreateAcademyDto> {
    const usecase = new CreateAcademyUseCase(new AcademyRepository(this._driver));
    const data = await usecase.execute({ id, title });
    return data;
  }
}

export default CreateAcademyService;