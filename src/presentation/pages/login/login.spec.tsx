import React from 'react';

import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { Login } from './login';
import { Validation } from '@/presentation/protocols/validation';

type LoginComponentFactoryTypes = {
    component: RenderResult;
    validationSpy: ValidationSpy;
}

class ValidationSpy implements Validation {
    errorMessage: string;
    input: object;

    validate(input: object): string {
        this.input = input;
        return this.errorMessage;
    }

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

    test('should call Validation with correct value', () => {
        const { component, validationSpy } = loginComponentFactory();

        const emailInput = component.getByTestId('email-field')
        fireEvent.input(emailInput, { target: { value: 'any_email' } })
        expect(validationSpy.input).toEqual({
            email: 'any_email'
        })
    });
});