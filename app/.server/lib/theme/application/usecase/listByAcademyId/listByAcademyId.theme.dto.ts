export interface InputListByAcademyIdThemeDto {
  academyId: string;
  limit?: number;
  page?: number;
}

export type Theme = {
  id: string;
  title: string;
  academyId: string;
};

export interface OutputListByAcademyIdThemeDto {
  data: Theme[];
  total: number;
}
