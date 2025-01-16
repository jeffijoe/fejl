/**
 * A function being passed the retryer.
 */
export type Retryable<T> = (
  retry: (err: any) => any,
  attempts: number,
) => Promise<T>

/**
 * Options for retrying.
 */
export interface RetryOptions {
  /**
   * How many times to try
   */
  tries: number
  /**
   * The exponential backoff factor to use.
   */
  factor: number
  /**
   * The minimum amount of time to wait between retries in ms
   */
  minTimeout: number
  /**
   * The nax amount of time to wait between retries in ms
   */
  maxTimeout: number
}

/**
 * Default options for retrying.
 */
const defaultOptions: RetryOptions = {
  tries: 10,
  factor: 2,
  minTimeout: 1000,
  maxTimeout: Infinity,
}

/**
 * Used to distinguish retry errors.
 */
const SYM_RETRY = Symbol('Retry')

/**
 * Retries the inner function. Works the same as `promise-retry`.
 * @param fn
 */
export function retry<T>(
  fn: Retryable<T>,
  opts?: Partial<RetryOptions>,
): Promise<T> {
  return Promise.resolve().then(() => {
    let attempts = 0
    let waitTime = 0

    const {
      tries: retries,
      factor,
      minTimeout,
      maxTimeout,
    } = Object.assign({}, defaultOptions, opts)

    return inner()

    /**
     * The inner function.
     */
    function inner(): Promise<T> {
      return Promise.resolve()
        .then(() => fn(getErrorToThrow, ++attempts))
        .catch((err) => {
          if (err === SYM_RETRY) {
            waitTime = nextWaitTime()
            return delay(waitTime).then(inner)
          }
          throw err
        })
    }

    /**
     * Throws the error or a retry error depending on the state.
     * @param err
     */
    function getErrorToThrow(err: any) {
      if (attempts >= retries) {
        return err
      }

      return SYM_RETRY
    }

    /**
     * Gets the next wait time.
     */
    function nextWaitTime() {
      return computeNextWaitTime(minTimeout, maxTimeout, waitTime, factor)
    }
  })
}

/**
 * Waits for `ms` amount of time.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Computes the next wait time.
 * @param minTimeout
 * @param maxTimeout
 * @param waitTime
 * @param factor
 */
export function computeNextWaitTime(
  minTimeout: number,
  maxTimeout: number,
  waitTime: number,
  factor: number,
) {
  return Math.max(Math.min(waitTime * factor, maxTimeout), minTimeout)
}
