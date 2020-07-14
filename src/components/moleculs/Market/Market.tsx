import React, { FC, memo } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

import { AppText, AppTextBold } from "../../atoms";

import { MarketType } from "../../../interfaces/market";
import { TextSize } from "../../../assets/styles";
import { getShortenedString } from "../../../shared/helpers";

import { AppStateType } from "../../../store/reducers";
import { AppSelectors } from "../../../store/selectors";

type Props = {
    market: MarketType,
    onOpen: (post: MarketType) => void
};

const Market: FC<Props> = memo(({ market, onOpen }) => {
    const { theme } = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

    return (
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
    )
});

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

export default Market;
