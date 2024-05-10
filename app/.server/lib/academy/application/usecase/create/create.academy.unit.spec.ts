import CreateAcademyUseCase from './create.academy.usecase';

const input = {
  id: "123",
  title: "Sample Academy",
};

const MockRepository = () => {
  return {
    create: jest.fn().mockResolvedValue(input),
    show: jest.fn(),
    list: jest.fn(),
  };
};

describe('Create academy usecase unit test', () => {
  it('should create an academy', async () => {
    const academyRepository = MockRepository();
    const academyCreateUseCase = new CreateAcademyUseCase(academyRepository);

    const output = await academyCreateUseCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      title: input.title,
    });
  });

  it('should throw an error when id is empty', async () => {
    const academyRepository = MockRepository();
    const academyCreateUseCase = new CreateAcademyUseCase(academyRepository);

    const inputData = {
      ...input,
      id: ''
    }

    await expect(academyCreateUseCase.execute(inputData)).rejects.toThrow(
      'ID is required'
    );
  });

  it('should throw an error when title is empty', async () => {
    const academyRepository = MockRepository();
    const academyCreateUseCase = new CreateAcademyUseCase(academyRepository);

    const inputData = {
      ...input,
      title: ''
    }

    await expect(academyCreateUseCase.execute(inputData)).rejects.toThrow(
      'Title is required'
    );
  });
});