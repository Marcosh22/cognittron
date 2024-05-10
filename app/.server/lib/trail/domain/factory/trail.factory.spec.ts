import TrailFactory from './trail.factory';

describe('Trail factory unit tests', () => {
  it('should create a trail', () => {
    const validTrailData = {
        id: "123",
        title: "Sample Trail",
        themeId: "theme123",
      };

    const trail = TrailFactory.create(validTrailData);

    expect(trail.id).toBe(validTrailData.id);
    expect(trail.title).toBe(validTrailData.title);
    expect(trail.themeId).toBe(validTrailData.themeId);
  });
});