import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, TextInput, View, Switch } from "react-native";
import hexToRgba from "hex-to-rgba";

import { Container, AppLoader, AppTextBold, AppButton, AppText } from "../../components/atoms";
import { ErrorMessage, MarketList } from "../../components/moleculs";

import markets from "../../shared/markets";
import { useGeolocation } from "../../hooks";
import { MarketType } from "../../interfaces/market";
import { NavigationStackProps } from "../../interfaces/common";
import { TextSize, Classes } from "../../assets/styles";
import { sortMarketsByDistance } from "../../shared/helpers";
import NavigationUrls from "../../navigation/navigationUrls";

import { AppStateType } from "../../store/reducers";
import { UserSelectors } from "../../store/selectors";


const MainScreen: NavigationStackProps<{}> = ({ navigation, screenProps }) => {
    const limit = 5;
    const { latitude, longitude } = useSelector((state: AppStateType) => UserSelectors.getUserGeolocation(state));
    const [getGeolocation, errorMessage] = useGeolocation();

    const [marketsState, setMarketsState] = useState<Array<MarketType>>([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [isEnabled, setIsEnabled] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const fetchData = useCallback(async (currentPage: number) => {
        const matchFilter = new RegExp(searchValue, "i");
        const marketList = isEnabled
            ? sortMarketsByDistance(markets, { latitude, longitude })
            : markets;

        const filteredData = marketList.filter(({ title }) => !searchValue || matchFilter.test(title)) as Array<MarketType>;

        if((filteredData.length / limit) > (currentPage - 1)) {
            setIsFetching(true);

            const data = await new Promise(resolve => {
                setTimeout(() => {
                    resolve(filteredData.slice((currentPage - 1) * limit, limit * currentPage))
                }, 1500);
            }) as Array<MarketType>;

            setMarketsState(prevMarkets => [...prevMarkets, ...data]);
            setIsFetching(false);
        };

        isLoading && setIsLoading(false);
    },  [limit, isLoading, isEnabled])


    useEffect(() => {
        let isCancelled = false;

        if(!isCancelled && ((marketsState.length / limit) !== page)) {
            fetchData(page);
        };

        return () => {
            isCancelled = true;
        };
    }, [fetchData, marketsState.length, page]);

    const nextPageHandler = () => {
        if((marketsState.length / limit) === page && !isFetching) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const openMarketHandler = (market: MarketType) => {
        navigation.navigate(NavigationUrls.MARKET, { market });
    };

    const handlePress = () => {
        setIsLoading(true);
        setPage(1);
        setMarketsState([]);
    };

    const handleToggle = () => {
        setIsEnabled(prevValue => !prevValue)
        setIsLoading(true);
        setPage(1);
        setMarketsState([]);
    };

    let content;

    if(isLoading) {
        content = <AppLoader />
    } else if (!!errorMessage) {
        content = <ErrorMessage
            message={ errorMessage } onFetch={ getGeolocation }
        />
    } else {
        content = (
            <>
                <View style={ styles.controllers } >
                    <View style={ styles.searchWrapper } >
                        <TextInput
                            value={ searchValue }
                            onChangeText={ setSearchValue }
                            style={{
                                ...styles.input,
                                borderColor: screenProps.theme.BORDER,
                                color: screenProps.theme.TEXT_2
                            }}
                        />
                        <AppButton onPress={ handlePress } style={ styles.button } >
                            Filter
                        </AppButton>
                    </View>
                    <View style={ styles.toggleWrapper } >
                        <AppText style={{ color: screenProps.theme.TEXT_2 }} >Sorting by distance:</AppText>
                        <Switch
                            value={ isEnabled }
                            onValueChange={ handleToggle }
                            trackColor={{ false: screenProps.theme.DEFAULT, true: screenProps.theme.DEFAULT }}
                            thumbColor={ isEnabled ? screenProps.theme.ACTIVE : screenProps.theme.DEFAULT }
                            style={ styles.toggle }
                        />
                    </View>
                </View >
                <View style={ styles.content } >
                    { !isLoading && !marketsState.length
                        ? (
                            <View style={ styles.alertContainer } >
                                <AppTextBold style={{ ...styles.alert, color: screenProps.themeName.TEXT_2 }} >
                                    Market list is empty
                                </AppTextBold>
                            </View>)
                        : (
                            <MarketList
                                data={ marketsState }
                                isLoading={ isFetching }
                                nextPage={ nextPageHandler }
                                onOpen={ openMarketHandler }
                            />
                        )

                    }
                </View>
            </>
        )
    };

    return (
        <Container typeOfContainer="view" >{ content }</Container>
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
