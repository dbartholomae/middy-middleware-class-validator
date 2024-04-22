// When using decorators, don't forget to import this in the very first line of code
import "reflect-metadata";

import { APIGatewayProxyEvent } from "aws-lambda";
import { IsString } from "class-validator";
import middy from "@middy/core";
import JSONErrorHandlerMiddleware from "middy-middleware-json-error-handler";
import ClassValidatorMiddleware, { WithBody } from "../";

// Define a validator for the body via class-validator
class NameBody {
  @IsString()
  public firstName!: string;

  @IsString()
  public lastName!: string;
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
