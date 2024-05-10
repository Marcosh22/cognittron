import AcademyRepository from "../../infrastructure/repository/academy.repository";
import { Driver } from "neo4j-driver";
import { InputShowAcademyDto, OutputShowAcademyDto } from "../../application/usecase/show/show.academy.dto";
import ShowAcademyUseCase from "../../application/usecase/show/show.academy.usecase";


class ShowAcademyService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ id }: InputShowAcademyDto): Promise<OutputShowAcademyDto> {
    const usecase = new ShowAcademyUseCase(new AcademyRepository(this._driver));
    const data = await usecase.execute({ id });
    return data;
  }
}

export default ShowAcademyService;