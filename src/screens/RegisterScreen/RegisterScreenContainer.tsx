import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import RegisterScreen from "./RegisterScreen";
import { Auth } from "../../hoc";

import { NavigationStackProps } from "../../interfaces/common";
import { User } from "../../interfaces/user";
import { setAuthInAsyncStorage } from "../../shared/helpers";

import { initialFormData, initialConfirmPasswordData, RegisterData } from "./InitialFormData";
import { RegisterNames, getInputValidation, getConfirmInputValidation } from "./validation";

import { userActions } from "../../store/actions/user.action";
import { AppStateType } from "../../store/reducers";

type MapDispatchToProps = {
    signUpUser: (data: User) => void
};

const RegisterScreenContainer: NavigationStackProps<MapDispatchToProps> = ({ signUpUser }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [confirmPassword, setConfirmPassword] = useState(initialConfirmPasswordData);

    const handleChange = (value: string, fieldName?: RegisterNames) => {
        setFormData({
            ...formData,
            [fieldName!]: {
                ...formData[fieldName!],
                value
            }
        })
    };

    const endEditingHandler = (value: string, fieldName?: RegisterNames) => {
        setFormData({
            ...formData,
            [fieldName!]: getInputValidation({
                inputField: formData[fieldName!],
                value
            })
        })
    };

    const endEditingConfirmFieldHandler = (value: string) => {
        setConfirmPassword(getConfirmInputValidation(
            { ...confirmPassword, value },
            "password",
            formData.password.value
        ));
    }

    const handleSubmit = () => {
        let updatedInputs = {} as RegisterData;

        for(const key in formData) {
            updatedInputs[formData[key as RegisterNames].name] = getInputValidation({
                inputField: formData[key as RegisterNames],
                value: formData[key as RegisterNames].value
            }) as any;
        };

        setFormData(updatedInputs);
        setConfirmPassword(getConfirmInputValidation(
            confirmPassword,
            "password",
            updatedInputs.password.value
        ));

        if(Object.values(updatedInputs).every(value => !value.error) && !confirmPassword.error) {
            let data = {} as User;

            for(const key in data) {
                data[formData[key as RegisterNames].name] = formData[key as RegisterNames].value
            };

            signUpUser(data);
            setFormData(initialFormData);
            setAuthInAsyncStorage();
        }
    };

    return <RegisterScreen
        formData={ formData }
        confirmPassword={ confirmPassword }
        onChange={ handleChange }
        onEndEditing={ endEditingHandler }
        onEndEditingConfirmField={ endEditingConfirmFieldHandler }
        onChangeConfirmField={ (value: string) => setConfirmPassword({ ...confirmPassword, value }) }
        onSubmit={ handleSubmit }
    />
};

export default compose(
    connect<{}, MapDispatchToProps, {}, AppStateType>(
    null,
    { signUpUser: userActions.signUpUser }),
    Auth
)(RegisterScreenContainer) as NavigationStackProps<{}>
