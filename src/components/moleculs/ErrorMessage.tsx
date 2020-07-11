import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import { AppText, AppTextBold, AppButton } from "../atoms";
import { Colors, Classes, TextSize } from "../../assets/styles";

type Props = {
    message: string,
    onFetch?: () => void
};

const ErrorMessage: FC<Props> = ({ message, onFetch }) => (
    <View style={ styles.center } >
        <AppTextBold style={ styles.title } >Error</AppTextBold>
        <AppText style={ styles.message } >{ message }</AppText>
        { onFetch && (
            <AppButton onPress={ onFetch } >
                Reload screen
            </AppButton>
        ) }
    </View>
);

const styles = StyleSheet.create({
    center: Classes.CENTER,
    title: {
        fontSize: TextSize.EXTRA_LARGE_TEXT,
        color: Colors.RED,
    },
    message: {
        color: Colors.RED,
        fontSize: TextSize.LARGE_TEXT,
        textAlign: "center",
        paddingBottom: 10
    }
});

export default ErrorMessage;
