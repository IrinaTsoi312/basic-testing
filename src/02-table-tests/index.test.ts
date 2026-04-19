// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 4, action: Action.Subtract, expected: 1 },
  { a: 6, b: 7, action: Action.Multiply, expected: 42 },
  { a: 8, b: 1, action: Action.Divide, expected: 8 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 3, action: 'invalid' as Action, expected: null },
  {
    a: 'invalid' as unknown as number,
    b: 3,
    action: Action.Add,
    expected: null,
  }
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform calculation correctly',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
