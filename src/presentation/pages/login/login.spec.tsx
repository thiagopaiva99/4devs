import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import { Login } from './login';

type LoginComponentFactoryTypes = {
    component: RenderResult;
}

const loginComponentFactory = (): LoginComponentFactoryTypes  => {
    const component = render(<Login />);

    return {
        component
    }
}

describe('Login Component', () => {
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
});