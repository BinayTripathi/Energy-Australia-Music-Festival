import { MusicFestival } from './music-festival';

describe('MusicFestival', () => {
  it('should create an instance', () => {
    expect(new MusicFestival("Alpha Festival" , [])).toBeTruthy();
  });
});
