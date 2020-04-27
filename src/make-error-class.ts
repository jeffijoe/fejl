import MakeError from 'make-error'
import { retry, RetryOptions } from './retry'
import { ignore, IgnoreFunc } from './ignore'

const CustomError = MakeError.BaseError

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
  constructor(message?: string, attrs?: Partial<ErrorAttributes<A>>) {
    super(message)
    Object.assign(this, attrs)
  }

  /**
   * Preconfigures an `assert` function.
   *
   * @param message Error message.
   * @param attrs Attributes to merge onto the instance.
   *
   * @example
   *   promise.then(MyError.makeAssert('Stuff was not found'))
   */
  static makeAssert<T, A>(
    message: string,
    attrs?: Partial<ErrorAttributes<A>>
  ): Asserter<T> {
    return (value: T) => this.assert(value, message, attrs)
  }

  /**
   * If `data` is falsy, throws the error with the specified message.
   *
   * @param data The data to check.
   * @param message The message to construct the error with.
   * @param attrs Attributes to merge onto the instance.
   */
  static assert<T, A>(
    data: T,
    message?: string,
    attrs?: Partial<ErrorAttributes<A>>
  ): NonFalsy<T> {
    if (!data) {
      throw new this(message, attrs)
    }

    return data as NonFalsy<T>
  }

  /**
   * Retries the function until it does not throw the error type.
   * @param fn
   * @param opts
   */
  static retry<T>(
    fn: (attempt: number) => Promise<T>,
    opts?: Partial<RetryOptions>
  ): Promise<T> {
    return retry((again, attempt) => {
      return Promise.resolve()
        .then(() => fn(attempt))
        .catch((err) => {
          if (err instanceof this) {
            throw again(err)
          }
          throw err
        })
    }, opts)
  }

  /**
   * Makes an ignore function for this error class.
   */
  static ignore(): IgnoreFunc<undefined>
  /**
   * Makes an ignore function for this error class that will return the specified value if caught.
   *
   * @param valueToReturnOnCatch
   */
  static ignore<T>(valueToReturnOnCatch: T): IgnoreFunc<T>
  /**
   * Makes an ignore function for this error class that will return the specified value if caught.
   *
   * @param valueToReturnOnCatch
   */
  static ignore(valueToReturnOnCatch?: any): IgnoreFunc<any> {
    return ignore(this)(valueToReturnOnCatch)
  }

  /**
   * Default toJSON implementation.
   */
  toJSON(): Object {
    const result: any = {
      stack: this.stack,
      message: this.message,
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
export type Asserter<T> = (value: T) => NonFalsy<T>

/**
 * Non-falsy value.
 */
export type NonFalsy<T> = Exclude<T, false | 0 | undefined | null | ''>

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
  new (message?: string, attrs?: Partial<ErrorAttributes<A>>): BaseError<A> &
    ErrorAttributes<A>
  /**
   * Makes an asserter function.
   */
  makeAssert<T>(
    message: string,
    attrs?: Partial<ErrorAttributes<A>>
  ): Asserter<T>
  /**
   * Asserts the truthiness of the given value, throws the error otherwise.
   */
  assert<T>(
    data: T,
    message?: string,
    attrs?: Partial<ErrorAttributes<A>>
  ): NonFalsy<T>
  /**
   * Retries the function until it does not throw the error type.
   */
  retry<T>(
    fn: (attempt: number) => Promise<T>,
    opts?: Partial<RetryOptions>
  ): Promise<T>
  /**
   * Makes an ignore function for this error class.
   */
  ignore(): IgnoreFunc<undefined>
  /**
   * Makes an ignore function for this error class that will return the specified value if caught.
   *
   * @param valueToReturnOnCatch
   */
  ignore<T>(valueToReturnOnCatch: T): IgnoreFunc<T>
  /**
   * Makes an ignore function for this error class that will return the specified value if caught.
   *
   * @param valueToReturnOnCatch
   */
  ignore(valueToReturnOnCatch?: any): IgnoreFunc<any>
}

/**
 * Makes a new error class preconfigured with the specified settings,
 * as well as some extra methods for assertions.
 *
 * @param defaultMessage The default error message.
 * @param defaultAttrs The default attributes for creating new instances.
 */
export function MakeErrorClass<A = {}>(
  defaultMessage: string = 'An error occured',
  defaultAttrs?: A
) {
  class ConfiguredError extends BaseError<A> {
    constructor(message?: string, attrs?: A) {
      message =
        // tslint:disable-next-line
        message === null || message === undefined ? defaultMessage : message
      // istanbul ignore next: TS <-> Istanbul issue
      super(message, Object.assign({}, defaultAttrs, attrs))
    }
  }

  return (ConfiguredError as unknown) as BaseErrorConstructor<A>
}
