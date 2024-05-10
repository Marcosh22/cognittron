import CreateStepUseCase from './create.step.usecase';

const input = {
  id: "123",
  title: "Sample Step",
  content: "Sample Step Content",
  trailId: "trail-123",
};

const MockRepository = () => {
  return {
    create: jest.fn().mockResolvedValue(input),
    show: jest.fn(),
    list: jest.fn(),
    listByTrailId: jest.fn(),
  };
};

describe('Create step usecase unit test', () => {
  it('should create an step', async () => {
    const stepRepository = MockRepository();
    const stepCreateUseCase = new CreateStepUseCase(stepRepository);

    const output = await stepCreateUseCase.execute(input);

    expect(output).toEqual({
      id: input.id,
      title: input.title,
      content: input.content,
      trailId: input.trailId
    });
  });

  it('should throw an error when id is empty', async () => {
    const stepRepository = MockRepository();
    const stepCreateUseCase = new CreateStepUseCase(stepRepository);

    const inputData = {
      ...input,
      id: ''
    }

    await expect(stepCreateUseCase.execute(inputData)).rejects.toThrow(
      'ID is required'
    );
  });

  it('should throw an error when title is empty', async () => {
    const stepRepository = MockRepository();
    const stepCreateUseCase = new CreateStepUseCase(stepRepository);

    const inputData = {
      ...input,
      title: ''
    }

    await expect(stepCreateUseCase.execute(inputData)).rejects.toThrow(
      'Title is required'
    );
  });

  it('should throw an error when content is empty', async () => {
    const stepRepository = MockRepository();
    const stepCreateUseCase = new CreateStepUseCase(stepRepository);

    const inputData = {
      ...input,
      content: ''
    }

    await expect(stepCreateUseCase.execute(inputData)).rejects.toThrow(
      'Content is required'
    );
  });

  it('should throw an error when trailId is empty', async () => {
    const stepRepository = MockRepository();
    const stepCreateUseCase = new CreateStepUseCase(stepRepository);

    const inputData = {
      ...input,
      trailId: ''
    }

    await expect(stepCreateUseCase.execute(inputData)).rejects.toThrow(
      'Trail ID is required'
    );
  });
});