import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function WelcomeScreen() {
  const icon = <Icon name='rocket' size={30} color='#900'/>
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>WelconeScreen Screen</Text>
      {icon}
    </View>
  )
}