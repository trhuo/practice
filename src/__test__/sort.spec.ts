import { insertionSort } from '../sort'

test('插入排序测试', () => {
  const arr = [2, 5, 4, 1, 3]
  const sortArr = insertionSort<number>(arr)
  expect(sortArr).toEqual([1, 2, 3, 4, 5])
})
