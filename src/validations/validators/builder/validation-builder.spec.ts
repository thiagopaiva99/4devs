import { RequiredFieldValidation, ValidationBuilder, MinLengthValidation, EmailValidation } from "@/validations/validators";

describe('ValidationBuilder', () => {
    test('should return RequiredFieldValidation', () => {
        const validations = ValidationBuilder.field('any_field').required().build();
        expect(validations).toEqual([new RequiredFieldValidation('any_field')])
    })

    test('should return MinLengthValidation', () => {
        const validations = ValidationBuilder.field('any_field').min(5).build();
        expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
    })

    test('should return EmailValidation', () => {
        const validations = ValidationBuilder.field('any_field').email().build();
        expect(validations).toEqual([new EmailValidation('any_field')])
    })

    test('should return more than one validation', () => {
        const validations = ValidationBuilder.field('any_field').email().required().min(3).build();
        expect(validations).toEqual([
            new EmailValidation('any_field'), 
            new RequiredFieldValidation('any_field'),
            new MinLengthValidation('any_field', 3)
        ])
    })
})