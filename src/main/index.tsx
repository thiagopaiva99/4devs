import { Router } from '@/presentation/components'
import React from 'react'
import ReactDOM from 'react-dom'

import '@/presentation/styles/globals.scss'

import { loginFactory } from '@/main/factories/pages'

ReactDOM.render(<Router loginFactory={loginFactory} />, document.getElementById('main'))
