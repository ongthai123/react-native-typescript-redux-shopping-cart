import React, { useEffect, Dispatch } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView, Button, Image } from 'react-native';
import { ShoppingCartState, ShoppingItem } from '../../types';

import { Product } from '../../types/index'
import { useSelector, connect, useDispatch } from 'react-redux';
import * as actions from '../../actions/index'
import { RootState } from '../../reducers/combineReducers';

export interface Props {
	items: ShoppingItem[],
	total: number,
	addProduct?: (product: Product) => void,
	removeProduct?: (product: Product) => void
}

const Cart: React.FC<Props> = ({ items, total, addProduct = () => { }, removeProduct = () => { } }: Props) => {

	//retrieve store state
	const data = useSelector((state: RootState) => state as any)

	//declare dispatch
	const dispatch = useDispatch();

	useEffect(() => {
		//dispatch sample data
		// dispatch(actions.addProduct({ name: "Sledgehammer", price: 125.75 }))
	}, [])

	//for mapping data
	let tableData: ShoppingItem[] = [];

	if (data.shop.items.length != 0) {
		tableData = data.shop.items.map((item: any) =>
			<View key={item.name} style={styles.productItem}>
				<View style={{ flexDirection: 'row' }}>
					<View style={{ width: "20%", alignItems: 'center', justifyContent: 'center' }}>
						<Image
							source={{ uri: "https://cdn.shopify.com/s/files/1/0099/5732/products/Product-Image-Unavailable_0d7a0977-accb-4820-9de6-6a77e6baabb5_large.png" }}
							style={styles.productImage}
						/>
					</View>
					<View style={{ width: "40%", alignItems: 'baseline', justifyContent: "center" }}>
						<View><Text style={styles.productName}>{item.name}</Text></View>
						<View><Text style={styles.productPrice}>${item.price}</Text></View>
					</View>
					<View style={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
						<View style={styles.quantityButtonContainer}>
							<Button title="+" onPress={() => { dispatch(actions.addProduct(item)) }}></Button>
						</View>
						<View style={styles.quantityButtonContainer}>
							<Button title="-" onPress={() => { dispatch(actions.decreaseProduct(item)) }}></Button>
						</View>
					</View>
					<View style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
						<View><Text style={styles.productQuantity}>x {item.quantity}</Text></View>
						<View><Text style={styles.productQuantity}>${+(Math.round(item.quantity * item.price * 100) / 100).toFixed(2)}</Text></View>
					</View>
					<View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
						<Button title="X" onPress={() => { dispatch(actions.removeProduct(item)) }}></Button>
					</View>
				</View>
			</View>
		)

	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{tableData.length > 0 ?
				<View style={{ flex: 1 }}>
					<View style={styles.listContainer}>
						<ScrollView>
							{tableData}
						</ScrollView>
					</View>
					<View style={tableData.length > 0 ? styles.totalContainer : { display: "none" }}>
						<View>
							<View style={{ alignItems: 'center' }}>
								<Text style={{ fontSize: 30 }}>Checkout</Text>
							</View>
							<View style={{ marginTop: 20, justifyContent: 'center' }}>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
										<Text style={{ fontSize: 20 }}>Total Items: </Text>
									</View>
									<View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
										<Text style={{ fontSize: 20 }}>{data.shop.items.reduce((a: number, b: ShoppingItem) => a + b.quantity, 0)}</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
										<Text style={{ fontSize: 20 }}>Total: </Text>
									</View>
									<View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
										<Text style={{ fontSize: 20 }}>${data.shop.total}</Text>
									</View>
								</View>
							</View>
							<View style={{ paddingHorizontal: 10, backgroundColor: '#FF5733', borderRadius: 20, alignItems: 'center', marginTop: 70 }}>
								<Button title="Pay" color="#000" onPress={() => { }}></Button>
							</View>
						</View>
					</View>
				</View>
				:
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Image
						source={{ uri: "https://www.khalma.com/themes/custom/khalma/images/khalma-empty-cart.png" }}
						style={styles.emptyCartImage}
					/>
				</View>
			}
		</SafeAreaView>
	);
}

export const mapStateToProps = (state: ShoppingCartState) => {
	return {
		state: state
	}
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.ShoppingAction>) => {
	return {
		actions: {
			addProduct: (product: Product) => {
				dispatch(actions.addProduct(product))
			},
			removeProduct: (product: Product) => {
				dispatch(actions.removeProduct(product))
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// export default Cart;

const styles = StyleSheet.create({
	listContainer: {
		flex: 2,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	totalContainer: {
		flex: 1,
		backgroundColor: '#D3D3D3',
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	productItem: {
		backgroundColor: '#FF5733',
		padding: 10,
		borderRadius: 20,
		margin: 2,
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
	productQuantity: {
		fontSize: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyCartImage: {
		width: 200,
		height: 200,
	},
	productImage: {
		width: 50,
		height: 50
	},
	quantityButtonContainer: {
		borderRadius: 40,
		borderWidth: 1,
		borderColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: 30,
		minWidth: 30,
		marginVertical: 10
	}

});
