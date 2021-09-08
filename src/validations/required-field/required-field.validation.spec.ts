import { RequiredFieldError } from "@/validations/errors";
import { RequiredFieldValidation } from "./required-field.validation";

import faker from 'faker';

describe('RequiredFieldValidation', () => {
    test('should return error if field is empty', () => {
        const validation = new RequiredFieldValidation('email');
        const error = validation.validate('');
        expect(error).toEqual(new RequiredFieldError())
    })

    test('should return falsy if field is not empty', () => {
        const validation = new RequiredFieldValidation('email');
        const error = validation.validate(faker.random.word());
        expect(error).toBeFalsy()
    })
})