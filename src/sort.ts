// 各种排序算法

/**
 * 选择排序
 * 从第二个元素开始每次选择一个元素，和前面已经排好序的元素做比较，插入到指定位置
 * @param arr 待排序数组
 */
export function insertionSort<T>(arr: Array<T>): Array<T> {
  const len = arr.length
  if (len <= 1) return arr
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

/**
 * 快速排序，最差的时间复杂度为 n 的平方，平均时间复杂度为 nlogn
 * 1.找一个基准值 pivot，将比基点小的数字放到基点左边数组，将比基点大的数数字放到基点右边数组，返回 [...左边数组，基点数字，...右边数组]
 * 2.对左边数组和右边数组执行第一步（递归）
 * @param arr 待排序数组
 */
export function quickSort<T>(arr: Array<T>): Array<T> {
  const len = arr.length
  if (len <= 1) return arr
  const pivot = arr[0]
  const leftArr = []
  const rightArr = []
  for (let i = 1; i < len; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i])
    } else {
      rightArr.push(arr[i])
    }
  }
  return [...quickSort(leftArr), arr[0], ...quickSort(rightArr)]
}
/**
 *
 * @param arr 待排序的数组
 */
export function bubbleSort<T>(arr: Array<T>): Array<T> {
  const len = arr.length
  if (len <= 1) return arr
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = tmp
      }
    }
  }
  return arr
}
