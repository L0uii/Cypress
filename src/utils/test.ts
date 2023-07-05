const defaultIterator = fn => ({ name = null, params, expected }: Utils.Test.Case) => {
  // @ts-ignore
  it(`should ${name || `return ${JSON.stringify(expected)} for params with: ${JSON.stringify(params)}`}`, () => {
    // @ts-ignore
    expect(fn(...params)).toEqual(expected);
  });
};

/**
 * @example
 *  testCaseFactory((param1 = 0, param2 = 0) => param1 + param2), [{
 *    params: [],
 *    expected: 0,
 *  }, {
 *    params: [1, 1],
 *    expected: 2,
 *  }]
*/
export const testCaseFactory = (fnTarget, testCases: Utils.Test.Case[] = [], iteratorWrapper = defaultIterator) => {
  const iterator = iteratorWrapper(fnTarget);
  testCases.forEach(iterator);
};

export default {
  testCaseFactory,
};
