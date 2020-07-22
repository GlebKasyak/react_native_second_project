import React, { useState, useEffect, FC } from "react";
import { inject, observer } from "mobx-react";

import MapScreen from "./MapScreen";
import { Container } from "../../components/atoms";

import { NavigationStackComponentProps } from "../../interfaces/common";
import { addDistanceToMarkets, getCurrentTime } from "../../shared/helpers";
import defaultMarkets from "../../shared/markets";
import { MarketType } from "../../interfaces/market";

import { GeolocationType } from "../../interfaces/user";
import { StoreType } from "../../store";

type Props = {
    geolocation: GeolocationType
};

const MapScreenContainer: NavigationStackComponentProps<Props> = ({ screenProps, geolocation }) => {
    const [isMapReady, serIsMapReady] = useState(false);
    const [circleRadius, setCircleRadius] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const [markets, setMarkets] = useState<Array<MarketType>>([]);

    useEffect(() => {
        const data = addDistanceToMarkets(defaultMarkets, geolocation) as Array<MarketType>;
        setMarkets(data)
    },[addDistanceToMarkets, geolocation, defaultMarkets]);

    useEffect(() => {
        if(isEnabled) {
            setMarkets(markets.filter(market => {
                if(market.openingTime < getCurrentTime() && getCurrentTime() < market.closingTime) {
                    return market
                }
            }));
        }
    }, [isEnabled]);

    useEffect(() => {
        if(circleRadius) {
            const data = markets.map(market => {
                if(circleRadius >= market.distance) {
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
            setMarkets(data);
        }
    }, [circleRadius]);

    return (
        <Container style={{ flex: 1, padding: 0 }} >
            <MapScreen
                latitude={ geolocation.latitude }
                longitude={ geolocation.longitude }
                isMapReady={ isMapReady }
                onLayout={ () => serIsMapReady(true) }
                circleRadius={ circleRadius }
                onRadiusChange={ (value: number) => setCircleRadius(value) }
                markets={ markets }
                isEnabled={ isEnabled }
                onToggle={ () => setIsEnabled(prevValue => !prevValue) }
                theme={ screenProps.theme }
                themeName={ screenProps.themeName }
            />
        </Container>
    )
};

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    geolocation: rootStore.userStore.geolocation
}))(observer(MapScreenContainer) as unknown as FC<{}>);
