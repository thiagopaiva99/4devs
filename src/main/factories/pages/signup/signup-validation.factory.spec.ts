import { ValidationBuilder, ValidationComposite } from '@/validations/validators'
import { signupValidationsFactory } from './signup-validation.factory'

describe('SignupValidationFactory', () => {
  test('should make validation composite with correct validations', () => {
    const composite = signupValidationsFactory()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('name').required().min(2).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().min(5).sameAs('password').build()
    ]))
  })
})
