import React from "react"
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { Platform, Image } from 'react-native'

import WelcomeScreen from "../screens/WelcomeScreen"
import LoginScreen from "../screens/LoginScreen"
import ExploreScreen from "../screens/ExploreScreen"
import BrowseScreen from "../screens/BrowseScreen"
import ProductsScreen from "../screens/ProductsScreen"
import SettingsScreen from "../screens/SettingsScreen"
import SignupScreen from "../screens/SignupScreen"

import { theme } from "../constants";

const screens = createStackNavigator(
  {
    welcome: WelcomeScreen,
    login: LoginScreen,
    signup: SignupScreen,
    explore: ExploreScreen,
    browse: BrowseScreen,
    products: ProductsScreen,
    settings: SettingsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 6,
        shadowColor: 'transparent',
        backgroundColor: theme.colors.white, 
        elevation: 0 // for android devices. Disabling the elevation of header
      },
      cardStyle: {backgroundColor: 'white'},
      headerBackImage: <Image source={require('../../assets/icons/back.png')} />,
      headerBackTitleVisible: null,
      title: null,
      headerLeftContainerStyle: {
        alignItems: 'center',
        marginLeft: Platform.OS === 'ios' ? theme.sizes.base : 0,
        padding: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: 'center',
        marginLeft: Platform.OS === 'ios'? theme.sizes.base : 0,
        padding: theme.sizes.base
      }
    }
  }
);

export default createAppContainer(screens);
