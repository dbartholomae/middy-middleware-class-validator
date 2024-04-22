# middy-middleware-class-validator

[![npm version](https://badge.fury.io/js/middy-middleware-class-validator.svg)](https://npmjs.org/package/middy-middleware-class-validator)
[![downloads](https://img.shields.io/npm/dw/middy-middleware-class-validator.svg)](https://npmjs.org/package/middy-middleware-class-validator)
[![open issues](https://img.shields.io/github/issues-raw/dbartholomae/middy-middleware-class-validator.svg)](https://github.com/dbartholomae/middy-middleware-class-validator/issues)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdbartholomae%2Fmiddy-middleware-class-validator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdbartholomae%2Fmiddy-middleware-class-validator?ref=badge_shield)
![npm bundle size](https://img.shields.io/bundlephobia/min/middy-middleware-class-validator)
[![debug](https://img.shields.io/badge/debug-blue.svg)](https://github.com/visionmedia/debug#readme)
[![build status](https://github.com/dbartholomae/middy-middleware-class-validator/workflows/Build%20and%20deploy/badge.svg?branch=main)](https://github.com/dbartholomae/middy-middleware-class-validator/actions?query=workflow%3A"Build+and+deploy")
[![codecov](https://codecov.io/gh/dbartholomae/middy-middleware-class-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/dbartholomae/middy-middleware-class-validator)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/middy-middleware-class-validator)
[![semantic release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release#badge)
[![CLA Assistant](https://cla-assistant.io/readme/badge/dbartholomae/middy-middleware-class-validator)](https://cla-assistant.io/dbartholomae/middy-middleware-class-validator)

A [middy](https://github.com/middyjs/middy) middleware that returns errors as http errors, compatible with [http-errors](https://www.npmjs.com/package/http-errors).

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install middy-middleware-class-validator --save
```

## Documentation

There is [additional documentation](https://dbartholomae.github.com/middy-middleware-class-validator).

## Usage

```typescript
// When using decorators, don't forget to import this in the very first line of code
import "reflect-metadata";

import { APIGatewayProxyEvent } from "aws-lambda";
import { IsString } from "class-validator";
import middy from "@middy/core";
import JSONErrorHandlerMiddleware from "middy-middleware-json-error-handler";

import ClassValidatorMiddleware, {
  WithBody,
} from "middy-middleware-class-validator";

// Define a validator for the body via class-validator
class NameBody {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}

// This is your AWS handler
async function helloWorld(event: WithBody<APIGatewayProxyEvent, NameBody>) {
  // Thanks to the validation middleware you can be sure body is typed correctly
  return {
    body: `Hello ${event.body.firstName} ${event.body.lastName}`,
    headers: {
      "content-type": "text",
    },
    statusCode: 200,
  };
}

// Let's "middyfy" our handler, then we will be able to attach middlewares to it
export const handler = middy(helloWorld)
  .use(
    ClassValidatorMiddleware({
      // Add the validation class here
      classType: NameBody,
    }),
  )
  // The class validator throws validation errors from http-errors which are compatible with
  // the error handler middlewares for middy
  .use(JSONErrorHandlerMiddleware());
```
