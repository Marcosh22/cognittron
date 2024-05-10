import AcademyRepository from "../../infrastructure/repository/academy.repository";
import { Driver } from "neo4j-driver";
import { InputListAcademyDto, OutputListAcademyDto } from "../../application/usecase/list/list.academy.dto";
import ListAcademyUseCase from "../../application/usecase/list/list.academy.usecase";


class ListAcademyService {
  private _driver: Driver;

  constructor(driver: Driver) {
    this._driver = driver;
  }

  async execute({ limit, page }: InputListAcademyDto): Promise<OutputListAcademyDto> {
    const usecase = new ListAcademyUseCase(new AcademyRepository(this._driver));
    const data = await usecase.execute({ limit, page });
    return data;
  }
}

export default ListAcademyService;