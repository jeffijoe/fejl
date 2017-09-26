import { BaseError as CustomError } from 'make-error'

/**
 * Base error class.
 */
export class BaseError<A> extends CustomError {
  /**
   * Initializes a new instance of the error.
   *
   * @param message Error message.
   * @param attrs Attributes to merge onto the instance.
   */
  constructor (message?: string, attrs?: Partial<ErrorAttributes<A>>) {
    super(message)
    Object.assign(this, attrs)
  }

  /**
   * Preconfigures an `assert` function.
   *
   * @example
   *   promise.then(MyError.makeAssert('Stuff was not found'))
   */
  static makeAssert<T> (message: string): Asserter<T> {
    return (value: T) => this.assert(value, message)
  }

  /**
   * If `data` is falsy, throws the error with the specified message.
   *
   * @param data The data to check.
   * @param message The message to construct the error with.
   */
  static assert <T> (data: T, message?: string): T | never {
    if (!data) {
      throw new this(message)
    }

    return data
  }

  /**
   * Default toJSON implementation.
   */
  toJSON (): Object {
    const result: any = {
      stack: this.stack,
      message: this.message
    }
    for (const prop in this) {
      const val = this[prop] as any
      if (typeof val !== 'function') {
        result[prop] = val
      }
    }

    return result
  }
}

/**
 * Asserter function.
 */
export type Asserter<T> = (value: any) => T | never

/**
 * Error attributes.
 */
export type ErrorAttributes<A> = A & { [key: string]: any }

/**
 * Base error constructor.
 */
export interface BaseErrorConstructor<A> {
  /**
   * Constructs the error.
   */
  new (message?: string, attrs?: Partial<ErrorAttributes<A>>): BaseError<A> & ErrorAttributes<A>
  /**
   * Makes an asserter function.
   */
  makeAssert<T> (message: string): Asserter<T>
  /**
   * Asserts the truthiness of the given value, throws the error otherwise.
   */
  assert<T> (data: T, message?: string): T | never
}

/**
 * Makes a new error class preconfigured with the specified settings,
 * as well as some extra methods for assertions.
 *
 * @param defaultMessage The default error message.
 * @param defaultAttrs The default attributes for creating new instances.
 */
export function MakeErrorClass <A = {}> (defaultMessage: string = 'An error occured', defaultAttrs?: A) {
  class ConfiguredError extends BaseError<A> {
    constructor (message?: string, attrs?: A) {
      // tslint:disable-next-line
      message = message === null || message === undefined ? defaultMessage : message
      // istanbul ignore next: TS <-> Istanbul issue
      super(message, Object.assign({}, defaultAttrs, attrs))
    }
  }

  return ConfiguredError as BaseErrorConstructor<A>
}
