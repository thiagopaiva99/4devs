import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/presentation/components/spinner/spinner';
import Header from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';
import Input from '@/presentation/components/input/input'

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <Header />

            <form className={Styles.form}>
                <h2>Login</h2>

                <Input type="email" name="email" placeholder="Digite seu email" />

                <Input type="password" name="password" placeholder="Digite sua senha" />

                <button type="submit">Entrar</button>

                <span className={Styles.link}>Criar conta</span>

                <section className={Styles.errorWrapper}>
                    <Spinner className={Styles.spinner} />
                    <span className={Styles.error}>Erro</span>
                </section>
            </form>

            <Footer />
        </div>
    )
}

export { Login }