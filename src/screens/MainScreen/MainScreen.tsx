import React, { FC } from "react";
import { StyleSheet, TextInput, View, Switch } from "react-native";

import { AppTextBold, AppButton, AppText } from "../../components/atoms";
import { MarketList } from "../../components/moleculs";

import { MarketType } from "../../interfaces/market";
import { TextSize, Classes } from "../../assets/styles";
import { ThemeType } from "../../assets/styles/Theme";


type Props = {
    searchValue: string,
    isEnabled: boolean,
    isLoading: boolean,
    isFetching: boolean,
    markets: Array<MarketType>,
    theme: ThemeType,
    onSearch: (value: string) => void,
    onPress: () => void,
    onToggle: (data: boolean) => void,
    onNextPage: () => void,
    onOpenMarket: (market: MarketType) => void
};

const MainScreen: FC<Props> = (
    {
        searchValue,
        isEnabled,
        isLoading,
        isFetching,
        markets,
        theme,
        onSearch,
        onPress,
        onToggle,
        onNextPage,
        onOpenMarket,
    }) => {

    const { TEXT_2, DEFAULT, ACTIVE } = theme;

    return (
        <>
            <View style={ styles.controllers } >
                <View style={ styles.searchWrapper } >
                    <TextInput
                        value={ searchValue }
                        onChangeText={ onSearch }
                        style={{ ...styles.input, borderColor: theme.BORDER, color: TEXT_2 }}
                    />
                    <AppButton onPress={ onPress } style={ styles.button } >
                        Filter
                    </AppButton>
                </View>
                <View style={ styles.toggleWrapper } >
                    <AppText style={{ color: TEXT_2 }} >Sorting by distance:</AppText>
                    <Switch
                        value={ isEnabled }
                        onValueChange={ onToggle }
                        trackColor={{ false: DEFAULT, true: DEFAULT }}
                        thumbColor={ isEnabled ? ACTIVE : DEFAULT }
                        style={ styles.toggle }
                    />
                </View>
            </View >
            <View style={ styles.content } >
                { !isLoading && !markets.length
                    ? (
                        <View style={ styles.alertContainer } >
                            <AppTextBold style={{ ...styles.alert, color: TEXT_2 }} >
                                Market list is empty
                            </AppTextBold>
                        </View>)
                    : (
                        <MarketList
                            data={ markets }
                            isLoading={ isFetching }
                            nextPage={ onNextPage }
                            onOpen={ onOpenMarket }
                        />
                    )

                }
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    content: {
        marginTop: 85,
        flex: 1
    },
    controllers: {
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    alertContainer: Classes.CENTER,
    alert: {
        fontSize: TextSize.EXTRA_LARGE_TEXT
    },
    searchWrapper: {
        flexDirection: "row",
    },
    input: {
        flex: 1,
        borderBottomWidth: 2,
        fontSize: TextSize.MEDIUM_TEXT
    },
    button: {
        paddingHorizontal: 9
    },
    toggleWrapper: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    toggle: {
        transform: [{ scale: 1.25 }],
    }
})

export default MainScreen;
