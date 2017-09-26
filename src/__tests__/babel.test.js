const { throws } = require('smid')
const { MakeErrorClass } = require('../make-error-class')

describe('MakeErrorClass', () => {
  it('uses the specified class name', () => {
    class Test extends MakeErrorClass('This is a test') {}

    const err = throws(() => { throw new Test() })
    expect(Test.name).toBe('Test')
    expect(err.name).toBe('Test')
  })

  it('assigns default message and attributes', () => {
    class Test extends MakeErrorClass('This is a test', { statusCode: 400 }) {}

    const err = throws(() => {
      throw new Test()
    })
    expect(err.message).toBe('This is a test')
    expect(err.statusCode).toBe(400)
  })
})
