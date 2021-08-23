import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/presentation/components/spinner/spinner';
import Header from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <Header />

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

            <Footer />
        </div>
    )
}

export { Login }