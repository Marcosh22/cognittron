export interface InputListByTrailIdStepDto {
  trailId: string;
  limit?: number;
  page?: number;
}

export type Step = {
  id: string;
  title: string;
  content: string;
  trailId: string;
};

export interface OutputListByTrailIdStepDto {
  data: Step[];
  total: number;
}
