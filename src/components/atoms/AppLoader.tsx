import React, { FC } from "react";
import { inject, observer } from "mobx-react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Classes } from "../../assets/styles";
import { ThemeType } from "../../assets/styles/Theme";
import { StoreType } from "../../store";

type OwnProps = {
    size?: number
};

type StateProps = {
    theme: ThemeType
};

type Props = OwnProps & StateProps;

const AppLoader: FC<Props> = ({ size = 70, theme }) => (
    <View style={ styles.center } >
        <ActivityIndicator size={ size } color={ theme.BACKGROUND } />
    </View>
);

const styles = StyleSheet.create({
    center: Classes.CENTER
});

export default inject<StoreType, {}, StateProps, {}>(({ rootStore }) => ({
    theme: rootStore.appStore.appTheme.theme
}))(observer(AppLoader) as unknown as FC<OwnProps>);
