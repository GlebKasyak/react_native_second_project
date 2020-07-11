import React, { useEffect, useState, useCallback } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

import MapScreen from "./MapScreen";
import { ErrorMessage } from "../../components/moleculs";
import { AppLoader, Container } from "../../components/atoms";

const MapScreenContainer = () => {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    const [isLoading, setIsLoading] = useState(true);
    const [isMapReady, serIsMapReady] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getGeolocation = useCallback(  async () => {
        if(Platform.OS === "ios") {
            await Geolocation.requestAuthorization("whenInUse");
        };

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await Geolocation.getCurrentPosition(({ coords }) => {
                        setLocation({
                            latitude: coords.latitude,
                            longitude: coords.longitude
                        });
                    },
                    error => setErrorMessage(error.message),
                    { enableHighAccuracy: false, timeout: 50000 });
            } else {
                setErrorMessage("Permission Denied");
            }
        } catch (err) {
            setErrorMessage(err)
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        let isCanceled = false;
        getGeolocation();

        return () => {
            isCanceled = true;
        }
    }, [getGeolocation]);

    let component;

    if(isLoading) {
        component = <AppLoader />
    } else if(!!errorMessage) {
        component = <ErrorMessage message={ errorMessage } onFetch={ getGeolocation } />
    } else {
        component = <MapScreen
            latitude={ location.latitude }
            longitude={ location.longitude }
            isMapReady={ isMapReady }
            onLayout={ () => serIsMapReady(true) }
        />
    };

    return <Container style={{ flex: 1, padding: 0 }} >{ component }</Container>
};

export default MapScreenContainer;
