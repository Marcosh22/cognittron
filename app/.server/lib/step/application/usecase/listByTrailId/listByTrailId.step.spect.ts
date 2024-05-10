import StepFactory from "../../../domain/factory/step.factory";
import ListByTrailIdStepUseCase from "./listByTrailId.step.usecase";

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
    list: jest.fn(),
    listByTrailId: jest.fn().mockReturnValue(Promise.resolve({ data: [step1, step2], total: 2 })),
  };
};

describe('Unit test for listing step by trailId use case', () => {
  it('should list all steps by trailId', async () => {
    const repository = MockRepository();
    const useCase = new ListByTrailIdStepUseCase(repository);

    const { data, total } = await useCase.execute({
      trailId: "trail-123"
    });

    expect(repository.list).toHaveBeenCalled();
    expect(data).toHaveLength(2);

    expect(total).toBe(2);
  });
});

