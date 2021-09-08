import { ValidationComposite } from "./validation-composite";
import { FieldValidationSpy } from "@/validations/validators/test/mock-field-validation";

describe('ValidationComposite', () => {
    test('should return error if any validation fails', () => {
        const fieldValidationSpy = new FieldValidationSpy('any_field');
        const fieldValidationSpy2 = new FieldValidationSpy('any_field');
        fieldValidationSpy2.error = new Error('any_error_message');
        const validation = new ValidationComposite([ fieldValidationSpy, fieldValidationSpy2 ]);
        const error = validation.validate('any_field', 'any_value');
        expect(error).toBe('any_error_message')
    })
})