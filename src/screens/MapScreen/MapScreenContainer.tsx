import React, { useState, useEffect, FC } from "react";
import { inject, observer } from "mobx-react";

import MapScreen from "./MapScreen";
import { Container } from "../../components/atoms";

import { NavigationStackComponentProps } from "../../interfaces/common";
import { getCurrentTime } from "../../shared/helpers";
import { MarketType } from "../../interfaces/market";

import { GeolocationType } from "../../interfaces/user";
import { MarketAPI } from "../../apiServices";
import { StoreType } from "../../store";

type Props = {
    geolocation: GeolocationType
};

const MapScreenContainer: NavigationStackComponentProps<Props> = ({ screenProps, geolocation }) => {
    const [state, setState] = useState({
        isMapReady: false,
        circleRadius: 0,
        isEnabled: false,
        markets: [] as Array<MarketType>
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data: { getAllMarkets } } = await MarketAPI.getAllMarkets(geolocation);
            setState(prevState => ({ ...prevState, markets: getAllMarkets }));
        };

        fetchData();
    },[geolocation]);

    useEffect(() => {
        if(state.isEnabled) {
            setState(prevState => ({
                ...prevState,
                markets: state.markets.filter(market => {
                    if(market.openingTime < getCurrentTime() && getCurrentTime() < market.closingTime) {
                        return market
                    }
                })
            }));
        }
    }, [state.isEnabled]);

    useEffect(() => {
        if(state.circleRadius) {
            const data = state.markets.map(market => {
                if(state.circleRadius >= market.distance) {
                    return {
                        ...market,
                        isVisible: true
                    }
                } else {
                   return {
                       ...market,
                       isVisible: false
                   }
                }
            });
            setState(prevState => ({ ...prevState, markets: data }))
        }
    }, [state.circleRadius]);

    const layoutHandler = () => {
        setState(prevState => ({ ...prevState, isMapReady: true }))
    };

    const toggleHandler = (isEnabled: boolean) => {
        setState(prevState => ({ ...prevState, isEnabled }));
    };

    const radiusChangeHandler = (value: number) => {
      setState(prevState => ({ ...prevState, circleRadius: value }))
    };

    return (
        <Container style={{ flex: 1, padding: 0 }} >
            <MapScreen
                latitude={ geolocation.latitude }
                longitude={ geolocation.longitude }
                isMapReady={ state.isMapReady }
                onLayout={ layoutHandler }
                circleRadius={ state.circleRadius }
                onRadiusChange={ radiusChangeHandler }
                markets={ state.markets }
                isEnabled={ state.isEnabled }
                onToggle={ toggleHandler }
                theme={ screenProps.theme }
                themeName={ screenProps.themeName }
            />
        </Container>
    )
};

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    geolocation: rootStore.userStore.geolocation
}))(observer(MapScreenContainer) as unknown as FC<{}>);
