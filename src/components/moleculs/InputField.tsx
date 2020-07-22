import React, { FC } from "react";
import { inject, observer } from "mobx-react";
import { TextInput, View, StyleSheet } from "react-native";

import { AppText, AppTextBold } from "../atoms";

import { TextSize, Colors } from "../../assets/styles";
import { getShortenedString } from "../../shared/helpers";
import { StoreType } from "../../store";
import { ThemeType } from "../../assets/styles/Theme";

type OwnProps = {
    label: string,
    fieldName: string,
    value: string,
    onChange: (text: string, fieldName?: any) => void,
    error?: string,
    onEndEditing?: (text: string, fieldName?: any) => void,
    secureTextEntry?: boolean
};

type StateProps = {
    theme: ThemeType
};

type Props = StateProps & OwnProps;

const InputField: FC<Props> = (
    {
        label,
        fieldName,
        value,
        onChange,
        error,
        onEndEditing,
        theme,
        ...props
    }) => (
    <View style={ styles.wrapper } >
        <AppText style={{ ...styles.label, color: theme.TEXT_2 }} >{ label }</AppText>
        <TextInput
            value={ value }
            onChangeText={ text => onChange(text, fieldName) }
            placeholder={ `Enter ${ label.toLocaleLowerCase() }` }
            placeholderTextColor={ theme.BACKGROUND }
            style={{
                ...styles.input,
                borderColor: theme.BACKGROUND,
                color: theme.BACKGROUND
            }}
            onEndEditing={ e => onEndEditing && onEndEditing(e.nativeEvent.text, fieldName) }
            { ...props }
        />
        { !!error && (
            <AppTextBold style={ styles.error } >
                { getShortenedString(error) }
            </AppTextBold>
        )}
    </View>
);

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 7
    },
    label: {
        fontSize: TextSize.MEDIUM_TEXT,
    },
    input: {
        borderWidth: 2,
        marginVertical: 4,
        paddingHorizontal: 10,
        fontSize: TextSize.MEDIUM_TEXT,
        borderRadius: 10
    },
    error: {
        color: Colors.RED,
        fontSize: TextSize.SMALL_TEXT,
    }
});

export default inject<StoreType, {}, StateProps, {}>(({ rootStore }) => ({
    theme: rootStore.appStore.appTheme.theme
}))(observer(InputField) as unknown as FC<OwnProps>);
