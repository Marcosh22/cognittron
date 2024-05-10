import ThemeFactory from './theme.factory';

describe('Theme factory unit tests', () => {
  it('should create an theme', () => {
    const validThemeData = {
        id: "123",
        title: "Sample Theme",
        academyId: "academy123",
      };

    const theme = ThemeFactory.create(validThemeData);

    expect(theme.id).toBe(validThemeData.id);
    expect(theme.title).toBe(validThemeData.title);
    expect(theme.academyId).toBe(validThemeData.academyId);
  });
});