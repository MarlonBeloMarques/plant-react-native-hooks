import React, { useState } from 'react'
import { Platform, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native'
import { Block, Input, Button, Text, DotIndicator } from '../elements'
import { theme } from '../constants' 
import { CommonUtils } from '../utils'
import { validateEmail } from '../utils/CommonUtils'

export default function ForgotPasswordScreen(props) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('plantapp@react.com')
  const [errors, setErrors] = useState([])
  
  function onEmailTextChanged(newText) {
    setEmail(newText)
  }

  async function onEmailEntered() {
    Keyboard.dismiss()
    setLoading(true)
    await CommonUtils.wait(1200)
    const errors = []
    if(!validateEmail(email)){
      errors.push('email');
    }
    setLoading(false)
    setErrors(errors)
    if(errors.length === 0){
      //show modal
      set
    }
  }

  function onLoginClicked() {
    props.navigation.navigate("login");
  }

  const isErrors = errors
  const errorStyle = key => errors.includes(key) ? styles.inputError : null

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.select({
        ios: 0,
        android: theme.sizes.base * 2
      })}
      behavior="padding"
    >
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Forgot Password
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={errorStyle("email")}
            style={[styles.input, errorStyle("email")]}
            defaultValue={email}
            onChangeText={(text) => onEmailTextChanged(text)}
          />
          <Button gradient onPress={onEmailEntered}>
            {loading ? (
              <DotIndicator
                color={theme.colors.white}
                count={4}
                size={theme.sizes.base * 0.5}
              />
            ) : (
              <Text bold white center>
                Forgot
              </Text>
            )}
          </Button>

          <Button onPress={onLoginClicked}>
            <Text
              center
              caption
              gray
              style={{ textDecorationLine: "underline" }}
            >
              Back to Login
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  input: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  inputError: {
    borderBottomColor: theme.colors.accent
  }
})

ForgotPasswordScreen.propTypes = {

}

ForgotPasswordScreen.defaultProps = {

}