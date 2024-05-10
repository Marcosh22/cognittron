import RepositoryInterface from "../../../@shared/repository/repository.interface";
import Trail from "../entity/trail";

export default interface ThemeRepositoryInterface
  extends RepositoryInterface<Trail> {
    listByThemeId(
      themeId: string,
      limit?: number,
      page?: number,
    ): Promise<{ data: Trail[]; total: number }>;
  }
