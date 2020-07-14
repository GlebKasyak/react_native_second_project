import React, { FC } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Market from "./Market";
import { AppLoader } from "../../atoms";

import { MarketType } from "../../../interfaces/market";

type Props = {
    data: Array<MarketType>,
    isLoading?: boolean,
    onOpen: (post: MarketType) => void,
    nextPage: () => void
};

const MarketList: FC<Props> = ({ data, isLoading, onOpen, nextPage }) => (
    <View style={ styles.wrapper } >
        <FlatList
            data={ data }
            renderItem={ ({ item }) => <Market market={ item } onOpen={ onOpen } />  }
            onEndReached={ nextPage }
            onEndReachedThreshold={0.1}
            ListFooterComponent={ () => isLoading ? <AppLoader size={30} /> : null }
            removeClippedSubviews={true}
            keyExtractor={ item => item.id }
        />
    </View>
);

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 10,
        marginBottom: 25
    }
});

export default MarketList;
