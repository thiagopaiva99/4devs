import { FieldValidation } from "@/validations/protocols";
import { RequiredFieldError } from "@/validations/errors";

export class RequiredFieldValidation implements FieldValidation {
    constructor(readonly field: string) { }

    validate(fieldValue: string): Error {
        return new RequiredFieldError();
    }
}