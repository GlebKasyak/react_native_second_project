import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import { Container, AppButton, AppText } from "../../components/atoms";
import { InputField } from "../../components/moleculs";

import { LoginFields, LoginFormData } from "./InitialFormData";
import { TextSize, Colors } from "../../assets/styles";
import { ThemeType } from "../../assets/styles/Theme";

type Props = {
    formData: LoginFormData,
    checked: boolean,
    checkBoxColor: Colors,
    onChange: (value: string, fieldName?: LoginFields) => void,
    onEndEditing: (value: string, fieldName?: LoginFields) => void,
    onToggle: (nexValue: boolean) => void
    onSubmit: () => void,
    screenProps: ThemeType
};

const LoginScreen: FC<Props> = (
    {
        formData,
        checked,
        checkBoxColor,
        onChange,
        onEndEditing,
        onToggle,
        onSubmit,
        screenProps
    }) => (
    <Container style={ styles.container } >
        <View style={ styles.wrapper } >
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
            <View style={ styles.rememberMe } >
                <CheckBox
                    value={ checked }
                    tintColors={{ true: checkBoxColor }}
                    onValueChange={ onToggle }
                />
                <AppText style={{ ...styles.text, color: screenProps.LABEL }} >
                    Remember me
                </AppText>
            </View>
            <View style={ styles.button } >
                <AppButton onPress={ onSubmit } >
                    Sing in
                </AppButton>
            </View>
        </View>
    </Container>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    wrapper: {
      width: "90%"
    },
    button: {
        paddingVertical: 30
    },
    rememberMe: {
        marginTop: 15,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
    },
    text: {
        fontSize: TextSize.MEDIUM_TEXT,
        marginLeft: 8
    },
});

export default LoginScreen
