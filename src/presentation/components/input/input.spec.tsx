import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './input';
import { database } from 'faker';
import Context from '@/presentation/contexts/form/form-context';

const inputFieldFactory = () => {
    const fieldName = database.column();
    const component = render(
        <Context.Provider value={{ state: {} }}>
            <Input name={fieldName} />
        </Context.Provider>
    );

    return {
        fieldName,
        component
    }
}

describe('Input Component', () => {
    test('should begin with readonly', () => {
        const { fieldName, component } = inputFieldFactory();
        const input = component.getByTestId(`${fieldName}-field`) as HTMLInputElement;
        expect(input.readOnly).toBe(true);
    })

    test('should remove readonly on focus', () => {
        const { fieldName, component } = inputFieldFactory();
        const input = component.getByTestId(`${fieldName}-field`) as HTMLInputElement;
        fireEvent.focus(input)
        expect(input.readOnly).toBe(false);
    })
})