import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DBAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const encrypter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const dBAddAccount = new DBAddAccount(encrypter, accountMongoRepository)
  const signUpController = new SignUpController(
    dBAddAccount,
    makeSignUpValidation()
  )
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
