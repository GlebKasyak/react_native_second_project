import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { compose } from "recompose";
import AsyncStorage from "@react-native-community/async-storage";

import RegisterScreen from "./RegisterScreen";
import { Auth } from "../../hoc";

import { NavigationStackComponentProps, NavigationStackProps } from "../../interfaces/common";
import { User } from "../../interfaces/user";

import { initialFormData, initialConfirmPasswordData, RegisterData } from "./InitialFormData";
import { RegisterNames, getInputValidation, getConfirmInputValidation } from "./validation";
import NavigationUrls from "../../navigation/navigationUrls";

import { StoreType } from "../../store";

type Props = {
    register: (data: User) => Promise<void>
};

const RegisterScreenContainer: NavigationStackComponentProps<Props> = ({ navigation, register }) => {
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

    const handleSubmit = async () => {
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

            for(const key in formData) {
                data[formData[key as RegisterNames].name] = formData[key as RegisterNames].value
            };

            register(data);
            setFormData(initialFormData);
            setConfirmPassword(initialConfirmPasswordData);
            navigation.navigate(NavigationUrls.LOADER, { screen: NavigationUrls.APP  });
            await AsyncStorage.clear();
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

export default compose<Props & NavigationStackProps, {}>(
    inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
        register: rootStore.userStore.register
    })),
    Auth,
    observer
)(RegisterScreenContainer);

