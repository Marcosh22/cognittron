import AcademyRepositoryInterface from "../../../domain/repository/academy.repository.interface";
import { InputShowAcademyDto, OutputShowAcademyDto } from "./show.academy.dto";

export default class ShowAcademyUseCase {
  private academyRepository: AcademyRepositoryInterface;

  constructor(academyRepository: AcademyRepositoryInterface) {
    this.academyRepository = academyRepository;
  }

  async execute(input: InputShowAcademyDto): Promise<OutputShowAcademyDto> {
    const academy = await this.academyRepository.show(input.id);

    return {
      id: academy.id,
      title: academy.title
    };
  }
}
