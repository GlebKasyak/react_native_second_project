export const initialFormData = {
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

export type LoginFields = "email" | "password";

export type LoginFormData = typeof initialFormData;
