import React from 'react'
import { Login } from '@/presentation/pages'
import { remoteAuthenticationFactory, localSaveAccessTokenFactory } from '@/main/factories/usecases'
import { loginValidationsFactory } from './login-validation.factory'

export const loginFactory: React.FC = () => {
  return (
        <Login
          authentication={remoteAuthenticationFactory()}
          validation={loginValidationsFactory()}
          saveAccessToken={localSaveAccessTokenFactory()}
        />
  )
}
