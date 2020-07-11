import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
    latitude: number,
    longitude: number,
    isMapReady: boolean,
    onLayout: () => void
};

const MapScreen: FC<Props> = ({ longitude, latitude, isMapReady, onLayout }) => {
    return (
        <View style={ styles.container } >
            <MapView
                provider={ PROVIDER_GOOGLE }
                style={ styles.map }
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
                onLayout={ onLayout }
            >
                { isMapReady && (
                    <Marker
                        coordinate={{ latitude, longitude }} >
                        <Icon color="red" name="map-pin" size={32}  />
                        <Callout>
                            <Text>Your location</Text>
                        </Callout>
                    </Marker >
                ) }
            </MapView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
});
export default MapScreen;
