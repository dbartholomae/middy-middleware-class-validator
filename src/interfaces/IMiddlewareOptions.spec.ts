import { IMiddlewareOptions, isMiddlewareOptions } from './IMiddlewareOptions'

describe('IMiddlewareOptions', () => {
  describe('interface', () => {
    it('accepts valid options', () => {
      class Validator {}
      const options: IMiddlewareOptions<Validator> = {
        classType: Validator
      }
      expect(options).toBeDefined()
    })
  })

  describe('type guard', () => {
    it('accepts valid options',() => {
      class Validator {}
      const options = {
        classType: Validator
      }
      expect(isMiddlewareOptions(options)).toBe(true)
    })

    it('rejects invalid options',() => {
      const options = {}
      expect(isMiddlewareOptions(options)).toBe(false)
    })
  })
})
