import { RequiredFieldValidation, ValidationBuilder, MinLengthValidation } from "@/validations/validators";

describe('ValidationBuilder', () => {
    test('should return RequiredFieldValidation', () => {
        const validations = ValidationBuilder.field('any_field').required().build();
        expect(validations).toEqual([new RequiredFieldValidation('any_field')])
    })

    test('should return MinLengthValidation', () => {
        const validations = ValidationBuilder.field('any_field').min(5).build();
        expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
    })
})