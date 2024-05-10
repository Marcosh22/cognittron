import RepositoryInterface from "../../../@shared/repository/repository.interface";
import Step from "../entity/step";

export default interface ThemeRepositoryInterface
  extends RepositoryInterface<Step> {
    listByTrailId(
      trailId: string,
      limit?: number,
      page?: number,
    ): Promise<{ data: Step[]; total: number }>;
  }
