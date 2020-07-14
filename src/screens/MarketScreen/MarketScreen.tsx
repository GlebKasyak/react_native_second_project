import React, { FC } from "react";
import { useSelector } from "react-redux";
import { View, Image, Text, StyleSheet } from "react-native";

import { Container, AppText, AppTextBold } from "../../components/atoms";

import { NavigationStackProps } from "../../interfaces/common";
import { Colors } from "../../assets/styles";
import { MarketType } from "../../interfaces/market";

import { AppSelectors } from "../../store/selectors";
import { AppStateType } from "../../store/reducers";

const MarketScreen: NavigationStackProps<{}> = ({ navigation }) => {
    const { theme } = useSelector((state: AppStateType) => AppSelectors.getAppTheme(state))
    const market: MarketType = navigation.getParam("market");

    return (
        <Container>
            <Image source={{ uri: market.image }} style={{ ...styles.image, borderColor: theme.BORDER }} />
            <View style={ styles.descriptionWrapper } >
                <Description
                    paragraph="City"
                    text={ market.city }
                    textColor={ theme.TEXT_2  }
                    paragraphColor={ theme.TEXT_3 }
                />
                <Description
                    paragraph="Description"
                    text={ market.description }
                    textColor={ theme.TEXT_2  }
                    paragraphColor={ theme.TEXT_3 }
                />
                <Description
                    paragraph="Type"
                    text={ market.type }
                    textColor={ theme.TEXT_2  }
                    paragraphColor={ theme.TEXT_3 }
                />
            </View>
        </Container>
    )
};

type Props = {
    paragraph: string,
    text: string,
    paragraphColor: Colors,
    textColor: Colors
};

const Description: FC<Props> = ({ paragraph, text, paragraphColor, textColor }) => (
    <View style={ styles.textWrapper } >
        <AppTextBold style={{ color: paragraphColor }} >
            { paragraph }: <Text />
            <AppText style={{ ...styles.text, color: textColor }} >
                { text }
            </AppText>
        </AppTextBold>
    </View>
);

const styles = StyleSheet.create({
    image: {
        height: 250,
        width: "100%",
        resizeMode: "stretch",
        borderWidth: 2
    },
    text: {
        marginLeft: 5,
        left: 10,
        flex: 1
    },
    descriptionWrapper: {
        paddingVertical: 10,
    },
    textWrapper: {
        marginBottom: 6,
    }
});

export default MarketScreen;
