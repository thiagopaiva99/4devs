import React from 'react'
import { Login } from '@/presentation/pages'
import { remoteAuthenticationFactory } from '@/main/factories/usecases/authentication/remote-authentication.factory'
import { loginValidationsFactory } from './login-validation.factory'

export const loginFactory: React.FC = () => {
  return (
        <Login authentication={remoteAuthenticationFactory()} validation={loginValidationsFactory()} />
  )
}
