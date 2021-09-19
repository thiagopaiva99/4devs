import React from 'react'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Link } from 'react-router-dom'

const Signup: React.FC = () => {
  return (
        <div className={Styles.signup}>
            <LoginHeader />

            <Context.Provider value={{ state: {} }}>
                <form className={Styles.form}>
                    <h2>Criar Conta</h2>
                    <Input type="text" name="name" placeholder="Digite seu nome" />
                    <Input type="email" name="email" placeholder="Digite seu email" />
                    <Input type="password" name="password" placeholder="Digite sua senha" />
                    <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
                    <button type="submit">Criar Conta</button>
                    <Link to="/login" className={Styles.link}>Voltar para Login</Link>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
  )
}

export { Signup }
