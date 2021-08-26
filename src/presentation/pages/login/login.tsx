import React, { useEffect, useState } from 'react';
import Styles from './login-styles.scss';
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';

type Props = {
    validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState] = useState({ 
        isLoading: false,
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        mainError: ''
    });

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('password', state.password)
        });
    }, [state.email, state.password]);

    return (
        <div className={Styles.login}>
            <LoginHeader />

            <Context.Provider value={{ state, setState }}>
                <form className={Styles.form}>
                    <h2>Login</h2>

                    <Input type="email" name="email" placeholder="Digite seu email" />

                    <Input type="password" name="password" placeholder="Digite sua senha" />

                    <button type="submit" data-testid="submit" disabled>Entrar</button>

                    <span className={Styles.link}>Criar conta</span>

                    <FormStatus />
                </form>
            </Context.Provider>


            <Footer />
        </div>
    )
}

export { Login }