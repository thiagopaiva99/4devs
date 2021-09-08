import { InvalidFieldError } from "@/validations/errors";
import { FieldValidation } from "@/validations/protocols";

export class EmailValidation implements FieldValidation {
    constructor(readonly field: string) {}

    validate(value: string): Error {
        return new InvalidFieldError();
    }
}