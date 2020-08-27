// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import { createStore, Store, combineReducers, Reducer } from 'redux';

import { ShoppingCartState } from './types/index';
import shopReducer from './reducers/index'

import ProductList from './components/Product/ProductList'
import Cart from './components/Cart/Cart'
import rootReducer from './reducers/combineReducers';

function configureStore() {
  const store = createStore<ShoppingCartState>(rootReducer,
  );
  return store;
}
const store = configureStore();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store as any}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Products" component={ProductList} />
          <Tab.Screen name="CheckOut" component={Cart} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
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
