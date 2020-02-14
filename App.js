import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import WelcomeScreen from './screens/Welcome'
import ExploreScreen from './screens/Explore'

export default function App() {
  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Plant</Text>
    </View>
  );
}

const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Explore: ExploreScreen
  },
  {
    initialRouteName: 'Welcome'
  }
)

export default createAppContainer(AppNavigator)
