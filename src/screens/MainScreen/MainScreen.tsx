import React from "react";
import { Text } from "react-native";

import { Container } from "../../components/atoms";
import { NavigationStackProps } from "../../interfaces/common";


const MainScreen: NavigationStackProps<{}> = () => {
    return (
        <Container>
            <Text>Main</Text>
        </Container>
    )
};

export default MainScreen;
