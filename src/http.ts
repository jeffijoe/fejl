/**
 * Exposes common HTTP errors with a preconfigured `statusCode` for convenience.
 * This does not mean you have to use HTTP to use them, it's just that
 * HTTP has already defined a nice set of common error types, and tacking
 * on the HTTP status code makes it easier to consume in HTTP apps.
 */

import { MakeErrorClass, BaseErrorConstructor } from './make-error-class'

/**
 * Creates a `BadRequest` error.
 */
export class BadRequest extends MakeHttpError(400, 'Bad Request') {}

/**
 * Creates a `NotAuthenticated` error.
 */
export class NotAuthenticated extends MakeHttpError(401, 'Not Authenticated') {}

/**
 * Creates a `PaymentError` error.
 */
export class PaymentError extends MakeHttpError(402, 'Payment Error') {}

/**
 * Creates a `Forbidden` error.
 */
export class Forbidden extends MakeHttpError(403, 'Forbidden') {}

/**
 * Creates a `NotFound` error.
 */
export class NotFound extends MakeHttpError(404, 'Not Found') {}

/**
 * Creates a `MethodNotAllowed` error.
 */
export class MethodNotAllowed extends MakeHttpError(
  405,
  'Method Not Allowed'
) {}

/**
 * Creates a `NotAcceptable` error.
 */
export class NotAcceptable extends MakeHttpError(406, 'Not Acceptable') {}

/**
 * Creates a `Timeout` error.
 */
export class Timeout extends MakeHttpError(408, 'Timeout') {}

/**
 * Creates a `Conflict` error.
 */
export class Conflict extends MakeHttpError(409, 'Conflict') {}

/**
 * Creates a `LengthRequired` error.
 */
export class LengthRequired extends MakeHttpError(411, 'Length Required') {}

/**
 * Creates a `Unprocessable` error.
 */
export class Unprocessable extends MakeHttpError(422, 'Unprocessable') {}

/**
 * Creates a `TooManyRequests` error.
 */
export class TooManyRequests extends MakeHttpError(429, 'Too Many Requests') {}

/**
 * Creates a `GeneralError` error.
 */
export class GeneralError extends MakeHttpError(500, 'General Error') {}

/**
 * Creates a `NotImplemented` error.
 */
export class NotImplemented extends MakeHttpError(501, 'Not Implemented') {}

/**
 * Creates a `BadGateway` error.
 */
export class BadGateway extends MakeHttpError(502, 'Bad Gateway') {}

/**
 * Creates a `Unavailable` error.
 */
export class Unavailable extends MakeHttpError(503, 'Unavailable') {}

/**
 * Bulds a HTTP status code based error class.
 *
 * @private
 * @param statusCode The status code.
 * @param message The message.
 */
function MakeHttpError (
  statusCode: number,
  message: string
): BaseErrorConstructor<{ statusCode: number }> {
  return MakeErrorClass(message, { statusCode })
}
