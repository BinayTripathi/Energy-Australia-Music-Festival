import { Band } from './band';

describe('Band', () => {
  it('should create an instance', () => {
    expect(new Band("Band X", ["Omega Festival"])).toBeTruthy();
  });
});
