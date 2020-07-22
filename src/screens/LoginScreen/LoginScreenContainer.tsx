import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { compose } from "recompose";
import AsyncStorage from "@react-native-community/async-storage";

import LoginScreen from "./LoginScreen";
import { Auth } from "../../hoc";
import { NavigationStackComponentProps, NavigationStackProps } from "../../interfaces/common";
import { User } from "../../interfaces/user";
import { initialFormData, LoginFormData, LoginFields } from "./InitialFormData";

import { getInputValidation } from "../RegisterScreen/validation";
import { RegisterData } from "../RegisterScreen/InitialFormData";
import { setLoginDataToAsyncStorage } from "./rememberMe";
import { StorageKeys } from "../../shared/constants";
import { setAuthInAsyncStorage } from "../../shared/helpers";
import { StoreType } from "../../store";

type Props = {
    isAuth: boolean,
    login: (data: User) => void
};

const LoginScreenContainer: NavigationStackComponentProps<Props> = ({ screenProps, login, isAuth }) => {
    const [formData, setFormData] = useState(initialFormData)
    const [checked, setChecked] = useState(false);

    const handleChange = (value: string, fieldName?: LoginFields) => {
        setFormData({
            ...formData,
            [fieldName!]: {
                ...formData[fieldName!],
                value
            }
        })
    };

    const endEditingHandler = (value: string, fieldName?: LoginFields) => {
        setFormData({
            ...formData,
            [fieldName!]: getInputValidation({
                inputField: formData[fieldName!],
                value
            })
        })
    };

    const handleSubmit = () => {
        let updatedInputs = {} as RegisterData;

        for(const key in formData) {
            updatedInputs[formData[key as LoginFields].name] = getInputValidation({
                inputField: formData[key as LoginFields],
                value: formData[key as LoginFields].value
            }) as any;
        };

        setFormData(updatedInputs);

        if(Object.values(updatedInputs).every(value => !value.error)) {
            const data = {
                email: formData.email.value,
                password: formData.password.value
            };

            setLoginDataToAsyncStorage(checked, data);
            login({
                ...data,
                firstName: "First name",
                secondName: "Second name"
            });
            !checked && setFormData(initialFormData);
        }
    };

    useEffect(() => {
        const setFormDataFromAsyncStorage = async () => {
            const data = await AsyncStorage.getItem(StorageKeys.REMEMBER_ME);

            if(data) {
                const newFormData = {} as LoginFormData;
                const dataFromStorage = JSON.parse(data);

                for(const key in dataFromStorage) {
                    newFormData[key as LoginFields] = {
                        ...formData[key as LoginFields],
                            value: dataFromStorage[key as LoginFields]
                    } as any;
                };

                setFormData(newFormData);
                setChecked(true);
            }
        };

        setFormDataFromAsyncStorage();
    }, []);

    useEffect(() => {
        isAuth && setAuthInAsyncStorage();
    }, [isAuth])

    return <LoginScreen
        formData={ formData }
        checked={ checked }
        checkBoxColor={ screenProps.theme.BACKGROUND }
        onChange={ handleChange }
        onEndEditing={ endEditingHandler }
        onToggle={ newValue => setChecked(newValue) }
        onSubmit={ handleSubmit }
        theme={ screenProps.theme }
    />
};

export default compose<Props & NavigationStackProps, {}>(
    inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
        isAuth: rootStore.userStore.isAuth,
        login: rootStore.userStore.login
    })),
    Auth,
    observer
)(LoginScreenContainer);
