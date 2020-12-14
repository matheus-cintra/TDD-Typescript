import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DBAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dBAddAccount = new DBAddAccount(encrypter, accountMongoRepository)
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dBAddAccount
  )
  return new LogControllerDecorator(signUpController)
}
