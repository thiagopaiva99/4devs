import { AddAccountParams } from '@/domain/usecases'
import { internet, name } from 'faker'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = internet.password()

  return {
    name: name.findName(),
    email: internet.email(),
    password,
    passwordConfirmation: password
  }
}
