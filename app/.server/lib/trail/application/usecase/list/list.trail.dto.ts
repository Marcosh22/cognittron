export interface InputListTrailDto {
  limit?: number;
  page?: number;
}

export type Trail = {
  id: string;
  title: string;
  themeId: string;
};

export interface OutputListTrailDto {
  data: Trail[];
  total: number;
}
