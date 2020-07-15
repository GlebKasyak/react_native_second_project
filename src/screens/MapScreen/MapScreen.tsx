import React, { FC } from "react";
import { View, StyleSheet, Text, Dimensions, Image, ImageBackground } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import hexToRgba from "hex-to-rgba";

import { AppText, AppTextBold } from "../../components/atoms";

import { MarketType } from "../../interfaces/market";
import { ThemeType } from "../../assets/styles/Theme";

type Props = {
    latitude: number,
    longitude: number,
    isMapReady: boolean,
    onLayout: () => void,
    circleRadius: number,
    onRadiusChange: (value: number) => void,
    markets: Array<MarketType>,
    theme: ThemeType
};

const MarkerIcons = {
    "food/non-food": "shopping-bag",
    "food": "shopping-basket",
    "sport": "futbol-o"
};

const MapScreen: FC<Props> = (
    {
        longitude,
        latitude,
        isMapReady,
        onLayout,
        circleRadius,
        onRadiusChange,
        markets,
        theme
    }) => {

    return (
        <View style={ styles.container } >
            <MapView
                provider={ PROVIDER_GOOGLE }
                style={ styles.map }
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 10,
                }}
                onLayout={ onLayout }
                showsCompass={true}
            >
                { isMapReady && (
                    <>
                        <Circle
                            key={ (longitude + latitude).toString() }
                            center={{ latitude, longitude }}
                            radius={ circleRadius }
                            strokeColor = { theme.BORDER }
                            fillColor = { hexToRgba(theme.BACKGROUND, 0.1) }
                        />
                        <Marker coordinate={{ latitude, longitude }} >
                            <Icon name="map-marker" size={32} color={ theme.BACKGROUND } />
                        </Marker >
                        { !!markets.length && (
                            markets.map(market => {
                                const { type, id, lat, lon, image, title } = market;

                                return (
                                    <Marker
                                        coordinate={{ latitude: lat, longitude: lon }}
                                        key={ id }
                                        tracksViewChanges={false}
                                    >
                                        <Icon color={ theme.BACKGROUND } name={ MarkerIcons[type] } size={18}/>
                                        <Callout tooltip={true} >
                                            <View style={{ ...styles.modal, backgroundColor: theme.BACKGROUND }} >
                                                <AppTextBold  >
                                                    {`${ title } ${ id }`}
                                                </AppTextBold>
                                                <AppText>Type: { type } </AppText>
                                            </View>
                                            <View style={ styles.triangleWrapper } >
                                                <View style={{ ...styles.triangle, borderTopColor: theme.BACKGROUND }} />
                                            </View>
                                        </Callout>
                                    </Marker>
                                )
                            })
                        ) }
                    </>
                )}
            </MapView>
            <Slider
                minimumValue={0}
                maximumValue={500000}
                value={ circleRadius }
                style={ styles.sliderButton }
                thumbTintColor={ theme.BACKGROUND }
                minimumTrackTintColor={ theme.BACKGROUND }
                onValueChange={ onRadiusChange }
            />
        </View>

    )
};

const customMapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#242f3e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#263c3f"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6b9a76"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#38414e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#212a37"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9ca5b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#746855"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#1f2835"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f3d19c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2f3948"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d59563"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#515c6d"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#17263c"
            }
        ]
    }
];

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        position: "relative",
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    modal: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        width: 180,
        height: 58,
    },
    triangleWrapper: {
        position: "relative",
        height: 16,
        backgroundColor: "transparent"
    },
    triangle: {
        position: "absolute",
        bottom: 1,
        left: "45%",
        width: 0,
        height: 10,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderTopWidth: 16,
        borderRightWidth: 8,
        borderBottomWidth: 0,
        borderLeftWidth: 8,
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
    },
    sliderButton: {
        position: "absolute",
        right: -Dimensions.get("window").height / 4 + 20,
        bottom: Dimensions.get("window").height / 4,
        transform: [{ rotateZ : '-90deg' }],
        width: Dimensions.get("window").height / 2,
    }
});
export default MapScreen;
