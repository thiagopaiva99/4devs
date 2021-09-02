import React from 'react';
import 'jest-localstorage-mock';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import faker from 'faker';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import { Login } from './login';
import { AuthenticationSpy, ValidationStub } from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/errors';

type LoginComponentFactoryTypes = {
    component: RenderResult;
    authenticationSpy: AuthenticationSpy;
}

type FactoryParams = {
    validationError: string;
}

const history = createMemoryHistory();

const loginComponentFactory = (params?: FactoryParams): LoginComponentFactoryTypes  => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;

    const authenticationSpy = new AuthenticationSpy();

    const component = render(
        <Router history={history}>
            <Login validation={validationStub} authentication={authenticationSpy} />
        </Router>
    );

    return {
        component,
        authenticationSpy
    }
}

const populateEmailField = (component: RenderResult, email = faker.internet.email()): void => {
    const emailInput = component.getByTestId('email-field');
    fireEvent.input(emailInput, { target: { value: email } });
}

const populatePasswordField = (component: RenderResult, password = faker.internet.password()): void => {
    const passwordField = component.getByTestId('password-field');
    fireEvent.input(passwordField, { target: { value: password } });
}

const simulateStatusForField = (component: RenderResult, fieldName: string, validationError?: string): void => {
    const field = component.getByTestId(`${fieldName}-status`);
        expect(field.title).toBe(validationError || 'Tudo certo!');
        expect(field.textContent).toBe(validationError ? '🔴' : '🟢');
}

const validSubmitFactory = (component: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
    populateEmailField(component, email);
    populatePasswordField(component, password);
    const submitButton = component.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);
}

describe('Login Component', () => {
    afterEach(cleanup);
    beforeEach(localStorage.clear)

    test('should start with initial state', () => {
        const validationError = faker.random.words();
        const { component } = loginComponentFactory({ validationError });

        const errorWrapper = component.getByTestId('error-wrapper');
        expect(errorWrapper.childElementCount).toBe(0);

        const submitButton = component.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);

        simulateStatusForField(component, 'email', validationError);
        simulateStatusForField(component, 'password', validationError);
    });

    test('should show email error if validation fails', () => {
        const validationError = faker.random.words();
        const { component } = loginComponentFactory({ validationError });
        populateEmailField(component);
        simulateStatusForField(component, 'email', validationError);
    });

    test('should show password error if validation fails', () => {
        const validationError = faker.random.words();
        const { component } = loginComponentFactory({ validationError });
        populatePasswordField(component);
        simulateStatusForField(component, 'password', validationError);
    });

    test('should show valid email state if validation succeeds', () => {
        const { component } = loginComponentFactory();
        populateEmailField(component);
        simulateStatusForField(component, 'email');
    });

    test('should show valid password state if validation succeeds', () => {
        const { component } = loginComponentFactory();
        populatePasswordField(component);
        simulateStatusForField(component, 'email');
    });

    test('should enable submit button if form is valid', () => {
        const { component } = loginComponentFactory();
        populateEmailField(component)
        populatePasswordField(component)
        const submitButton = component.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
    });

    test('should show spinner on submit', () => {
        const { component } = loginComponentFactory();
        validSubmitFactory(component);
        const spinner = component.getByTestId('spinner');
        expect(spinner).toBeTruthy();
    });

    test('should call authentication with correct values', () => {
        const { component, authenticationSpy } = loginComponentFactory();

        const email = faker.internet.email();
        const password = faker.internet.password();

        validSubmitFactory(component, email, password);
        
        expect(authenticationSpy.params).toEqual({
            email,
            password
        });
    });

    test('should call authentication only once', () => {
        const { component, authenticationSpy } = loginComponentFactory();
        validSubmitFactory(component);
        validSubmitFactory(component);
        expect(authenticationSpy.callsCount).toBe(1);
    })

    test('should not call authentication if form is invalid', () => {
        const validationError = faker.random.words();
        const { component, authenticationSpy } = loginComponentFactory({ validationError });
        populateEmailField(component);
        fireEvent.submit(component.getByTestId('form'));
        expect(authenticationSpy.callsCount).toBe(0);
    })

    test('should present error if validation fails', async () => {
        const { component, authenticationSpy } = loginComponentFactory();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
        validSubmitFactory(component);
        const errorWrapper = component.getByTestId('error-wrapper');
        await waitFor(() => errorWrapper);
        const mainError = component.getByTestId('main-error')
        expect(mainError.textContent).toBe(error.message)
        expect(errorWrapper.childElementCount).toBe(1);
    })

    test('should add acesstoken to localstorage on sucess', async () => {
        const { component, authenticationSpy } = loginComponentFactory();
        validSubmitFactory(component);
        await waitFor(() => component.getByTestId('form'));
        expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    })

    test('should go to signup page', () => {
        const { component } = loginComponentFactory();
        const signup = component.getByTestId('signup');
        fireEvent.click(signup);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe('/signup');
    })
});