import React, { FC, Fragment } from "react";
import { View, StyleSheet, Dimensions, Switch } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import hexToRgba from "hex-to-rgba";

import { AppText, AppTextBold } from "../../components/atoms";

import { MarketType } from "../../interfaces/market";
import { darkMapStyle } from "../../shared/mapStyles";
import { ThemeType, THEME_NAMES, DEFAULT_THEME } from "../../assets/styles/Theme";
import { Colors } from "../../assets/styles";

type Props = {
    latitude: number,
    longitude: number,
    isMapReady: boolean,
    onLayout: () => void,
    circleRadius: number,
    onRadiusChange: (value: number) => void,
    markets: Array<MarketType>,
    isEnabled: boolean,
    onToggle: (isEnabled: boolean) => void,
    theme: ThemeType,
    themeName: THEME_NAMES
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
        isEnabled,
        onToggle,
        theme,
        themeName
    }) => {

    return (
        <View style={ styles.container } >
            <View style={{
                ...styles.toggleWrapper,
                backgroundColor: hexToRgba(theme.BACKGROUND, 0.4)
            }} >
                <AppTextBold >
                    All markets
                </AppTextBold>
                <Switch
                    value={ isEnabled }
                    onValueChange={ onToggle }
                    trackColor={{ false: theme.ACTIVE, true: theme.DEFAULT }}
                    thumbColor={ isEnabled ? theme.ACTIVE : theme.DEFAULT }
                />
                <AppTextBold >
                    Open markets
                </AppTextBold>
            </View>
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
                customMapStyle={ themeName !== DEFAULT_THEME ? darkMapStyle : [] }
            >
                { isMapReady && (
                    <>
                        <Circle
                            key={ (longitude + latitude).toString() }
                            center={{ latitude, longitude }}
                            radius={ circleRadius }
                            strokeColor={ theme.BORDER }
                            fillColor={ hexToRgba(theme.BACKGROUND, 0.1) }
                        />
                        <Marker coordinate={{ latitude, longitude }} >
                            <Icon name="map-marker" size={32} color={ theme.BACKGROUND } />
                        </Marker >
                        { !!markets.length && (
                            markets.map(market => {
                                const { type, id, lat, lon, title, isVisible } = market;

                                return (!circleRadius || isVisible) && (
                                    <Fragment key={ id } >
                                        <Polyline
                                            coordinates={[
                                                { latitude, longitude },
                                                { latitude: lat, longitude: lon }
                                            ]}
                                            strokeColor={ theme.BACKGROUND }
                                            strokeWidth={0.3}
                                        />
                                        <Marker
                                            coordinate={{ latitude: lat, longitude: lon }}
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
                                    </Fragment>
                                )
                            })
                        ) }
                    </>
                )}
            </MapView>
            <View style={ styles.sliderWrapper } >
                <Slider
                    minimumValue={0}
                    maximumValue={600000}
                    thumbTintColor={ theme.BACKGROUND }
                    minimumTrackTintColor={ theme.BACKGROUND }
                    maximumTrackTintColor={ themeName === DEFAULT_THEME ? Colors.TRANSPARENT_BLACK : Colors.WHITE }
                    onValueChange={ onRadiusChange }
                />
                <AppText style={{ color: theme.TEXT_3 }}>
                    All
                </AppText>
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        position: "relative",
    },
    map: StyleSheet.absoluteFillObject,
    toggleWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 0,
        left: 0,
        top: 0,
        paddingVertical: 5,
        zIndex: 1
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
    sliderWrapper: {
        position: "absolute",
        right: -Dimensions.get("window").height / 4 + 20,
        bottom: Dimensions.get("window").height / 4,
        transform: [{ rotateZ : '-90deg' }],
        width: Dimensions.get("window").height / 2,
    },
});
export default MapScreen;
