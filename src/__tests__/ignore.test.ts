import { MakeErrorClass } from '../make-error-class'
import { ignore } from '../ignore'

test('ignore', async () => {
  class OneError extends MakeErrorClass() {}
  class TwoError extends MakeErrorClass() {}

  const throwYourHandsInTheAir = async (one: boolean) => {
    if (one) {
      throw new OneError('One')
    } else {
      throw new TwoError('Two')
    }
  }

  expect(
    await throwYourHandsInTheAir(true).catch(ignore(OneError, TwoError)(123))
  ).toBe(123)
  expect(
    await throwYourHandsInTheAir(false).catch(ignore(OneError, TwoError)(123))
  ).toBe(123)

  await expect(
    throwYourHandsInTheAir(true).catch(ignore(TwoError)(123))
  ).rejects.toBeInstanceOf(OneError)
})
