import { myMap, myFilter } from '../map-filter-reduce'

test('测试自定义map', () => {
  const arr = [1, 2, 3]
  const res = myMap<Number, Number>(arr, (item) => item)
  expect(res).toEqual([1, 2, 3])
})

test('测试自定义filter', () => {
  const arr = [1, 2, 3]
  const res = myFilter<Number>(arr, (item) => item > 1)
  expect(res).toEqual([2, 3])
})
