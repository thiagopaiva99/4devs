import { ValidationComposite } from "./validation-composite";
import { FieldValidationSpy } from "@/validations/validators/test/mock-field-validation";

type ValidationFactoryTypes = {
    validation: ValidationComposite,
    fieldValidationsSpy: FieldValidationSpy[]
}

const validationFactory = (): ValidationFactoryTypes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy('any_field'), 
        new FieldValidationSpy('any_field')
    ]
    const validation = new ValidationComposite(fieldValidationsSpy);

    return { 
        validation, 
        fieldValidationsSpy
    }
}

describe('ValidationComposite', () => {
    test('should return error if any validation fails', () => {
        const { validation, fieldValidationsSpy } = validationFactory();    
        fieldValidationsSpy[0].error = new Error('first_error');
        fieldValidationsSpy[1].error = new Error('second_error');
        const error = validation.validate('any_field', 'any_value');
        expect(error).toBe('first_error')
    })

    test('should return falsy if none validation fails', () => {
        const { validation, fieldValidationsSpy } = validationFactory();    
        const error = validation.validate('any_field', 'any_value');
        expect(error).toBeFalsy()
    })
})