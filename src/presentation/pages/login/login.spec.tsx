import React from 'react';

import { render } from '@testing-library/react';
import { Login } from './login';

describe('Login Component', () => {
    test('should not render spinner and error on start', () => {
        const { getByTestId } = render(<Login />);
        const errorWrapper = getByTestId('error-wrapper');
        expect(errorWrapper.childElementCount).toBe(0);
    });
});