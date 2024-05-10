export interface InputListThemeDto {
  limit?: number;
  page?: number;
}

export type Theme = {
  id: string;
  title: string;
  academyId: string;
};

export interface OutputListThemeDto {
  data: Theme[];
  total: number;
}
