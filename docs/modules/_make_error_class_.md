[Fejl](../README.md) > ["make-error-class"](../modules/_make_error_class_.md)



# External module: "make-error-class"

## Index

### Classes

* [BaseError](../classes/_make_error_class_.baseerror.md)


### Interfaces

* [BaseErrorConstructor](../interfaces/_make_error_class_.baseerrorconstructor.md)


### Type aliases

* [Asserter](_make_error_class_.md#asserter)
* [ErrorAttributes](_make_error_class_.md#errorattributes)


### Functions

* [MakeErrorClass](_make_error_class_.md#makeerrorclass)



---
## Type aliases
<a id="asserter"></a>

###  Asserter

**Τ Asserter**:  *function* 




Asserter function.

#### Type declaration
(value: *`any`*): `T`⎮`never`





**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any`   |  - |





**Returns:** `T`⎮`never`






___

<a id="errorattributes"></a>

###  ErrorAttributes

**Τ ErrorAttributes**:  *`A`object* 




Error attributes.




___


## Functions
<a id="makeerrorclass"></a>

###  MakeErrorClass

► **MakeErrorClass**A(defaultMessage?: *`string`*, defaultAttrs?: *[A]()*): [BaseErrorConstructor](../interfaces/_make_error_class_.baseerrorconstructor.md)`A`







Makes a new error class preconfigured with the specified settings, as well as some extra methods for assertions.


**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| defaultMessage | `string`  | &quot;An error occured&quot; |   The default error message. |
| defaultAttrs | [A]()  | - |   The default attributes for creating new instances. |





**Returns:** [BaseErrorConstructor](../interfaces/_make_error_class_.baseerrorconstructor.md)`A`





___


