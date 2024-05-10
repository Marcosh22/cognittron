import ThemeFactory from "../../../domain/factory/theme.factory";
import ListByAcademyIdThemeUseCase from "./listByAcademyId.theme.usecase";

const theme1 = ThemeFactory.create({
  id: '1',
  title: 'Sample Theme 01',
  academyId: "academy-123",
});
const theme2 = ThemeFactory.create({
  id: '2',
  title: 'Sample Theme 02',
  academyId: "academy-123",
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    show: jest.fn(),
    list: jest.fn(),
    listByAcademyId: jest.fn().mockReturnValue(Promise.resolve({ data: [theme1, theme2], total: 2 })),
  };
};

describe('Unit test for listing theme by academyId use case', () => {
  it('should list all themes by academyId', async () => {
    const repository = MockRepository();
    const useCase = new ListByAcademyIdThemeUseCase(repository);

    const { data, total } = await useCase.execute({
      academyId: "academy-123"
    });

    expect(repository.list).toHaveBeenCalled();
    expect(data).toHaveLength(2);

    expect(total).toBe(2);
  });
});

