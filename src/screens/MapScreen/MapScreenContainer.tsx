import React, { useState } from "react";
import { useSelector } from "react-redux";

import MapScreen from "./MapScreen";
import { Container } from "../../components/atoms";

import { NavigationStackProps } from "../../interfaces/common";
import markets from "../../shared/markets";

import { UserSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";

const MapScreenContainer: NavigationStackProps<{}> = ({ screenProps }) => {
    const { latitude, longitude } = useSelector((state: AppStateType) => UserSelectors.getUserGeolocation(state));

    const [isMapReady, serIsMapReady] = useState(false);
    const [circleRadius, setCircleRadius] = useState(0);

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
                theme={ screenProps.theme }
            />
        </Container>
    )
};

export default MapScreenContainer;
