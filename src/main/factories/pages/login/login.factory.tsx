import React from 'react'
import { Login } from '@/presentation/pages'
import { remoteAuthenticationFactory, localUpdateCurrentAccountFactory } from '@/main/factories/usecases'
import { loginValidationsFactory } from './login-validation.factory'

export const loginFactory: React.FC = () => {
  return (
        <Login
          authentication={remoteAuthenticationFactory()}
          validation={loginValidationsFactory()}
          updateCurrentAccount={localUpdateCurrentAccountFactory()}
        />
  )
}
