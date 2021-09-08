import { InvalidFieldError } from "@/validations/errors";
import { MinLengthValidation } from "./min-length.validation";

import faker from 'faker';

const validationFactory = (minLength: number): MinLengthValidation => new MinLengthValidation(faker.database.column(), minLength);

describe('MinLengthValidation', () => {
    test('should return error if value is invalid', () => {
        const minLength = faker.datatype.number();
        const validator = validationFactory(minLength)
        const error = validator.validate(faker.random.alphaNumeric(minLength - 1));
        expect(error).toEqual(new InvalidFieldError());
    })

    test('should return falsy if value is valid', () => {
        const minLength = faker.datatype.number();
        const validator = validationFactory(minLength)
        const error = validator.validate(faker.random.alphaNumeric(minLength + 1));
        expect(error).toBeFalsy()
    })
})