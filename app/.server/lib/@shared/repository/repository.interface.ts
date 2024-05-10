export default interface RepositoryInterface<T> {
  create(data: T): Promise<T>;
  show(id: string): Promise<T>;
  list(
    limit?: number,
    page?: number,
  ): Promise<{ data: T[]; total: number }>;
}
