import { EmailValidation } from './email.validation';
import { InvalidFieldError } from '@/validations/errors';

import faker from 'faker';

describe('EmailValidation', () => {
    test('should return error if email is invalid', () => {
        const validator = new EmailValidation(faker.database.column());
        const error = validator.validate(faker.random.word());
        expect(error).toEqual(new InvalidFieldError());
    })

    test('should return falsy if email is valid', () => {
        const validator = new EmailValidation(faker.database.column());
        const error = validator.validate(faker.internet.email());
        expect(error).toBeFalsy();
    })
})