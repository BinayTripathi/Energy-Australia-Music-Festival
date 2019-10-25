import { RecordLabel } from './record-label';

describe('RecordLabel', () => {
  it('should create an instance', () => {
    expect(new RecordLabel( "Record Label 1" , ["Band X","Band 1"] , [])).toBeTruthy();
  });
});
