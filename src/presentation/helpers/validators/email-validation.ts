import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols'
import { Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  private readonly email: string
  private readonly emailValidator: EmailValidator

  constructor (email: string, emailValidator: EmailValidator) {
    this.email = email
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.email])

    if (!isValid) {
      return new InvalidParamError(this.email)
    }

    return null
  }
}
