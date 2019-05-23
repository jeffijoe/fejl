/**
 * Exposes common HTTP errors with a preconfigured `statusCode` for convenience.
 * This does not mean you have to use HTTP to use them, it's just that
 * HTTP has already defined a nice set of common error types, and tacking
 * on the HTTP status code makes it easier to consume in HTTP apps.
 */

import { MakeErrorClass, BaseErrorConstructor } from './make-error-class'

/** *********************************************
 * List of all CLIENT Errors (4xx)
 */

/**
 * Creates a `BadRequest` error.
 */
export class BadRequest extends MakeHttpError(400, 'Bad Request') {}

/**
 * Creates a `NotAuthenticated` error.
 */
export class NotAuthenticated extends MakeHttpError(401, 'Not Authenticated') {}

/**
 * Creates a `PaymentRequired` error.
 */
export class PaymentRequired extends MakeHttpError(402, 'Payment Required') {}

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
 * Creates a `ProxyAuthenticationRequired` error.
 */
export class ProxyAuthenticationRequired extends MakeHttpError(
  407,
  'Proxy Authentication Required'
) {}

/**
 * Creates a `Timeout` error.
 */
export class Timeout extends MakeHttpError(408, 'Timeout') {}

/**
 * Creates a `Conflict` error.
 */
export class Conflict extends MakeHttpError(409, 'Conflict') {}

/**
 * Creates a `Gone` error.
 */
export class Gone extends MakeHttpError(410, 'Gone') {}

/**
 * Creates a `LengthRequired` error.
 */
export class LengthRequired extends MakeHttpError(411, 'Length Required') {}

/**
 * Creates a `PreconditionFailed` error.
 */
export class PreconditionFailed extends MakeHttpError(
  412,
  'Precondition Failed'
) {}

/**
 * Creates a `PayloadTooLarge` error.
 */
export class PayloadTooLarge extends MakeHttpError(413, 'Payload Too Large') {}

/**
 * Creates a `UriTooLong` error.
 */
export class UriTooLong extends MakeHttpError(414, 'URI Too Long') {}

/**
 * Creates a `UnsupportedMediaType` error.
 */
export class UnsupportedMediaType extends MakeHttpError(
  415,
  'Unsupported Media Type'
) {}

/**
 * Creates a `RequestRangeNotSatisfiable` error.
 */
export class RequestRangeNotSatisfiable extends MakeHttpError(
  416,
  'Request Range Not Satifiable'
) {}

/**
 * Creates a `ExpectationFailed` error.
 */
export class ExpectationFailed extends MakeHttpError(
  417,
  'Expectation Failed'
) {}

/**
 * Creates a `IAmATeapot` error.
 */
export class IAmATeapot extends MakeHttpError(418, 'I am a Teapot') {}

/**
 * Creates a `MisdirectedRequest` error.
 */
export class MisdirectedRequest extends MakeHttpError(
  421,
  'Misdirected Request'
) {}

/**
 * Creates a `Unprocessable` error.
 */
export class Unprocessable extends MakeHttpError(422, 'Unprocessable') {}

/**
 * Creates a `Locked` error.
 */
export class Locked extends MakeHttpError(423, 'Locked') {}

/**
 * Creates a `FailedDependency` error.
 */
export class FailedDependency extends MakeHttpError(424, 'Failed Dependency') {}

/**
 * Creates a `TooEarly` error.
 */
export class TooEarly extends MakeHttpError(425, 'Too Early') {}

/**
 * Creates a `UpgradeRequired` error.
 */
export class UpgradeRequired extends MakeHttpError(426, 'Upgrade Required') {}

/**
 * Creates a `PreconditionRequired` error.
 */
export class PreconditionRequired extends MakeHttpError(
  428,
  'Precondition Required'
) {}

/**
 * Creates a `TooManyRequests` error.
 */
export class TooManyRequests extends MakeHttpError(429, 'Too Many Requests') {}

/**
 * Creates a `RequestHeaderFieldsTooLarge` error.
 */
export class RequestHeaderFieldsTooLarge extends MakeHttpError(
  431,
  'Request Header Fields Too Large'
) {}

/**
 * Creates a `UnavailableForLegalReasons` error.
 */
export class UnavailableForLegalReasons extends MakeHttpError(
  451,
  'Unavailable For Legal Reasons'
) {}

/** *********************************************
 * List of all SERVER Errors (5xx)
 */

/**
 * Creates a `GeneralError` error.
 * This is basically some kind of `InternalServerError` error.
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
 * Creates a `ServiceUnavailable` error.
 */
export class ServiceUnavailable extends MakeHttpError(
  503,
  'Service Unavailable'
) {}

/**
 * Creates a `GatewayTimeout` error.
 */
export class GatewayTimeout extends MakeHttpError(504, 'Gateway Timeout') {}

/**
 * Creates a `HttpVersionNotSupported` error.
 */
export class HttpVersionNotSupported extends MakeHttpError(
  505,
  'HTTP Version Not Supported'
) {}

/**
 * Creates a `VariantAlsoNegotiates` error.
 */
export class VariantAlsoNegotiates extends MakeHttpError(
  506,
  'Variant Also Negotiates'
) {}

/**
 * Creates a `InsufficientStorage` error.
 */
export class InsufficientStorage extends MakeHttpError(
  507,
  'Insufficient Storage'
) {}

/**
 * Creates a `LoopDetected` error.
 */
export class LoopDetected extends MakeHttpError(508, 'Loop Detected') {}

/**
 * Creates a `NotExtended` error.
 */
export class NotExtended extends MakeHttpError(510, 'Not Extended') {}

/**
 * Creates a `NetworkAuthenticationRequired` error.
 */
export class NetworkAuthenticationRequired extends MakeHttpError(
  511,
  'Network Authentication Required'
) {}

/**
 * Builds a HTTP status code based error class.
 *
 * @private
 * @param statusCode The status code.
 * @param message The message.
 */
function MakeHttpError(
  statusCode: number,
  message: string
): BaseErrorConstructor<{ statusCode: number }> {
  return MakeErrorClass(message, { statusCode })
}
