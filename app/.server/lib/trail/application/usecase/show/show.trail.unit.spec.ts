import TrailFactory from "../../../domain/factory/trail.factory";
import ShowTrailUseCase from "./show.trail.usecase";

const validTrailData = {
  id: "123",
  title: "Sample Trail",
  themeId: "theme123"
};

const trail = TrailFactory.create(validTrailData);

const MockRepository = () => {
  return {
    create: jest.fn(),
    show: jest.fn().mockReturnValue(Promise.resolve(trail)),
    list: jest.fn(),
    listByThemeId: jest.fn(),
  };
};

describe("Unit Test show trail use case", () => {
  it("should find a trail", async () => {
    const trailRepository = MockRepository();
    const usecase = new ShowTrailUseCase(trailRepository);

    const input = {
      id: "123",
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(validTrailData);
  });

  it("should not find a trail", async () => {
    const trailRepository = MockRepository();
    trailRepository.show.mockImplementation(() => {
      throw new Error("Trail not found");
    });
    const usecase = new ShowTrailUseCase(trailRepository);

    const input = {
      id: "321",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Trail not found");
  });
});
