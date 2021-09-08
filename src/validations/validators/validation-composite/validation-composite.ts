import { Validation } from "@/presentation/protocols/validation";
import { FieldValidation } from "@/validations/protocols";

export class ValidationComposite implements Validation {
    constructor(private readonly validators: FieldValidation[]) {}

    validate(fieldName: string, fieldValue: string): string {
        const validators = this.validators.filter(({ field }) => field === fieldName);

        for (const validator of validators) {
            const error = validator.validate(fieldValue);
            if (error) {
                return error.message;
            }
        }
    }
}