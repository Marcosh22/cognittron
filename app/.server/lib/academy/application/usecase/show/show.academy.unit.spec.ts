import AcademyFactory from "../../../domain/factory/academy.factory";
import ShowAcademyUseCase from "./show.academy.usecase";

const validAcademyData = {
  id: "123",
  title: "Sample Academy",
};

const academy = AcademyFactory.create(validAcademyData);

const MockRepository = () => {
  return {
    create: jest.fn(),
    show: jest.fn().mockReturnValue(Promise.resolve(academy)),
    list: jest.fn(),
  };
};

describe("Unit Test show academy use case", () => {
  it("should find an academy", async () => {
    const academyRepository = MockRepository();
    const usecase = new ShowAcademyUseCase(academyRepository);

    const input = {
      id: "123",
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(validAcademyData);
  });

  it("should not find a academy", async () => {
    const academyRepository = MockRepository();
    academyRepository.show.mockImplementation(() => {
      throw new Error("Academy not found");
    });
    const usecase = new ShowAcademyUseCase(academyRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Academy not found");
  });
});
