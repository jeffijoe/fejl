import * as http from '../http'

describe('http', () => {
  it('sets a statusCode', () => {
    const err = new http.BadRequest('Uh-oh', { error: 'you suck' })
    expect(err.statusCode).toBe(400)
    expect(err.error).toBe('you suck')
  })

  it('allows inheriting (with decent type support)', () => {
    class ProxyIsDown extends http.ServiceUnavailable {
      proxy!: string

      constructor(message: string, data: { proxy: string }) {
        super(message, data)
      }
    }

    const err = new ProxyIsDown('Uh-oh', { proxy: 'one' })
    expect(err.proxy).toBe('one')
    expect(err.statusCode).toBe(503)

    const json = err.toJSON() as any
    expect(json.statusCode).toBe(503)
    expect(json.proxy).toBe('one')
    expect(json.message).toBe('Uh-oh')

    expect(() => ProxyIsDown.assert(false, 'Oh well')).toThrowError(ProxyIsDown)
  })
})
