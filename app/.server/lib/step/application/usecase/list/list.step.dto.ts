export interface InputListStepDto {
  limit?: number;
  page?: number;
}

export type Step = {
  id: string;
  title: string;
  content: string;
  trailId: string;
};

export interface OutputListStepDto {
  data: Step[];
  total: number;
}
