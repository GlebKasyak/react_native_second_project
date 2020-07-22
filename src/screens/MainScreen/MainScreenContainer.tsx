import React, { useEffect, useState, useCallback, FC } from "react";
import { observer, inject } from "mobx-react";

import { Container, AppLoader } from "../../components/atoms";
import MainScreen from "./MainScreen";

import defaultMarkets from "../../shared/markets";
import { MarketType } from "../../interfaces/market";
import { GeolocationType } from "../../interfaces/user";
import { NavigationStackComponentProps } from "../../interfaces/common";
import { addDistanceToMarkets } from "../../shared/helpers";
import NavigationUrls from "../../navigation/navigationUrls";
import { StoreType } from "../../store";

type Props = {
    geolocation: GeolocationType
};

const MainScreenContainer: NavigationStackComponentProps<Props> = ({ navigation, screenProps, geolocation }) => {
    const limit = 5;

    const [marketsState, setMarketsState] = useState<Array<MarketType>>([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [isEnabled, setIsEnabled] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const fetchData = useCallback(async (currentPage: number) => {
        const matchFilter = new RegExp(searchValue, "i");
        const marketsWithDistance = addDistanceToMarkets(defaultMarkets, geolocation);

        const marketList = isEnabled
            ? marketsWithDistance.sort(((a, b) => a.distance - b.distance))
            : marketsWithDistance;

        const filteredData = searchValue
            ? marketList.filter(({ title }) => matchFilter.test(title))
            : marketList;

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
    },  [limit, isLoading, isEnabled, addDistanceToMarkets])

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

    return (
        <Container typeOfContainer="view" >
            { isLoading
                ? <AppLoader/>
                : (
                    <MainScreen
                        searchValue={ searchValue }
                        isEnabled={ isEnabled }
                        isLoading={ isLoading }
                        isFetching={ isFetching }
                        markets={ marketsState }
                        theme={ screenProps.theme }
                        onSearch={ (value: string) => setSearchValue(value) }
                        onPress={ handlePress }
                        onToggle={ handleToggle }
                        onNextPage={ nextPageHandler }
                        onOpenMarket={ openMarketHandler }
                    />
                )
            }
        </Container>
    )
};

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    geolocation: rootStore.userStore.geolocation
}))(observer(MainScreenContainer) as unknown as FC<{}>);
