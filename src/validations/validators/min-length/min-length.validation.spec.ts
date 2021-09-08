import { InvalidFieldError } from "@/validations/errors";
import { MinLengthValidation } from "./min-length.validation";

describe('MinLengthValidation', () => {
    test('should return error if value is invalid', () => {
        const validator = new MinLengthValidation('field', 5);
        const error = validator.validate('four');
        expect(error).toEqual(new InvalidFieldError());
    })
})