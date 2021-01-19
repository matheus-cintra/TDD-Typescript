import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication
} from './login-protocols'
import {
  badRequest,
  created,
  serverError,
  unauthorized
} from '../../helpers/validators/http/http-helper'
import { Validation } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor (authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      // const requiredFields = ['email', 'password']
      // for (const field of requiredFields) {
      //   if (!httpRequest.body[field]) {
      //     return badRequest(new MissingParamError(field))
      //   }
      // }

      // const isValid = this.emailValidator.isValid(httpRequest.body.email)

      // if (!isValid) {
      //   return badRequest(new InvalidParamError('email'))
      // }

      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }

      return created({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
