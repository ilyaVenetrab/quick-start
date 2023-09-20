import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms number minutes to string with minutes prefix', () => {
    expect(pipe.transform(35)).toBe('35 мин');
  });

  it('transforms number minutes to string with hours prefix', () => {
    expect(pipe.transform(135)).toBe('2 ч 15 мин');
  });

  it('transforms number minutes to string with hours and minutes prefix', () => {
    expect(pipe.transform(180)).toBe('3 ч ');
  });
});
