import validatejs from "validate.js";
import registerFormValidate from "./registerFormValidate";

export type RegisterNames = "firstName" | "secondName" | "email" | "password";

type FieldType = {
    name: RegisterNames,
    value: string,
    error?: string
};

type ValidateInputType = {
    name: RegisterNames,
    value: string
};

const validateInput = ({ name, value }: ValidateInputType) => {
    const result = validatejs(
        { [name]: value },
        { [name]: registerFormValidate[name] }
    );

    return !!result ? result[name][0] : "";
};

type InputValidationType = (data: { inputField: FieldType, value: string }) => FieldType

export const getInputValidation: InputValidationType = ({ inputField, value }) => ({
    ...inputField,
    value,
    error: validateInput({ name: inputField.name, value })
});




type ValidateConfirmInputType = {
    fieldName: string,
    verifiedName: string,
    confirmValue: string,
    value: string,
};

export const validateConfirmInput = ({ fieldName, verifiedName, confirmValue, value }: ValidateConfirmInputType) => {
    const constraints = {
        [fieldName]: {
            equality: verifiedName
        }
    }

    const result = validatejs(
        { [verifiedName]: value, [fieldName]: confirmValue },
        constraints
    );

    return !!result ? result[fieldName][0] : "";
};

type DataFieldConfirmType = Omit<FieldType, "name"> & { name: any };

export const getConfirmInputValidation = (data: DataFieldConfirmType, verifiedName: string, value: string) => ({
    ...data,
    error: validateConfirmInput({ fieldName: data.name, verifiedName, confirmValue: data.value, value })
});

