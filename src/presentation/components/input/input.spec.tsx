import React from 'react';
import { render } from '@testing-library/react';
import Input from './input';
import { database } from 'faker';
import Context from '@/presentation/contexts/form/form-context';

describe('Input Component', () => {
    test('should begin with readonly', () => {
        const fieldName = database.column();
        const { getByTestId } = render(
            <Context.Provider value={{ state: {} }}>
                <Input name={fieldName} />
            </Context.Provider>
        );
        const input = getByTestId(`${fieldName}-field`) as HTMLInputElement;
        expect(input.readOnly).toBe(true);

    })
})