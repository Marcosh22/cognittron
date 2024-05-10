import TrailFactory from "../../../domain/factory/trail.factory";
import ListByThemeIdTrailUseCase from "./listByThemeId.trail.usecase";

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
    list: jest.fn(),
    listByThemeId: jest.fn().mockReturnValue(Promise.resolve({ data: [trail1, trail2], total: 2 })),
  };
};

describe('Unit test for listing trail by themeId use case', () => {
  it('should list all trails by themeId', async () => {
    const repository = MockRepository();
    const useCase = new ListByThemeIdTrailUseCase(repository);

    const { data, total } = await useCase.execute({
      themeId: "theme-123"
    });

    expect(repository.list).toHaveBeenCalled();
    expect(data).toHaveLength(2);

    expect(total).toBe(2);
  });
});

