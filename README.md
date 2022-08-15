# Fejl

Error utility for Node apps, written in [TypeScript](https://www.typescriptlang.org).

[![npm](https://img.shields.io/npm/v/fejl.svg?maxAge=1000)](https://www.npmjs.com/package/fejl)
[![dependency Status](https://img.shields.io/david/jeffijoe/fejl.svg?maxAge=1000)](https://david-dm.org/jeffijoe/fejl)
[![devDependency Status](https://img.shields.io/david/dev/jeffijoe/fejl.svg?maxAge=1000)](https://david-dm.org/jeffijoe/fejl)
[![Build Status](https://img.shields.io/travis/jeffijoe/fejl.svg?maxAge=1000)](https://travis-ci.org/jeffijoe/fejl)
[![Coveralls](https://img.shields.io/coveralls/jeffijoe/fejl.svg?maxAge=1000)](https://coveralls.io/github/jeffijoe/fejl)
[![npm](https://img.shields.io/npm/dt/fejl.svg?maxAge=1000)](https://www.npmjs.com/package/fejl)
[![npm](https://img.shields.io/npm/l/fejl.svg?maxAge=1000)](https://github.com/jeffijoe/fejl/blob/master/LICENSE.md)
[![Built with TypeScript](https://img.shields.io/badge/typings-included-brightgreen.svg)](http://typescriptlang.org)

# Install

With `npm`:

```
npm install fejl
```

Or with `yarn`

```
yarn add fejl
```

# Usage

Fejl exports a general-purpose `MakeErrorClass` function which lets you build an error class with a default message and attributes.

```js
import { MakeErrorClass } from 'fejl'

class InvalidConfigError extends MakeErrorClass(
  // Default message
  'The configuration file is invalid',
  // Default props
  { infoUrl: 'https://example.com/error-info' }
) {}

// Using defaults
try {
  throw new InvalidConfigError()
} catch (err) {
  console.log(err.name) // 'InvalidConfigError'
  console.log(err.message) // 'The configuration file is invalid'
  console.log(err.infoUrl) // 'https://example.com/error-info'
  console.log(err.stack) // <error stack>
  console.log(err instanceof InvalidConfigErrror) // true
}

// Overriding defaults
try {
  throw new InvalidConfigError('The config file was not found', {
    infoUrl: 'https://example.com/other-err',
    code: 123
  })
} catch (err) {
  console.log(err.message) // 'The configuration file is invalid'
  console.log(err.infoUrl) // 'https://example.com/other-err'
  console.log(err.code) // 123
}
```

Additionally, for your convenience, a few common HTTP errors have been defined which set a `statusCode`, see [`http.ts`](/src/http.ts) for which ones. If you think I missed some important ones, feel free to open an issue/PR.

# Additional awesomeness

Fejl wants to get rid of excessive boilerplate in conditionally throwing errors. Therefore, each error class created with `MakeErrorClass` comes with the following **static functions**:

## `assert<T>(data: T, message: string): void`

Let's create ourselves an error class to play with.

```js
import { MakeErrorClass } from 'fejl'

// Defaults are optional
class InvalidInput extends MakeErrorClass() {}
```

Let's see how `InvalidInput.assert` can make our lives easier.

**Ugly:**

```js
function someFunc(value) {
  if (!value) {
    throw new InvalidInput('Value is required.')
  }
}
```

**Sexy:**

```js
function someFunc(value) {
  InvalidInput.assert(value, 'Value is required')
}
```

## `makeAssert<T>(message: string): Asserter<T>`

Sometimes an error can be thrown in multiple places, but the message would be the same. `makeAssert` will generate an asserter function that can be reused, and which is also really useful when working with `Promise`s.

`MyError.makeAssert('Nope')` is essentially sugar for `(data) => MyError.assert(data, 'Nope')`.

For this example, we want to use one of the built-in HTTP errors.

```js
import { NotFound } from 'fejl'
```

**Ugly:**

```js
async function getTaskForUser(userId, taskId) {
  const user = await getUserAsync(userId)
  if (!user) {
    throw new NotFound('User not found')
  }

  const task = await getTaskAsync(userId, taskId)
  if (!task) {
    throw new NotFound('Task not found')
  }

  return task
}
```

**Sexy:**

```js
async function getTaskForUser(userId, taskId) {
  const user = await getUserAsync(userId)
  NotFound.assert(user, 'User not found')

  const task = await getTaskAsync(userId, taskId)
  NotFound.assert(task, 'Task not found')

  return task
}
```

**Sexier:**

```js
async function getTaskForUser(userId, taskId) {
  const user = await getUserAsync(userId).then(
    NotFound.makeAssert('User not found')
  )

  const task = await getTaskAsync(userId, taskId).then(
    NotFound.makeAssert('Task not found')
  )

  return task
}
```

## `retry<T>(fn: () => Promise<T>, opts?: RetryOpts): Promise<T>`

Keeps running the inner `fn` until it _does not_ throw errors of the type that `.retry` was called on.

```ts
const eventuallyExists = await NotFound.retry(
  async () => {
    const report = await getSomeReportThatMayOrMayNotExistAtSomePointInTime().then(
      NotFound.makeAssert('The report was not found')
    )
    return report
  },
  {
    // These are available options with their defaults.
    tries: 10, // How many times to try
    factor: 2, // The exponential backoff factor to use.
    minTimeout: 1000, // The minimum amount of time to wait between retries in ms
    maxTimeout: Infinity // The nax amount of time to wait between retries in ms
  }
)
```

You can import the `retry` top-level utilty that is not bound to any particular error.

The API is similar to `promise-retry`.

```ts
import { retry } from 'fejl'

const result = await retry(
  async (again, attempt) => {
    return getSomeReportThatMayOrMayNotExistAtSomePointInTime()
      .then(NotFound.makeAssert('The report was not found'))
      .catch(err => {
        if (err instanceof NotFound) {
          // Only retry on NotFound errors.
          throw again(err)
        }
        throw err
      })
  },
  {
    // options...
    tries: 10
  }
)
```

## `ignore<T>(valueToReturnOnCatch: T): IgnoreFunc<T>`

Makes an ignore function for this error class that will return the specified value if caught.
Otherwise throws the original error.

```ts
// If a `NotFound` is thrown, returns 99.95
const price = await getSomeRemotePriceThatMayOrMayNotExist().catch(
  NotFound.ignore(99.95)
)

// Using try-catch
try {
  return getSomeRemotePriceThatMayOrMayNotExist()
} catch (err) {
  return NotFound.ignore(99.95)(err)
}
```

You can check multiple errors at once by using the top-level higher-order ignore utility.

```ts
import { ignore } from 'fejl'

// If a `NotFound` or `Forbidden` is thrown, returns 99.95
const price = await getSomeRemotePriceThatMayOrMayNotExist().catch(
  // Note the double-invocation
  ignore(NotFound, Forbidden)(99.95)
)
```

## `getHttpErrorConstructorForStatusCode(statusCode: number): HttpErrorConstructor`

Given a status code, returns the proper error to throw.

```ts
import { getHttpErrorConstructorForStatusCode, BadRequest } from 'fejl'

const ErrorCtor = getHttpErrorConstructorForStatusCode(400)

ErrorCtor === BadRequest // true
```

# What's in a name?

"fejl" _[fɑjl]_ is danish for _"error"_, and when pronounced in English also sounds like the word "fail".

# Author

Jeff Hansen — [@Jeffijoe](https://twitter.com/Jeffijoe)
