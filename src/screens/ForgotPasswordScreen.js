import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ForgotPasswordScreen(props) {
  return(
    <View style={styles.container}>
      <Text>Forgot Password</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

ForgotPasswordScreen.propTypes = {

}

ForgotPasswordScreen.defaultProps = {
  
}