import React from 'react';

import faker from 'faker';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';

import { Login } from './login';
import { ValidationStub } from '@/presentation/test';

import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

class AuthenticationSpy implements Authentication {
    account = mockAccountModel();
    params: AuthenticationParams;

    auth(params: AuthenticationParams): Promise<AccountModel> {
        this.params = params;
        return Promise.resolve(this.account);    
    }
}

type LoginComponentFactoryTypes = {
    component: RenderResult;
    authenticationSpy: AuthenticationSpy;
}

type FactoryParams = {
    validationError: string;
}

const loginComponentFactory = (params?: FactoryParams): LoginComponentFactoryTypes  => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;

    const authenticationSpy = new AuthenticationSpy();

    const component = render(<Login validation={validationStub} authentication={authenticationSpy} />);

    return {
        component,
        authenticationSpy
    }
}

describe('Login Component', () => {
    afterEach(cleanup);

    test('should start with initial state', () => {
        const validationError = faker.random.words();
        const { component } = loginComponentFactory({ validationError });

        const errorWrapper = component.getByTestId('error-wrapper');
        expect(errorWrapper.childElementCount).toBe(0);

        const submitButton = component.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);

        const emailStatus = component.getByTestId('email-status');
        expect(emailStatus.title).toBe(validationError);
        expect(emailStatus.textContent).toBe('🔴');

        const passwordStatus = component.getByTestId('email-status');
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('should show email error if validation fails', () => {
        const validationError = faker.random.words();
        const { component } = loginComponentFactory({ validationError });
        const emailInput = component.getByTestId('email-field');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const emailStatus = component.getByTestId('email-status');
        expect(emailStatus.title).toBe(validationError);
        expect(emailStatus.textContent).toBe('🔴');
    });

    test('should show password error if validation fails', () => {
        const validationError = faker.random.words();
        const { component } = loginComponentFactory({ validationError });
        const passwordInput = component.getByTestId('password-field');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const passwordStatus = component.getByTestId('password-status');
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('should show valid email state if validation succeeds', () => {
        const { component } = loginComponentFactory();
        const emailInput = component.getByTestId('email-field');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const emailStatus = component.getByTestId('email-status');
        expect(emailStatus.title).toBe('Tudo certo!');
        expect(emailStatus.textContent).toBe('🟢');
    });

    test('should show valid password state if validation succeeds', () => {
        const { component } = loginComponentFactory();
        const passwordInput = component.getByTestId('password-field');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const passwordStatus = component.getByTestId('password-status');
        expect(passwordStatus.title).toBe('Tudo certo!');
        expect(passwordStatus.textContent).toBe('🟢');
    });

    test('should enable submit button if form is valid', () => {
        const { component } = loginComponentFactory();
        const emailInput = component.getByTestId('email-field');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const passwordInput = component.getByTestId('password-field');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const submitButton = component.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
    });

    test('should show spinner on submit', () => {
        const { component } = loginComponentFactory();
        const emailInput = component.getByTestId('email-field');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const passwordInput = component.getByTestId('password-field');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const submitButton = component.getByTestId('submit') as HTMLButtonElement;
        fireEvent.click(submitButton);
        const spinner = component.getByTestId('spinner');
        expect(spinner).toBeTruthy();
    });

    test('should call authentication with correct values', () => {
        const { component, authenticationSpy } = loginComponentFactory();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const emailInput = component.getByTestId('email-field');
        fireEvent.input(emailInput, { target: { value: email } });
        const passwordInput = component.getByTestId('password-field');
        fireEvent.input(passwordInput, { target: { value: password } });
        const submitButton = component.getByTestId('submit') as HTMLButtonElement;
        fireEvent.click(submitButton);
        expect(authenticationSpy.params).toEqual({
            email,
            password
        });
    });
});