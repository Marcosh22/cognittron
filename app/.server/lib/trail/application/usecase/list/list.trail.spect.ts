import TrailFactory from "../../../domain/factory/trail.factory";
import ListTrailUseCase from "./list.trail.usecase";

const trail1 = TrailFactory.create({
  id: '1',
  title: 'Sample Trail 01',
  themeId: "theme-123",
});
const trail2 = TrailFactory.create({
  id: '2',
  title: 'Sample Trail 02',
  themeId: "theme-123",
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    show: jest.fn(),
    list: jest.fn().mockReturnValue(Promise.resolve({ data: [trail1, trail2], total: 2 })),
    listByThemeId: jest.fn(),
  };
};

describe('Unit test for listing trail use case', () => {
  it('should list all trails', async () => {
    const repository = MockRepository();
    const useCase = new ListTrailUseCase(repository);

    const { data, total } = await useCase.execute({});

    expect(repository.list).toHaveBeenCalled();
    expect(data).toHaveLength(2);

    expect(total).toBe(2);
  });
});

