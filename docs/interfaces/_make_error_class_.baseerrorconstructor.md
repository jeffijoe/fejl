[Fejl](../README.md) > ["make-error-class"](../modules/_make_error_class_.md) > [BaseErrorConstructor](../interfaces/_make_error_class_.baseerrorconstructor.md)



# Interface: BaseErrorConstructor


Base error constructor.

## Type parameters
#### A 

## Constructors
<a id="constructor"></a>


### ⊕ **new BaseErrorConstructor**(message?: *`undefined`⎮`string`*, attrs?: *`Partial`.<[ErrorAttributes](../modules/_make_error_class_.md#errorattributes)`A`>*): [BaseError](../classes/_make_error_class_.baseerror.md)`A`[ErrorAttributes](../modules/_make_error_class_.md#errorattributes)`A`






Constructs the error.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `undefined`⎮`string`   |  - |
| attrs | `Partial`.<[ErrorAttributes](../modules/_make_error_class_.md#errorattributes)`A`>   |  - |





**Returns:** [BaseError](../classes/_make_error_class_.baseerror.md)`A`[ErrorAttributes](../modules/_make_error_class_.md#errorattributes)`A`

---


## Methods
<a id="assert"></a>

###  assert

► **assert**T(data: *`T`*, message?: *`undefined`⎮`string`*): `T`⎮`never`







Asserts the truthiness of the given value, throws the error otherwise.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `T`   |  - |
| message | `undefined`⎮`string`   |  - |





**Returns:** `T`⎮`never`





___

<a id="makeassert"></a>

###  makeAssert

► **makeAssert**T(message: *`string`*): [Asserter](../modules/_make_error_class_.md#asserter)`T`







Makes an asserter function.


**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string`   |  - |





**Returns:** [Asserter](../modules/_make_error_class_.md#asserter)`T`





___


