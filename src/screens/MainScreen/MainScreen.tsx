import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, TextInput, View } from "react-native";

import { Container, AppLoader, AppTextBold, AppButton } from "../../components/atoms";
import { MarketList } from "../../components/moleculs";
import { NavigationStackProps } from "../../interfaces/common";
import { TextSize, Classes } from "../../assets/styles";

import markets from "../../shared/markets";
import { MarketType } from "../../interfaces/market";
import NavigationUrls from "../../navigation/navigationUrls";

import { AppStateType } from "../../store/reducers";
import { AppSelectors } from "../../store/selectors";

const MainScreen: NavigationStackProps<{}> = ({ navigation }) => {
    const limit = 5;
    const { theme } = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state));

    const [marketsState, setMarketsState] = useState<Array<MarketType>>([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [searchValue, setSearchValue] = useState("");

    const fetchData = useCallback(async (currentPage: number) => {
        const matchFilter = new RegExp(searchValue, "i");
        const filteredData = markets.filter(({ title }) => !searchValue || matchFilter.test(title));

        if((filteredData.length / limit) > (currentPage - 1)) {
            setIsFetching(true);

            const data = await new Promise(resolve => {
                setTimeout(() => {
                    resolve(filteredData.slice((currentPage - 1) * limit, limit * currentPage))
                }, 1500);
            }) as Array<MarketType>;

            setMarketsState(prevMarkets => [...prevMarkets, ...data]);
            setIsFetching(false);
        }

        isLoading && setIsLoading(false);
    },  [limit, isLoading])

    useEffect(() => {
        let isCancelled = false;

        if(!isCancelled && ((marketsState.length / limit) !== page)) {
            fetchData(page);
        }

        return () => {
            isCancelled = true;
        }
    }, [fetchData, marketsState.length, page])

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

    return (
        <Container typeOfContainer="view" >
            { isLoading
                ? <AppLoader />
                : (
                    <>
                        <View style={ styles.searchWrapper } >
                            <TextInput
                                value={ searchValue }
                                onChangeText={ setSearchValue }
                                style={{...styles.input, borderColor: theme.BORDER, color: theme.TEXT_2 }}
                            />
                            <AppButton onPress={ handlePress } style={ styles.button } >
                                Filter
                            </AppButton>
                        </View>
                        { !isLoading && !marketsState.length
                            ? (
                                <View style={ styles.alertContainer } >
                                    <AppTextBold style={ styles.alert } >
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
                    </>
                )
            }
        </Container>
    )
};

const styles = StyleSheet.create({
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
    }
})

export default MainScreen;
