import deepCopy from '../deep-clone'

test('基本类型复制', () => {
  const copy1 = deepCopy(1)
  expect(1).toEqual(copy1)
  const copy2 = deepCopy('hello world')
  expect('hello world').toEqual(copy2)
})

test('基本对象复制', () => {
  const obj = { num: 1 }
  const copy = deepCopy(obj)
  expect(obj).toEqual(copy)
  expect(obj === copy).toBe(false)
})

test('嵌套对象复制', () => {
  const obj = {} as any
  obj.target = obj
  const copy = deepCopy(obj)
  expect(obj).toEqual(copy)
})

test('深层对象复制', () => {
  const obj = { a: { b: { c: {} } } }
  const copy = deepCopy(obj)
  expect(obj).toEqual(copy)
  expect(obj === copy).toBe(false)
  expect(obj.a === copy.a).toBe(false)
  expect(obj.a.b === copy.a.b).toBe(false)
  expect(obj.a.b.c === copy.a.b.c).toBe(false)
})
