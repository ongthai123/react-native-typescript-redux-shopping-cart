// import { StatusBar } from 'expo-status-bar';
import React, { useState, Dispatch } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import { Product, ShoppingCartState } from '../../types/index'
import { ShoppingAction } from '../../actions';

import * as actions from '../../actions/index'
import { connect, useDispatch } from 'react-redux';

interface Props {
    addProduct?: (product: Product) => void;
}

const ProductList: React.FC<Props> = ({ addProduct = () => { } }: Props) => {

    const dispatch = useDispatch();

    //sample products
    const products = [
        { name: "Sledgehammer", price: 125.75 },
        { name: "Axe", price: 190.50 },
        { name: "Bandsaw", price: 562.13 },
        { name: "Chisel", price: 12.9 },
        { name: "Hacksaw", price: 18.45 },
    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                {products.map(item =>
                    <View key={item.name} style={styles.productItem}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={{ uri: "https://cdn.shopify.com/s/files/1/0099/5732/products/Product-Image-Unavailable_0d7a0977-accb-4820-9de6-6a77e6baabb5_large.png" }}
                                    style={styles.productImage}
                                />
                            </View>
                            <View style={{ flex: 3 }}>
                                <View><Text style={styles.productName}>{item.name}</Text></View>
                                <View><Text style={styles.productPrice}>${item.price}</Text></View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ borderRadius: 40, width: 60, borderColor: '#000', borderWidth: 1, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ backgroundColor: '#83B2FF' }} onPress={() => { dispatch(actions.addProduct(item)) }}><Text>Add</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export const mapDispatchToProps = (dispatch: Dispatch<ShoppingAction>) => {
    return {
        actions: {
            addProduct: (product: Product) => {
                dispatch(actions.addProduct(product))
            }
        }
    }
}

export default connect(null, mapDispatchToProps)(ProductList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productItem: {
        backgroundColor: '#83B2FF',
        padding: 10,
        borderRadius: 20,
        margin: 2
    },
    productName: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productPrice: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: 50,
        height: 50
    }
});
