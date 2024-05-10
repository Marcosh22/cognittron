import StepFactory from "../../../domain/factory/step.factory";
import ListStepUseCase from "./list.step.usecase";

const step1 = StepFactory.create({
  id: '1',
  title: 'Sample Step 01',
  content: 'Sample Step Content 01',
  trailId: "trail-123",
});
const step2 = StepFactory.create({
  id: '2',
  title: 'Sample Step 02',
  content: 'Sample Step Content 02',
  trailId: "trail-123",
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    show: jest.fn(),
    list: jest.fn().mockReturnValue(Promise.resolve({ data: [step1, step2], total: 2 })),
    listByTrailId: jest.fn(),
  };
};

describe('Unit test for listing step use case', () => {
  it('should list all steps', async () => {
    const repository = MockRepository();
    const useCase = new ListStepUseCase(repository);

    const { data, total } = await useCase.execute({});

    expect(repository.list).toHaveBeenCalled();
    expect(data).toHaveLength(2);

    expect(total).toBe(2);
  });
});

