import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Text, Button } from 'react-native'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import OutfitsTab from '../screens/outfits-tab/OutfitsTab';
import ProductsTab from '../screens/products-tab/ProductsTab';
import MenuListScreen from '../screens/products-tab/MenuListScreen';

import { BottomTabParamList } from '../types';
import store from '../store';
import { logoutUser } from '../reducers/sessionSlice';
import {HistoryScreen} from '../screens/products-tab/HistoryScreen';
import { PredictionScreen } from '../screens/products-tab/PredictionScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const state = store.getState();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors.pink, showLabel: false }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="tshirt" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIconEntypo name="home" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <FontAwesome5 size={25} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconEntypo(props: { name: string; color: string }) {
  return <Entypo size={30 } style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="OutfitsTab"
        component={OutfitsTab}
        options={{
          headerTitle: 'Outfits', headerLeft: () => { }, headerStyle: {
            backgroundColor: Colors.white
          },
          // headerTintColor: Colors.white,
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen initialRouteName="MenuListScreen"
        name="MenuListScreen"
        component={MenuListScreen}
        options={{
          headerTitle: 'Menu', headerLeft: () => { }
        }}
      />
      <TabTwoStack.Screen
        name="ProductsList"
        component={ProductsTab}
        options={{
          headerTitle: 'Products'
        }}
      />
      <TabTwoStack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          headerTitle: 'History'
        }}
      />
      <TabTwoStack.Screen
        name="PredictionScreen"
        component={PredictionScreen}
        options={{
          headerTitle: 'Outfit prediction'
        }}
      />
    </TabTwoStack.Navigator>
  );
} 