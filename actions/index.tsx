import * as actionTypes from './actionTypes'
import { Product, ShoppingItem } from '../types/index'
import shopReducer from '../reducers/index'

export interface AddProduct {
    type: actionTypes.ADD_PRODUCT;
    payload: { product: Product };
}

export interface DecreaseProduct {
    type: actionTypes.DECREASE_PRODUCT;
    payload: { product: Product };
}

export interface RemoveProduct {
    type: actionTypes.REMOVE_PRODUCT;
    payload: { product: Product };
}

export type ShoppingAction = AddProduct | DecreaseProduct | RemoveProduct;

export function addProduct(product: Product): ShoppingAction {
    return {
        type: actionTypes.ADD_PRODUCT,
        payload: { product }
    };
}

export function decreaseProduct(product: Product): ShoppingAction {
    return {
        type: actionTypes.DECREASE_PRODUCT,
        payload: { product }
    }
}

export function removeProduct(product: Product): ShoppingAction {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        payload: { product }
    };
}