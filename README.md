# middy-middleware-class-validator
 [![npm version](https://badge.fury.io/js/middy-middleware-class-validator.svg)](https://npmjs.org/package/middy-middleware-class-validator)  [![downloads](https://img.shields.io/npm/dw/middy-middleware-class-validator.svg)](https://npmjs.org/package/middy-middleware-class-validator)  [![open issues](https://img.shields.io/github/issues-raw/dbartholomae/middy-middleware-class-validator.svg)](https://github.com/dbartholomae/middy-middleware-class-validator/issues)  [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdbartholomae%2Fmiddy-middleware-class-validator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdbartholomae%2Fmiddy-middleware-class-validator?ref=badge_shield) [![debug](https://img.shields.io/badge/debug-blue.svg)](https://github.com/visionmedia/debug#readme)  [![build status](https://img.shields.io/circleci/project/github/dbartholomae/middy-middleware-class-validator/master.svg?style=flat)](https://circleci.com/gh/dbartholomae/workflows/middy-middleware-class-validator/tree/master)  [![codecov](https://codecov.io/gh/dbartholomae/middy-middleware-class-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/dbartholomae/middy-middleware-class-validator)  [![dependency status](https://david-dm.org/dbartholomae/middy-middleware-class-validator.svg?theme=shields.io)](https://david-dm.org/dbartholomae/middy-middleware-class-validator)  [![devDependency status](https://david-dm.org/dbartholomae/middy-middleware-class-validator/dev-status.svg)](https://david-dm.org/dbartholomae/middy-middleware-class-validator?type=dev)  [![Greenkeeper](https://badges.greenkeeper.io/dbartholomae/middy-middleware-class-validator.svg)](https://greenkeeper.io/)  [![semantic release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release#badge)  [![Gitter](https://badges.gitter.im/dbartholomae/middy-middleware-class-validator.svg)](https://gitter.im/middy-middleware-class-validator)

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
import middy from 'middy'
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler'
import createHttpError from 'http-errors'
import { APIGatewayEvent } from 'aws-lambda'

// This is your AWS handler
async function helloWorld (event: APIGatewayEvent) {
  if (event.queryStringParameters?.search == null) {
    // If you throw an error with status code, the error will be returned as stringified JSON.
    // Only the stack will be omitted.
    throw createHttpError(400, 'Query has to include a search')
  }

  // If you throw an error with no status code, only a generic message will be shown to the user
  // instead of the full error
  throw new Error('Search is not implemented yet')
}

// Let's "middyfy" our handler, then we will be able to attach middlewares to it
export const handler = middy(helloWorld)
  .use(JSONErrorHandlerMiddleware()) // This middleware is needed do handle the errors thrown by the JWTAuthMiddleware
```
