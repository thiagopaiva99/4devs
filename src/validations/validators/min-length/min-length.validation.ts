import { InvalidFieldError } from "@/validations/errors";
import { FieldValidation } from "@/validations/protocols";

export class MinLengthValidation implements FieldValidation {
    constructor(readonly field: string, private readonly minLength: number) {}

    validate(value: string): Error {
        return value.length >= this.minLength ? null : new InvalidFieldError();
    }
}