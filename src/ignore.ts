/**
 * Type for the ignore func.
 */
export type IgnoreFunc<T> = (err: any) => T | never

/**
 * Utility for ignoring certain errors and returning a default value.
 *
 * @param errorClasses
 */
export function ignore<T>(...errorClasses: Array<new () => Error>) {
  return function createIgnoreFn(valToReturnOnCatch: T): IgnoreFunc<T> {
    return function ignoreImpl(err: any) {
      if (errorClasses.some((C) => err instanceof C)) {
        return valToReturnOnCatch
      }
      throw err
    }
  }
}
