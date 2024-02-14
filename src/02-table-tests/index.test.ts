// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 3, action: 'invalid' as Action, expected: null },
  {
    a: 'invalid' as unknown as number,
    b: 3,
    action: Action.Add,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test('should run the test suite', () => {
    expect(true).toBe(true);
  });

  test.each(testCases)(
    'should perform calculation correctly for %p',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
