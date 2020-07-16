import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MapScreen from "./MapScreen";
import { Container } from "../../components/atoms";

import { NavigationStackProps } from "../../interfaces/common";
import { addDistanceToMarkets, getCurrentTime } from "../../shared/helpers";
import defaultMarkets from "../../shared/markets";
import { MarketType } from "../../interfaces/market";

import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";

const MapScreenContainer: NavigationStackProps<{}> = ({ screenProps }) => {
    const { latitude, longitude } = useSelector((state: AppStateType) => UserSelectors.getUserGeolocation(state));

    const [isMapReady, serIsMapReady] = useState(false);
    const [circleRadius, setCircleRadius] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const [markets, setMarkets] = useState<Array<MarketType>>([]);

    useEffect(() => {
        const data = addDistanceToMarkets(defaultMarkets, { latitude, longitude }) as Array<MarketType>;
        setMarkets(data)
    },[latitude, longitude, defaultMarkets]);

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
                latitude={ latitude }
                longitude={ longitude }
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

export default MapScreenContainer;
