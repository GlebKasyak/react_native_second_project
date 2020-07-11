import React, { FC } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { AppTextBold, AppText, AppButton } from "../atoms";

import { TextSize, Colors } from "../../assets/styles";
import { AppStateType } from "../../store/reducers";
import { AppSelectors } from "../../store/selectors";

type Props = {
    title?: string,
    message: string,
    positiveButtonText?: string,
    onPositiveButtonPress?: () => void,
    negativeButtonText?: string,
    onNegativeButtonPress?: () => void
};

const CustomAlert: FC<Props> = (
    {
        title,
        message,
        positiveButtonText,
        onPositiveButtonPress,
        negativeButtonText,
        onNegativeButtonPress
    }) => {
    const theme = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

    return (
        <View
            style={{ ...styles.overflowWrapper, backgroundColor: theme.OVERFLOW }}
        >
            <View style={{
                ...styles.mainContainer,
                borderColor: theme.LINE,
                backgroundColor: theme.BACKGROUND
            }}>
                <View style={ styles.topPart } >
                    <Icon name="notifications" size={30} color={ theme.TEXT } />
                    <AppTextBold style={ styles.alertTitle } >
                        { title }
                    </AppTextBold>
                </View>
                <ScrollView style={ styles.middlePart } >
                    <AppText style={ styles.alertMessageTestStyle } >
                        { message }
                    </AppText>
                </ScrollView>
                <View style={ styles.bottomPart } >
                    { !!negativeButtonText && !!onNegativeButtonPress &&
                        <AppButton
                            onPress={ onNegativeButtonPress }
                            style={{ ...styles.alertMessageButtonStyle, backgroundColor: Colors.RED }}
                        >
                            { negativeButtonText }
                        </AppButton>
                    }
                    { !!positiveButtonText && !!onPositiveButtonPress &&
                        <AppButton
                            onPress={ onPositiveButtonPress }
                            style={{ ...styles.alertMessageButtonStyle, backgroundColor: theme.BACKGROUND_2 }}
                        >
                            { positiveButtonText }
                        </AppButton>
                    }
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    overflowWrapper: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    mainContainer: {
        zIndex: 2,
        flexDirection: "column",
        height: "35%",
        width: "80%",
        borderWidth: 2,
        borderRadius: 14,
        padding: 4
    },
    alertTitle: {
        marginLeft: 10,
        fontSize: TextSize.LARGE_TEXT
    },
    alertMessageTestStyle: {
        textAlign: "justify",
        fontSize: TextSize.MEDIUM_TEXT,
        padding: 2
    },
    topPart: {
        flex: 0.5,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 2,
        paddingVertical: 8
    },
    middlePart: {
        flex: 1,
        width: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 4,
        marginVertical: 2
    },
    bottomPart: {
        flex: 0.5,
        width: "100%",
        flexDirection: "row",
        padding: 4,
        justifyContent: "space-evenly",
        marginBottom: 8
    },
    alertMessageButtonStyle: {
        marginHorizontal: 3,
    },
});

export default CustomAlert;
