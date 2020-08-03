import React, { FC } from "react";
import { observer, inject } from "mobx-react";
import { ScrollView, ViewStyle, StyleSheet, View } from "react-native"

import { StoreType } from "../../store";
import { ThemeType } from "../../assets/styles/Theme";

type OwnProps = {
    style?: ViewStyle,
    typeOfContainer?: "view" | "scrollView"
};

type StateProps = {
    theme: ThemeType
};

type Props = StateProps & OwnProps;

const Container: FC<Props> = ({ style, typeOfContainer, theme, children }) => {
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
        flex: 1,
        position: "relative"
    }
});

export default inject<StoreType, {}, StateProps, {}>(({ rootStore }) => ({
    theme: rootStore.appStore.appTheme.theme
}))(observer(Container) as unknown as FC<OwnProps>);
