import React, { FC } from "react";
import { observer, inject } from "mobx-react";
import { View, Image, Text, StyleSheet } from "react-native";

import { Container, AppText, AppTextBold } from "../../components/atoms";

import { NavigationStackComponentProps } from "../../interfaces/common";
import { Colors } from "../../assets/styles";
import { MarketType } from "../../interfaces/market";

import { StoreType } from "../../store";
import { ThemeType } from "../../assets/styles/Theme";

type Props = {
    theme: ThemeType
};

const MarketScreen: NavigationStackComponentProps<Props> = ({ navigation, theme }) => {
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

type DescriptionProps = {
    paragraph: string,
    text: string,
    paragraphColor: Colors,
    textColor: Colors
};

const Description: FC<DescriptionProps> = ({ paragraph, text, paragraphColor, textColor }) => (
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

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    theme: rootStore.appStore.appTheme.theme
}))(observer(MarketScreen) as unknown as FC<{}>);
