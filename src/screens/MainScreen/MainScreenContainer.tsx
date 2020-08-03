import React, { useEffect, useState, useCallback, FC } from "react";
import { observer, inject } from "mobx-react";

import { Container, AppLoader } from "../../components/atoms";
import MainScreen from "./MainScreen";

import { MarketType } from "../../interfaces/market";
import { GeolocationType } from "../../interfaces/user";
import { NavigationStackComponentProps } from "../../interfaces/common";
import NavigationUrls from "../../navigation/navigationUrls";
import { MarketAPI } from "../../apiServices";
import { StoreType } from "../../store";

type Props = {
    geolocation: GeolocationType,
};

const MainScreenContainer: NavigationStackComponentProps<Props> = ({ navigation, screenProps, geolocation }) => {
    const limit = 5;

    const [state, setState] = useState({
        markets: [] as Array<MarketType>,
        page: 1,
        isFetching: false,
        isLoading: true,
        isEnabled: false,
        value: "",
        searchValue: ""
    });

    const fetchData = useCallback(async (currentPage: number, limit: number, value?: string) => {
        try {
          if(geolocation.latitude) {
              const { data: { getMarkets } } = await MarketAPI.getMarkets({
                  page: currentPage,
                  limit,
                  value,
                  geolocation,
                  sortByDistance: state.isEnabled
              });

              setState(prevState => ({
                  ...prevState,
                  markets: [...prevState.markets, ...getMarkets],
                  isLoading: false,
                  isFetching: false
              }));
          }
        } catch (err) {
            console.log(err)
        }
    },  [geolocation, state.isEnabled])

    useEffect(() => {
        let isCancelled = false;

        if(!isCancelled) {
            fetchData(state.page, limit, state.searchValue);
        }

        return () => {
            isCancelled = true;
        };
    }, [fetchData, state.page, state.searchValue]);

    const nextPageHandler = () => {
        if((state.markets.length / limit) === state.page && !state.isFetching) {
            setState(prevState => ({
                ...prevState,
                isFetching: true, page: prevState.page + 1
            }));
        }
    };

    const openMarketHandler = (market: MarketType) => {
        navigation.navigate(NavigationUrls.MARKET, { market });
    };

    const handlePress = () => {
        setState({
            ...state,
            isLoading: true,
            page: 1,
            markets: [],
            searchValue: state.value
        });
    };

    const handleToggle = (isEnabled: boolean) => {
        setState({
            ...state,
            isEnabled,
            isLoading: true,
            page: 1,
            markets: []
        });
    };

    return (
        <Container typeOfContainer="view" >
            { state.isLoading
                ? <AppLoader/>
                : (
                    <MainScreen
                        searchValue={ state.value }
                        isEnabled={ state.isEnabled }
                        isLoading={ state.isLoading }
                        isFetching={ state.isFetching }
                        markets={ state.markets }
                        theme={ screenProps.theme }
                        onSearch={ (value: string) => setState({ ...state, value }) }
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
}))(observer(MainScreenContainer) as unknown as FC);
