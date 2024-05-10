import CreateThemeUseCase from './create.theme.usecase';

const input = {
  id: "123",
  title: "Sample Theme",
  academyId: "academy-123",
};

const MockRepository = () => {
  return {
    create: jest.fn().mockResolvedValue(input),
    show: jest.fn(),
    list: jest.fn(),
    listByAcademyId: jest.fn(),
  };
};

describe('Create theme usecase unit test', () => {
  it('should create an theme', async () => {
    const themeRepository = MockRepository();
    const themeCreateUseCase = new CreateThemeUseCase(themeRepository);

    const output = await themeCreateUseCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      title: input.title,
      academyId: input.academyId
    });
  });

  it('should throw an error when id is empty', async () => {
    const themeRepository = MockRepository();
    const themeCreateUseCase = new CreateThemeUseCase(themeRepository);

    const inputData = {
      ...input,
      id: ''
    }

    await expect(themeCreateUseCase.execute(inputData)).rejects.toThrow(
      'ID is required'
    );
  });

  it('should throw an error when title is empty', async () => {
    const themeRepository = MockRepository();
    const themeCreateUseCase = new CreateThemeUseCase(themeRepository);

    const inputData = {
      ...input,
      title: ''
    }

    await expect(themeCreateUseCase.execute(inputData)).rejects.toThrow(
      'Title is required'
    );
  });

  it('should throw an error when academyId is empty', async () => {
    const themeRepository = MockRepository();
    const themeCreateUseCase = new CreateThemeUseCase(themeRepository);

    const inputData = {
      ...input,
      academyId: ''
    }

    await expect(themeCreateUseCase.execute(inputData)).rejects.toThrow(
      'Academy ID is required'
    );
  });
});