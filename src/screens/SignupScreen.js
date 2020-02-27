import React, {useState} from "react";
import PropTypes from 'prop-types'
import {Keyboard, Platform, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Block, Input, Button, Text, DotIndicator} from '../elements';
import {theme} from '../constants';
import {CommonUtils} from '../utils';

export default function SignupScreen(props) {
  const [email, setEmail] = useState("plantapp@react.com");
  const [password, setPassword] = useState("react");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('plantapp')

  function onEmailTextChanged(newEmail) {
    setEmail(newEmail);
  };

  function onPasswordTextChanged(newPassword) {
    setPassword(newPassword);
  };

  function onUsernameTextChanged(newUsername) {
    setUsername(newUsername);
  };

  //Server side mockup
  async function onSignupClicked() {
    Keyboard.dismiss();
    setLoading(true);
    await CommonUtils.wait(2000);
    const errors = [];
    if (!CommonUtils.validateEmail(email)) {
      errors.push("email");
    }
    if (password.length <= 0) {
      errors.push("password");
    }

    if (username.length <= 0) {
      errors.push("username");
    }
    setErrors(errors)
    setLoading(false)

    if (errors.length === 0) props.navigation.navigate("browse");
  };

  function onLoginClicked() {
    props.navigation.navigate("login");
  };

  const isErrors = errors
  const errorStyle = key => isErrors.includes(key) ? styles.inputError : null
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Signup
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={errorStyle("email")}
            style={[styles.input, errorStyle("email")]}
            defaultValue={email}
            onChangeText={(text) => onEmailTextChanged(text)}
          />
          <Input
            label="Username"
            error={errorStyle("username")}
            style={[styles.input, errorStyle("username")]}
            defaultValue={username}
            onChangeText={(text) => onUsernameTextChanged(text)}
          />
          <Input
            secure
            label="Password"
            style={[styles.input, errorStyle("password")]}
            error={errorStyle("password")}
            defaultValue={password}
            onChangeText={(text) => onPasswordTextChanged(text)}
          />
          <Button gradient onPress={onSignupClicked}>
            {loading ? (
              <DotIndicator
                color={theme.colors.white}
                count={4}
                size={theme.sizes.base * 0.5}
              />
            ) : (
              <Text bold white center>
                Signup
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
    justifyContent: "center"
  },
  input: {
    borderColor: "transparent",
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputError: {
    borderBottomColor: theme.colors.accent
  }
})

SignupScreen.PropTypes = {

}

SignupScreen.defaultProps = {

}
