import ThemeFactory from "../../../domain/factory/theme.factory";
import ShowThemeUseCase from "./show.theme.usecase";

const validThemeData = {
  id: "123",
  title: "Sample Theme",
  academyId: "academy123"
};

const theme = ThemeFactory.create(validThemeData);

const MockRepository = () => {
  return {
    create: jest.fn(),
    show: jest.fn().mockReturnValue(Promise.resolve(theme)),
    list: jest.fn(),
    listByAcademyId: jest.fn(),
  };
};

describe("Unit Test show theme use case", () => {
  it("should find an theme", async () => {
    const themeRepository = MockRepository();
    const usecase = new ShowThemeUseCase(themeRepository);

    const input = {
      id: "123",
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(validThemeData);
  });

  it("should not find a theme", async () => {
    const themeRepository = MockRepository();
    themeRepository.show.mockImplementation(() => {
      throw new Error("Theme not found");
    });
    const usecase = new ShowThemeUseCase(themeRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Theme not found");
  });
});
