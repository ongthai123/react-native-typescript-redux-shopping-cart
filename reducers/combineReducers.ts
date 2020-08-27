import {combineReducers} from 'redux';
import shopReducer from './index';
import { ShoppingCartState } from '../types';

const rootReducer = combineReducers<ShoppingCartState>({
    shop: shopReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

