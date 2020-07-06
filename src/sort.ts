// 各种排序算法

/**
 * 选择排序
 * 从第二个元素开始每次选择一个元素，和前面已经排好序的元素做比较，插入到指定位置
 * @param arr 待排序数组
 */
export function insertionSort<T>(arr: Array<T>): Array<T> {
  const len = arr.length
  if (len === 0 || len === 1) return arr
  for (let i = 1; i < len; i++) {
    const tmp = arr[i]
    let j = i - 1
    for (; j >= 0 && tmp < arr[j]; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = tmp
  }
  return [...arr]
}
