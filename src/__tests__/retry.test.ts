import { retry, computeNextWaitTime } from '../retry'
import { throws } from 'smid'

test('basic', async () => {
  let i = 0
  const result = await retry(async (again, attempt) => {
    if (++i === 2) {
      return [i, attempt]
    }
    throw again(new Error('Nah'))
  })

  expect(result).toEqual([2, 2])
})

test('exhaust', async () => {
  let count = 0
  const err = await throws(
    retry(
      (again) => {
        count++
        throw again(new Error('Nah'))
      },
      { tries: 2, minTimeout: 5, factor: 1 }
    )
  )
  expect(err.message).toBe('Nah')
  expect(count).toBe(2)
})

test('wait time calculation', () => {
  expect(computeNextWaitTime(1000, 2000, 0, 1.5)).toBe(1000)
  expect(computeNextWaitTime(1000, 2000, 1000, 1.5)).toBe(1500)
  expect(computeNextWaitTime(1000, 2000, 1500, 1.5)).toBe(2000)

  expect(computeNextWaitTime(1000, 5000, 1500, 1.5)).toBe(2250)
  expect(computeNextWaitTime(1000, 5000, 2250, 1.5)).toBe(3375)
})

test('tries = 0', async () => {
  let count = 0
  const err = await throws(
    retry(
      (again) => {
        count++
        throw again(new Error('Nah'))
      },
      { tries: 0, minTimeout: 5, factor: 1 }
    )
  )
  expect(err.message).toBe('Nah')
  expect(count).toBe(1)
})
