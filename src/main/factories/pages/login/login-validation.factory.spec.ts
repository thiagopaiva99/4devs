import { ValidationBuilder, ValidationComposite } from "@/validations/validators";
import { loginValidationsFactory } from "./login-validation.factory"

describe('LoginValidationFactory', () => {
    test('should make validation composite with correct validations', () => {
        const composite = loginValidationsFactory();
        expect(composite).toEqual(ValidationComposite.build([
            ...ValidationBuilder.field('email').required().email().build(),
            ...ValidationBuilder.field('password').required().min(5).build()
        ]))
    })
})