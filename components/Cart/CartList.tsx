import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Product, ShoppingCartState } from '../../types';

interface CartListProps {
    items: Product[],
    total: number,
    addProduct?: () => void,
    removeProduct?: () => void
}

export default function CartList({
    items = [],
    total = 0,
    // addProduct = (product: Product) => { },
    // removeProduct = (product: Product) => { }
}: ShoppingCartState) {
    return (
        <View>
            <Text>CartList</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
