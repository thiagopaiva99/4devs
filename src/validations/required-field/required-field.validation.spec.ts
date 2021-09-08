import { RequiredFieldError } from "@/validations/errors";
import { RequiredFieldValidation } from "./required-field.validation";

describe('RequiredFieldValidation', () => {
    test('should return error if field is empty', () => {
        const validation = new RequiredFieldValidation('email');
        const error = validation.validate('');
        expect(error).toEqual(new RequiredFieldError())
    })
})