export const initialFormData = {
    firstName: {
        name: "firstName" as const,
        value: "",
        error: ""
    },
    secondName: {
        name: "secondName" as const,
        value: "",
        error: ""
    },
    email: {
        name: "email" as const,
        value: "",
        error: ""
    },
    password: {
        name: "password" as const,
        value: "",
        error: ""
    }
};


export const initialConfirmPasswordData = {
    name: "confirmPassword" as const,
    value: "",
    error: ""
};

export type ConfirmPasswordType = typeof initialConfirmPasswordData;
export type RegisterData = typeof initialFormData;
