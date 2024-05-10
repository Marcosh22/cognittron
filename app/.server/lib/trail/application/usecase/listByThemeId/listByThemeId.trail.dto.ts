export interface InputListByThemeIdTrailDto {
  themeId: string;
  limit?: number;
  page?: number;
}

export type Trail = {
  id: string;
  title: string;
  themeId: string;
};

export interface OutputListByThemeIdTrailDto {
  data: Trail[];
  total: number;
}
