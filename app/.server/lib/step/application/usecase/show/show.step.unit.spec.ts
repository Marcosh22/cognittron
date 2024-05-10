import StepFactory from "../../../domain/factory/step.factory";
import ShowStepUseCase from "./show.step.usecase";

const validStepData = {
  id: "123",
  title: "Sample Step",
  content: "Sample Step Content",
  trailId: "trail123"
};

const step = StepFactory.create(validStepData);

const MockRepository = () => {
  return {
    create: jest.fn(),
    show: jest.fn().mockReturnValue(Promise.resolve(step)),
    list: jest.fn(),
    listByTrailId: jest.fn(),
  };
};

describe("Unit Test show step use case", () => {
  it("should find a step", async () => {
    const stepRepository = MockRepository();
    const usecase = new ShowStepUseCase(stepRepository);

    const input = {
      id: "123",
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(validStepData);
  });

  it("should not find a step", async () => {
    const stepRepository = MockRepository();
    stepRepository.show.mockImplementation(() => {
      throw new Error("Step not found");
    });
    const usecase = new ShowStepUseCase(stepRepository);

    const input = {
      id: "321",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Step not found");
  });
});
