import { Router } from '@/presentation/components'
import React from 'react'
import ReactDOM from 'react-dom'

import '@/presentation/styles/globals.scss'

import { loginFactory, signupFactory } from '@/main/factories/pages'

ReactDOM.render(
    <Router
        loginFactory={loginFactory}
        signupFactory={signupFactory}
    />,
    document.getElementById('main')
)
