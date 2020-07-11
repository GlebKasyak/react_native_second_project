import React from "react";
import { View, Text } from "react-native";

import { Container } from "../../components/atoms";
import { NavigationStackProps } from "../../interfaces/common";

const MarketScreen: NavigationStackProps<{}> = () => {
    return (
        <Container>
            <Text>Market</Text>
        </Container>
    )
};

export default MarketScreen;
