// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { createStore, Store, combineReducers, Reducer } from 'redux';

import { ShoppingCartState } from './types/index';
import shopReducer from './reducers/index'

import ProductList from './components/Product/ProductList'
import Cart from './components/Cart/Cart'
import rootReducer from './reducers/combineReducers';

import AsyncStorage from '@react-native-community/async-storage'

//For store state persistence
import { persistStore, persistReducer } from 'redux-persist'

//Required when apply middleware
// import {createLogger} from 'redux-logger';

import { PersistGate } from 'redux-persist/es/integration/react'

//Configure app's store
const persisConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['shop']
}

const persistedReducer = persistReducer(persisConfig, rootReducer);

function configureStore() {
  const store = createStore<ShoppingCartState>(
    persistedReducer,
  );
  return store;
}
const store = configureStore();

const persistedStore = persistStore(store)

//Navigation
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function ProductScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductList}
        options={{
          title: 'Products',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
}

function CheckOutScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CheckOut"
        component={Cart}
        options={{
          title: 'Check Out',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store as any}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              style: {
                alignItems: 'center',
                justifyContent: 'center'
              },
              tabStyle: {
                alignItems: 'center',
                justifyContent: 'center'
              }
            }}
          >
            <Tab.Screen name="Products" component={ProductScreen} />
            <Tab.Screen name="CheckOut" component={CheckOutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
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
