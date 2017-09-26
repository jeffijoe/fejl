[Fejl](../README.md) > ["make-error-class"](../modules/_make_error_class_.md) > [BaseError](../classes/_make_error_class_.baseerror.md)



# Class: BaseError


Base error class.

## Type parameters
#### A 
## Hierarchy


 `BaseError`

**↳ BaseError**







## Implements

* `Error`

## Index

### Constructors

* [constructor](_make_error_class_.baseerror.md#constructor)


### Properties

* [message](_make_error_class_.baseerror.md#message)
* [name](_make_error_class_.baseerror.md#name)
* [stack](_make_error_class_.baseerror.md#stack)


### Methods

* [toJSON](_make_error_class_.baseerror.md#tojson)
* [assert](_make_error_class_.baseerror.md#assert)
* [makeAssert](_make_error_class_.baseerror.md#makeassert)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new BaseError**(message?: *`undefined`⎮`string`*, attrs?: *`Partial`.<[ErrorAttributes](../modules/_make_error_class_.md#errorattributes)`A`>*): [BaseError](_make_error_class_.baseerror.md)






Initializes a new instance of the error.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `undefined`⎮`string`   |  Error message. |
| attrs | `Partial`.<[ErrorAttributes](../modules/_make_error_class_.md#errorattributes)`A`>   |  Attributes to merge onto the instance. |





**Returns:** [BaseError](_make_error_class_.baseerror.md)

---


## Properties
<a id="message"></a>

###  message

**●  message**:  *`string`* 






___

<a id="name"></a>

###  name

**●  name**:  *`string`* 






___

<a id="stack"></a>

###  stack

**●  stack**:  *`string`* 






___


## Methods
<a id="tojson"></a>

###  toJSON

► **toJSON**(): `Object`







Default toJSON implementation.




**Returns:** `Object`





___

<a id="assert"></a>

### «Static» assert

► **assert**T(data: *`T`*, message?: *`undefined`⎮`string`*): `T`⎮`never`







If `data` is falsy, throws the error with the specified message.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `T`   |  The data to check. |
| message | `undefined`⎮`string`   |  The message to construct the error with. |





**Returns:** `T`⎮`never`





___

<a id="makeassert"></a>

### «Static» makeAssert

► **makeAssert**T(message: *`string`*): [Asserter](../modules/_make_error_class_.md#asserter)`T`







Preconfigures an `assert` function.
*__example__*: promise.then(MyError.makeAssert('Stuff was not found'))



**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |





**Returns:** [Asserter](../modules/_make_error_class_.md#asserter)`T`





___


