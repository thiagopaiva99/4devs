import { AuthenticationParams } from '@/domain/usecases'
import { internet, datatype } from 'faker'
import { AccountModel } from '@/domain/models'

export const mockAuthentication = (): AuthenticationParams => ({
  email: internet.email(),
  password: internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: datatype.uuid()
})
