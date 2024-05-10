import Academy from "../../../domain/entity/academy";
import AcademyRepositoryInterface from "../../../domain/repository/academy.repository.interface";
import { InputListAcademyDto, OutputListAcademyDto } from "./list.academy.dto";

export default class ListAcademyUseCase {
  private academyRepository: AcademyRepositoryInterface;

  constructor(academyRepository: AcademyRepositoryInterface) {
    this.academyRepository = academyRepository;
  }

  async execute(input: InputListAcademyDto): Promise<OutputListAcademyDto> {
    const academies = await this.academyRepository.list(
      input.limit,
      input.page
    );
    return OutputMapper.toOutput(
      academies.data,
      academies.total
    );
  }
}

class OutputMapper {
  static toOutput(
    data: Academy[],
    total: number
  ): OutputListAcademyDto {
    return {
      data: data.map((academy) => ({
        id: academy.id,
        title: academy.title,
      })),
      total,
    };
  }
}
