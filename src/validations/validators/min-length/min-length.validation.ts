import { FieldValidation } from "@/validations/protocols";

export class MinLengthValidation implements FieldValidation {
    constructor(readonly field: string, private readonly minLength: number) {}

    validate(value: string): Error {
        return new InvalidFieldError();
    }
}