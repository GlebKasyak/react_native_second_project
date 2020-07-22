import React, { FC, ComponentType } from "react";
import { observer, inject } from "mobx-react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    TouchableNativeFeedbackProps,
    TouchableOpacityProps,
    ViewStyle
} from "react-native";

import AppTextBold from "./AppTextBold";

import { StoreType } from "../../store";
import { ThemeType } from "../../assets/styles/Theme";

type OwnProps = {
    onPress: () => void,
    style?: ViewStyle,
};

type StateProps = {
    theme: ThemeType
};

type Props = StateProps & OwnProps;

type WrapperType = ComponentType<TouchableNativeFeedbackProps | TouchableOpacityProps>;

const AppButton: FC<Props> = ({ children, onPress, style, theme  }) => {
    const Wrapper: WrapperType = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <Wrapper onPress={ onPress } activeOpacity={0.3} >
            <View style={{ ...styles.button, backgroundColor: theme.BACKGROUND, ...style }}>
                <AppTextBold>
                    { children }
                </AppTextBold>
            </View>
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
});

export default inject<StoreType, OwnProps, StateProps, {}>(({ rootStore }) => ({
    theme: rootStore.appStore.appTheme.theme
}))(observer(AppButton) as unknown as FC<OwnProps>);
