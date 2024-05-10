import AcademyFactory from "../../../domain/factory/academy.factory";
import AcademyRepositoryInterface from "../../../domain/repository/academy.repository.interface";
import { InputCreateAcademyDto, OutputCreateAcademyDto } from "./create.academy.dto";

export default class CreateAcademyUseCase {
  private academyRepository: AcademyRepositoryInterface;

  constructor(academyRepository: AcademyRepositoryInterface) {
    this.academyRepository = academyRepository;
  }

  async execute(input: InputCreateAcademyDto): Promise<OutputCreateAcademyDto> {

    const academy = AcademyFactory.create({
      id: input.id,
      title: input.title
    });

    const academyRow = await this.academyRepository.create(academy);

    return {
      id: academyRow.id,
      title: academyRow.title
    };
  }
}
