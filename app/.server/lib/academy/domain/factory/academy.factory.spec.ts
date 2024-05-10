import AcademyFactory from './academy.factory';

describe('Academy factory unit tests', () => {
  it('should create an academy', () => {
    const validAcademyData = {
        id: "123",
        title: "Sample Academy",
      };

    const academy = AcademyFactory.create(validAcademyData);

    expect(academy.id).toBe(validAcademyData.id);
    expect(academy.title).toBe(validAcademyData.title);
  });
});