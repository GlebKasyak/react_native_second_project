import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

import { userActions } from "../store/actions/user.action";

type UseGeolocationType = () => [() => {}, string];

const useGeolocation: UseGeolocationType = () => {
    const dispatch = useDispatch();
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
                        dispatch(userActions.setUserGeolocation({
                            latitude: coords.latitude,
                            longitude: coords.longitude
                        }));
                    },
                    error => setErrorMessage(error.message),
                    { enableHighAccuracy: false, timeout: 50000 });
            } else {
                setErrorMessage("Permission Denied");
            }
        } catch (err) {
            setErrorMessage(err)
        }
    }, []);

    useEffect(() => {
        let isCanceled = false;

        if(!isCanceled) {
            getGeolocation();
        }

        return () => {
            isCanceled = true;
        }
    }, [getGeolocation]);

    return [getGeolocation, errorMessage];
};

export default useGeolocation;
