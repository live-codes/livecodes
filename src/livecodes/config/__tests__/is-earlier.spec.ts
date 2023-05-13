import { isEarlier } from '../upgrade-config';

describe('isEarlier', () => {
  test('semver', () => {
    expect(
      isEarlier({
        version: '0.4.0',
        comparedTo: '0.6.0',
      }),
    ).toEqual(true);

    expect(
      isEarlier({
        version: '0.4.5',
        comparedTo: '0.6.0',
      }),
    ).toEqual(true);

    expect(
      isEarlier({
        version: '0.4.5',
        comparedTo: '0.6.5',
      }),
    ).toEqual(true);

    expect(
      isEarlier({
        version: '0.6.0',
        comparedTo: '0.6.1',
      }),
    ).toEqual(true);

    expect(
      isEarlier({
        version: '0.4.0',
        comparedTo: '0.4.0',
      }),
    ).toEqual(false);

    expect(
      isEarlier({
        version: '0.4.1',
        comparedTo: '0.4.0',
      }),
    ).toEqual(false);

    expect(
      isEarlier({
        version: '0.6.0',
        comparedTo: '0.4.0',
      }),
    ).toEqual(false);
  });

  test('numbers', () => {
    expect(
      isEarlier({
        version: '4',
        comparedTo: '6',
      }),
    ).toEqual(true);

    expect(
      isEarlier({
        version: '4',
        comparedTo: '4',
      }),
    ).toEqual(false);

    expect(
      isEarlier({
        version: '6',
        comparedTo: '4',
      }),
    ).toEqual(false);
  });

  test('number vs semver', () => {
    expect(
      isEarlier({
        version: '0.6.0',
        comparedTo: '1',
      }),
    ).toEqual(true);

    expect(
      isEarlier({
        version: '4.5.3',
        comparedTo: '2',
      }),
    ).toEqual(false);

    expect(
      isEarlier({
        version: '1',
        comparedTo: '0.4.0',
      }),
    ).toEqual(false);
  });
});
