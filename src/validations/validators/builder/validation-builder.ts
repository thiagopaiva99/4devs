import { FieldValidation } from "@/validations/protocols";
import { MinLengthValidation, RequiredFieldValidation } from "@/validations/validators";

export class ValidationBuilder {
    private constructor(
        private readonly fieldName: string,
        private readonly validations: FieldValidation[]
    ) {}

    static field(fieldName: string): ValidationBuilder {
        return new ValidationBuilder(fieldName, []);
    }

    required(): ValidationBuilder {
        this.validations.push(new RequiredFieldValidation(this.fieldName))
        return this;
    }

    min(length: number): ValidationBuilder {
        this.validations.push(new MinLengthValidation(this.fieldName, length));
        return this;
    }

    build(): FieldValidation[] {
        return this.validations;
    }
}