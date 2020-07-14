import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { compose } from "redux";
import { StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Container, AppButton } from "../../components/atoms";
import { CustomAlert } from "../../components/moleculs";
import { DoNotAuth } from "../../hoc";

import { Classes } from "../../assets/styles";
import { NavigationStackProps } from "../../interfaces/common";
import { StorageKeys } from "../../shared/constants";
import NavigationUrls from "../../navigation/navigationUrls";

import { userActions } from "../../store/actions/user.action";
import { AppStateType } from "../../store/reducers";

type MapDispatchToProps = {
    logoutUser: () => void
};

const LogoutScreen: NavigationStackProps<MapDispatchToProps> = ({ logoutUser, navigation }) => {
    const [visibleAlert, setVisibleAlert] = useState(false);

    const onLogout = async () => {
        await AsyncStorage.removeItem(StorageKeys.IS_AUTH);
        logoutUser();
        navigation.navigate(NavigationUrls.LOGIN);
    };

    return (
        <Container style={ styles.container } >
            { visibleAlert &&
                <CustomAlert
                    title="Logout"
                    message="Are you sure you want to go out?"
                    positiveButtonText="Go out"
                    onPositiveButtonPress={ onLogout }
                    negativeButtonText="Cancel"
                    onNegativeButtonPress={ () => setVisibleAlert(false) }
                />
            }
            <AppButton onPress={ () => setVisibleAlert(true) } style={ styles.button } >
                <Icon name="close" size={100} />
            </AppButton>
        </Container>
    )
};

const styles = StyleSheet.create({
    container: Classes.CENTER,
    button: {
        width: Dimensions.get("window").width * 0.5,
        height: Dimensions.get("window").width * 0.5,
        borderRadius: Math.round(Dimensions.get("window").width + Dimensions.get("window").height) / 2,
    }
});

export default compose(
    connect<{}, MapDispatchToProps, {}, AppStateType>(
        null,
        { logoutUser: userActions.logoutUser }
    ),
    DoNotAuth
)(LogoutScreen) as NavigationStackProps<{}>;
