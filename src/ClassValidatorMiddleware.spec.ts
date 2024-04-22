import classValidatorMiddleware from "./ClassValidatorMiddleware";

import { Context } from "aws-lambda";
import { IsString } from "class-validator";

class NameBody {
  @IsString()
  public firstName!: string;

  @IsString()
  public lastName!: string;
}

describe("ClassValidatorMiddleware", () => {
  describe("before hook", () => {
    describe("with valid input", () => {
      const body = JSON.stringify({
        firstName: "John",
        lastName: "Doe",
      });

      it("sets the body to the transformed and validated value", async () => {
        const handler = {
          callback: jest.fn(),
          context: {} as Context,
          error: {} as Error,
          event: { body },
          internal: {},
          response: {},
        };
        await classValidatorMiddleware({
          classType: NameBody,
        }).before(handler);
        expect(handler.event.body).toEqual({
          firstName: "John",
          lastName: "Doe",
        });
      });
    });

    describe("with invalid input", () => {
      const body = JSON.stringify({
        firstName: "John",
      });

      it("throws an error with statusCode 400", async () => {
        const handler = {
          callback: jest.fn(),
          context: {} as Context,
          error: {} as Error,
          internal: {},
          event: { body },
          response: {},
        };
        await expect(
          classValidatorMiddleware({
            classType: NameBody,
          }).before(handler),
        ).rejects.toMatchObject({
          statusCode: 400,
        });
      });
    });
  });
});
