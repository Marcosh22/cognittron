import StepFactory from './step.factory';

describe('Step factory unit tests', () => {
  it('should create a step', () => {
    const validStepData = {
        id: "123",
        title: "Sample Step",
        content: "Step Content",
        trailId: "trail123",
      };

    const step = StepFactory.create(validStepData);

    expect(step.id).toBe(validStepData.id);
    expect(step.title).toBe(validStepData.title);
    expect(step.content).toBe(validStepData.content);
    expect(step.trailId).toBe(validStepData.trailId);
  });
});