export interface InputListAcademyDto {
  limit?: number;
  page?: number;
}

export type Academy = {
  id: string;
  title: string;
};

export interface OutputListAcademyDto {
  data: Academy[];
  total: number;
}
