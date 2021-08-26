import React from 'react';

import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { Login } from './login';
import { ValidationStub } from '@/presentation/test';

import faker from 'faker';

type LoginComponentFactoryTypes = {
    component: RenderResult;
    validationStub: ValidationStub;
}

const loginComponentFactory = (): LoginComponentFactoryTypes  => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = faker.random.words();

    const component = render(<Login validation={validationStub} />);

    return {
        component,
        validationStub
    }
}

describe('Login Component', () => {
    afterEach(cleanup);

    test('should start with initial state', () => {
        const { component, validationStub } = loginComponentFactory();

        const errorWrapper = component.getByTestId('error-wrapper');
        expect(errorWrapper.childElementCount).toBe(0);

        const submitButton = component.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);

        const emailStatus = component.getByTestId('email-status');
        expect(emailStatus.title).toBe(validationStub.errorMessage);
        expect(emailStatus.textContent).toBe('🔴');

        const passwordStatus = component.getByTestId('email-status');
        expect(passwordStatus.title).toBe(validationStub.errorMessage);
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('should show email error if validation fails', () => {
        const { component, validationStub } = loginComponentFactory();
             
        const emailInput = component.getByTestId('email-field');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const emailStatus = component.getByTestId('email-status');
        expect(emailStatus.title).toBe(validationStub.errorMessage);
        expect(emailStatus.textContent).toBe('🔴');
    });

    test('should show password error if validation fails', () => {
        const { component, validationStub } = loginComponentFactory();
             
        const passwordInput = component.getByTestId('password-field');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const passwordStatus = component.getByTestId('password-status');
        expect(passwordStatus.title).toBe(validationStub.errorMessage);
        expect(passwordStatus.textContent).toBe('🔴');
    });
});