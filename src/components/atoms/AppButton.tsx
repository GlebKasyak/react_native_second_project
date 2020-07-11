import React, { FC, ComponentType } from "react";
import { useSelector } from "react-redux";
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

import { AppStateType } from "../../store/reducers";
import { AppSelectors } from "../../store/selectors";

type Props = {
    onPress: () => void,
    style?: ViewStyle
};

type WrapperType = ComponentType<TouchableNativeFeedbackProps | TouchableOpacityProps>;

const AppButton: FC<Props> = ({ children, onPress, style }) => {
    const Wrapper: WrapperType = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
    const theme = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

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

export default AppButton;
