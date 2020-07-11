import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

import { Container, AppButton } from "../../components/atoms";
import { InputField } from "../../components/moleculs";

import { RegisterData, ConfirmPasswordType } from "./InitialFormData";
import { RegisterNames } from "./validation";

type Props = {
    formData: RegisterData,
    confirmPassword: ConfirmPasswordType,
    onChange: (value: string, fieldName?: RegisterNames) => void,
    onEndEditing: (value: string, fieldName?: RegisterNames) => void,
    onEndEditingConfirmField: (value: string) => void,
    onChangeConfirmField: (value: string) => void,
    onSubmit: () => void
};

const RegisterScreen: FC<Props> = (
    {
        formData,
        confirmPassword,
        onChange,
        onEndEditing,
        onEndEditingConfirmField,
        onChangeConfirmField,
        onSubmit
    }) => (
    <Container style={ styles.container } >
        <View style={ styles.wrapper } >
            <InputField
                value={ formData.firstName.value }
                fieldName={ formData.firstName.name }
                label="First name"
                onChange={ onChange }
                error={ formData.firstName.error }
                onEndEditing={ onEndEditing }
            />
            <InputField
                value={ formData.secondName.value }
                fieldName={ formData.secondName.name }
                label="Second name"
                onChange={ onChange }
                error={ formData.secondName.error }
                onEndEditing={ onEndEditing }
            />
            <InputField
                value={ formData.email.value }
                fieldName={ formData.email.name }
                label="Email"
                onChange={ onChange }
                error={ formData.email.error }
                onEndEditing={ onEndEditing }
            />
            <InputField
                value={ formData.password.value }
                fieldName={ formData.password.name }
                label="Password"
                onChange={ onChange }
                error={ formData.password.error }
                onEndEditing={ onEndEditing }
                secureTextEntry={true}
            />
            <InputField
                value={ confirmPassword.value }
                fieldName={ confirmPassword.name }
                label="Confirm password"
                onChange={ onChangeConfirmField }
                error={ confirmPassword.error }
                onEndEditing={ onEndEditingConfirmField }
                secureTextEntry={true}
            />
            <View style={ styles.button } >
                <AppButton onPress={ onSubmit } >
                    Sign up
                </AppButton>
            </View>
        </View>
    </Container>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    wrapper: {
        width: "80%"
    },
    button: {
        paddingVertical: 30
    }
});

export default RegisterScreen
