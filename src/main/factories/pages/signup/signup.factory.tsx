import React from 'react'
import { remoteAddAccountFactory } from '@/main/factories/usecases'
import { signupValidationsFactory } from './signup-validation.factory'
import { Signup } from '@/presentation/pages'

export const signupFactory: React.FC = () => {
  return (
        <Signup
          addAccount={remoteAddAccountFactory()}
          validation={signupValidationsFactory()}
        />
  )
}
