import curry from '../curry'

test('测试函数柯里化', () => {
  const fn = curry(function (a, b, c) {
    return [a, b, c]
  })
  expect(fn(1, 2)(3)).toEqual([1, 2, 3])
  expect(fn(1)(2)(3)).toEqual([1, 2, 3])
  expect(fn(1, 2, 3)).toEqual([1, 2, 3])
})
