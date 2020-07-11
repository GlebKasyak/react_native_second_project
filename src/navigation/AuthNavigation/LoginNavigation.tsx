import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator, NavigationStackScreenProps } from "react-navigation-stack";
import Icon from "react-native-vector-icons/AntDesign";

import { AppText } from "../../components/atoms";
import { LoginScreen } from "../../screens";

import { TextSize, Classes } from "../../assets/styles";
import { DefaultNavigationOptionsType } from "../../interfaces/common";

export default createStackNavigator({
    Login: LoginScreen,
}, {
    navigationOptions: ({  navigation, screenProps }: DefaultNavigationOptionsType<NavigationStackScreenProps>) => ({
        headerRight: () => (
            <TouchableOpacity
                onPress={ () => navigation.navigate("Register") }
                activeOpacity={0.6}
                style={ styles.btnWrapper }
            >
                <AppText style={ styles.text } >Sign up</AppText>
                <Icon name="login" size={18} color={ screenProps.TEXT } style={ styles.icon } />
            </TouchableOpacity >
        )
    }),
    defaultNavigationOptions: {
        title: "Login",
    }
});

const styles = StyleSheet.create({
    btnWrapper: {
        paddingRight: 16,
        flexDirection: "row",
        ...Classes.CENTER
    },
    text: {
        fontSize: TextSize.MEDIUM_TEXT
    },
    icon: {
        marginLeft: 8
    }
});

