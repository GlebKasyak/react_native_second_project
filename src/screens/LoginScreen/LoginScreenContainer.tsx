import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import AsyncStorage from "@react-native-community/async-storage";

import LoginScreen from "./LoginScreen";
import { Auth } from "../../hoc";
import { NavigationStackProps } from "../../interfaces/common";
import { User } from "../../interfaces/user";
import { initialFormData, LoginFormData, LoginFields } from "./InitialFormData";

import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";
import { userActions } from "../../store/actions/user.action";

import { getInputValidation } from "../RegisterScreen/validation";
import { RegisterData } from "../RegisterScreen/InitialFormData";
import { setLoginDataToAsyncStorage } from "./rememberMe";
import { StorageKeys } from "../../shared/constants";
import { setAuthInAsyncStorage } from "../../shared/helpers";

type MapStateToProps = {
    isAuth: boolean
};

type MapDispatchToProps = {
    signInUser: (data: User) => void
};

type Props = MapStateToProps & MapDispatchToProps;

const LoginScreenContainer: NavigationStackProps<Props> = ({ screenProps, signInUser, isAuth }) => {
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
            signInUser({
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

export default compose(
    connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
        state => ({ isAuth: UserSelectors.getIsAuth(state) }),
        { signInUser: userActions.signInUser }
    ),
    Auth
)(LoginScreenContainer) as NavigationStackProps<{}>;
