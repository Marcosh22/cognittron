import RepositoryInterface from "../../../@shared/repository/repository.interface";
import Theme from "../entity/theme";

export default interface ThemeRepositoryInterface
  extends RepositoryInterface<Theme> {
    listByAcademyId(
      academyId: string,
      limit?: number,
      page?: number,
    ): Promise<{ data: Theme[]; total: number }>;
  }
