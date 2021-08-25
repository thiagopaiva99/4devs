import React from 'react';

import { render } from '@testing-library/react';
import { Login } from './login';

describe('Login Component', () => {
    test('should start with initial state', () => {
        const { getByTestId } = render(<Login />);

        const errorWrapper = getByTestId('error-wrapper');
        expect(errorWrapper.childElementCount).toBe(0);

        const submitButton = getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
    });
});