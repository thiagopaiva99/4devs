import React from 'react';

import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { Login } from './login';
import { ValidationSpy } from '@/presentation/test';

type LoginComponentFactoryTypes = {
    component: RenderResult;
    validationSpy: ValidationSpy;
}

const loginComponentFactory = (): LoginComponentFactoryTypes  => {
    const validationSpy = new ValidationSpy()
    const component = render(<Login validation={validationSpy} />);

    return {
        component,
        validationSpy
    }
}

describe('Login Component', () => {
    afterEach(cleanup);

    test('should start with initial state', () => {
        const { component } = loginComponentFactory();

        const errorWrapper = component.getByTestId('error-wrapper');
        expect(errorWrapper.childElementCount).toBe(0);

        const submitButton = component.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);

        const emailStatus = component.getByTestId('email-status');
        expect(emailStatus.title).toBe('Campo obrigatório');
        expect(emailStatus.textContent).toBe('🔴');

        const passwordStatus = component.getByTestId('email-status');
        expect(passwordStatus.title).toBe('Campo obrigatório');
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('should call Validation with correct email', () => {
        const { component, validationSpy } = loginComponentFactory();

        const emailInput = component.getByTestId('email-field')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        expect(validationSpy.fieldName).toEqual('email');
        expect(validationSpy.fieldValue).toEqual('any_email');
    });

    test('should call Validation with correct password', () => {
        const { component, validationSpy } = loginComponentFactory();

        const passwordInput = component.getByTestId('password-field')
        fireEvent.input(passwordInput, { target: { value: 'any_password' } })
        expect(validationSpy.fieldName).toEqual('password');
        expect(validationSpy.fieldValue).toEqual('any_password');
    });
});