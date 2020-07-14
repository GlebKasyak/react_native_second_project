import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ScrollView, ViewStyle, StyleSheet, View } from "react-native"

import { AppStateType } from "../../store/reducers";
import { AppSelectors } from "../../store/selectors";

type Props = {
    style?: ViewStyle,
    typeOfContainer?: "view" | "scrollView"
};

const Container: FC<Props> = ({ style, typeOfContainer, children }) => {
    const { theme } = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

    if(!typeOfContainer || typeOfContainer === "scrollView") {
        return (
            <ScrollView
                contentContainerStyle={{ ...styles.container, ...style }}
                style={{ backgroundColor: theme.SCREEN }}
            >
                { children }
            </ScrollView>
        )
    } else {
       return (
           <View style={{ ...styles.container, backgroundColor: theme.SCREEN, ...style }}>
               { children }
           </View>
       )
    }

};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    }
});

export default Container;
