import { IMiddlewareOptions, isMiddlewareOptions } from "./IMiddlewareOptions";

class Validator {}

describe("IMiddlewareOptions", () => {
  describe("interface", () => {
    it("accepts valid options", () => {
      const options: IMiddlewareOptions<Validator> = {
        classType: Validator,
      };
      expect(options).toBeDefined();
    });
  });

  describe("type guard", () => {
    it("accepts valid options", () => {
      const options = {
        classType: Validator,
      };
      expect(isMiddlewareOptions(options)).toBe(true);
    });

    it("accepts valid options", () => {
      const options = {
        bodyClassType: Validator,
      };
      expect(isMiddlewareOptions(options)).toBe(true);
    });

    it("accepts valid options", () => {
      const options = {
        queryClassType: Validator,
      };
      expect(isMiddlewareOptions(options)).toBe(true);
    });

    it("rejects invalid options", () => {
      const options = {};
      expect(isMiddlewareOptions(options)).toBe(false);
    });

    it("rejects invalid options", () => {
      const options = {
        bodyClassType: Validator,
        classType: Validator,
      };
      expect(isMiddlewareOptions(options)).toBe(false);
    });

    it("rejects invalid options", () => {
      const options = {
        bodyClassType: Validator,
        classType: Validator,
        queryClassType: Validator,
      };
      expect(isMiddlewareOptions(options)).toBe(false);
    });
  });
});
