import { EmailValidation } from './email.validation';
import { InvalidFieldError } from '@/validations/errors';

import faker from 'faker';

describe('EmailValidation', () => {
    test('should return error if email is invalid', () => {
        const validator = new EmailValidation('email');
        const error = validator.validate('');
        expect(error).toEqual(new InvalidFieldError());
    })
})