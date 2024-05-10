import AcademyFactory from "../../../domain/factory/academy.factory";
import ListAcademyUseCase from "./list.academy.usecase";

const academy1 = AcademyFactory.create({
  id: '1',
  title: 'Sample Academy 01',
});
const academy2 = AcademyFactory.create({
  id: '2',
  title: 'Sample Academy 02',
});

const MockRepository = () => {
  return {
    create: jest.fn(),
    show: jest.fn(),
    list: jest.fn().mockReturnValue(Promise.resolve({ data: [academy1, academy2], total: 2 })),
  };
};

describe('Unit test for listing academy use case', () => {
  it('should list all academies', async () => {
    const repository = MockRepository();
    const useCase = new ListAcademyUseCase(repository);

    const { data, total } = await useCase.execute({});

    expect(repository.list).toHaveBeenCalled();
    expect(data).toHaveLength(2);

    expect(total).toBe(2);
  });
});

