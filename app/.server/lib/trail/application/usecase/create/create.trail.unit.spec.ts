import CreateTrailUseCase from './create.trail.usecase';

const input = {
  id: "123",
  title: "Sample Trail",
  themeId: "theme-123",
};

const MockRepository = () => {
  return {
    create: jest.fn().mockResolvedValue(input),
    show: jest.fn(),
    list: jest.fn(),
    listByThemeId: jest.fn(),
  };
};

describe('Create trail usecase unit test', () => {
  it('should create an trail', async () => {
    const trailRepository = MockRepository();
    const trailCreateUseCase = new CreateTrailUseCase(trailRepository);

    const output = await trailCreateUseCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      title: input.title,
      themeId: input.themeId
    });
  });

  it('should throw an error when id is empty', async () => {
    const trailRepository = MockRepository();
    const trailCreateUseCase = new CreateTrailUseCase(trailRepository);

    const inputData = {
      ...input,
      id: ''
    }

    await expect(trailCreateUseCase.execute(inputData)).rejects.toThrow(
      'ID is required'
    );
  });

  it('should throw an error when title is empty', async () => {
    const trailRepository = MockRepository();
    const trailCreateUseCase = new CreateTrailUseCase(trailRepository);

    const inputData = {
      ...input,
      title: ''
    }

    await expect(trailCreateUseCase.execute(inputData)).rejects.toThrow(
      'Title is required'
    );
  });

  it('should throw an error when themeId is empty', async () => {
    const trailRepository = MockRepository();
    const trailCreateUseCase = new CreateTrailUseCase(trailRepository);

    const inputData = {
      ...input,
      themeId: ''
    }

    await expect(trailCreateUseCase.execute(inputData)).rejects.toThrow(
      'Theme ID is required'
    );
  });
});