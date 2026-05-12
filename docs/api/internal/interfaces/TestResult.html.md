# Interface: TestResult

Represents the result of a single test.

## Properties

### duration

> **duration**: `number`

Time taken to run the test in milliseconds.

#### Defined in

[src/sdk/models.ts:653](https://github.com/live-codes/livecodes/blob/aec9b8c37d4ecd87867f4910f062861109d183d8/src/sdk/models.ts#L653)

***

### errors

> **errors**: `string`[]

Array of error messages if the test failed.

#### Defined in

[src/sdk/models.ts:655](https://github.com/live-codes/livecodes/blob/aec9b8c37d4ecd87867f4910f062861109d183d8/src/sdk/models.ts#L655)

***

### status

> **status**: `"pass"` \| `"fail"` \| `"skip"`

The status of the test.

#### Defined in

[src/sdk/models.ts:657](https://github.com/live-codes/livecodes/blob/aec9b8c37d4ecd87867f4910f062861109d183d8/src/sdk/models.ts#L657)

***

### testPath

> **testPath**: `string`[]

The path to the test in the test suite.

#### Defined in

[src/sdk/models.ts:659](https://github.com/live-codes/livecodes/blob/aec9b8c37d4ecd87867f4910f062861109d183d8/src/sdk/models.ts#L659)