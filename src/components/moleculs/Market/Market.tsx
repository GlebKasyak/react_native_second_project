import React, { FC } from "react";
import { observer, inject } from "mobx-react";
import { View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

import { AppText, AppTextBold } from "../../atoms";

import { MarketType } from "../../../interfaces/market";
import { TextSize } from "../../../assets/styles";
import { getShortenedString } from "../../../shared/helpers";

import { StoreType } from "../../../store";
import { ThemeType } from "../../../assets/styles/Theme";

type OwnProps = {
    market: MarketType,
    onOpen: (post: MarketType) => void
};

type StateProps = {
    theme: ThemeType
};

type Props = StateProps & OwnProps;

const Market: FC<Props> =({ market, onOpen, theme }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={ onOpen.bind(null, market) } >
        <View style={{ ...styles.market, borderColor: theme.BORDER }} >
            <ImageBackground source={{ uri: market.image }} style={{ ...styles.image }} >
                <View style={{ ...styles.textWrapper, backgroundColor: theme.OVERFLOW }} >
                    <AppTextBold style={{ ...styles.title, color: theme.HEADERS }} >
                        { `${ market.title  } ${ market.id }` }
                    </AppTextBold>
                </View>
            </ImageBackground>
            <View style={ styles.marketDescription } >
                <AppText style={{ color: theme.TEXT_2 }} >
                    <AppText style={{ color: theme.TEXT_2 }} >Type: </AppText>
                    { getShortenedString(market.type) }
                </AppText>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    market: {
        marginBottom: 15,
        overflow: "hidden",
        borderWidth: 2,
    },
    title: {
        fontSize: TextSize.MEDIUM_TEXT
    },
    marketDescription: {
        paddingHorizontal: 7,
        paddingVertical: 4
    },
    image: {
        width: "100%",
        height: 150,
    },
    textWrapper: {
        paddingVertical: 5,
        alignItems: "center",
        width: "100%"
    },
});


export default inject<StoreType, {}, StateProps, {}>(({ rootStore }) => ({
    theme: rootStore.appStore.appTheme.theme
}))(observer(Market) as unknown as FC<OwnProps>);
