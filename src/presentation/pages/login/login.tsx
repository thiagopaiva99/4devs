import React from 'react';
import Styles from './login-styles.scss';
import { Logo } from '@/presentation/components/logo/logo';
import { Spinner } from '@/presentation/components/spinner/spinner';

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <header className={Styles.header}>
                <Logo />
                <h1>4Dev - Enquetes para Programadores</h1>
            </header>

            <form className={Styles.form}>
                <h2>Login</h2>

                <div className={Styles.inputWrapper}>
                    <input type="email" name="email" placeholder="Digite seu email" />
                    <span className={Styles.status}>🔴</span>
                </div>

                <div className={Styles.inputWrapper}>
                    <input type="password" name="password" placeholder="Digite sua senha" />
                    <span className={Styles.status}>🔴</span>
                </div>

                <button type="submit">Entrar</button>

                <span className={Styles.link}>Criar conta</span>

                <section className={Styles.errorWrapper}>
                    <Spinner className={Styles.spinner} />
                    <span className={Styles.error}>Erro</span>
                </section>
            </form>

            <footer className={Styles.footer} />
        </div>
    )
}

export { Login }