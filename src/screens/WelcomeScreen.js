import React, { useState } from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  FlatList,
  Image
} from "react-native";

import { Block, Text, Button } from "../elements";
import { theme } from "../constants/index";
import { TermsOfService } from "../components";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen(props) {
  const [ extra, setExtra ] = useState({});
  const [ showTermsOfService, setShowTermsOfService ] = useState(false);

  const navigationOptions = {
    header: null
  };

  const scrollX = new Animated.Value(0);

  function onLoginClicked() {
    props.navigation.navigate("login");
  };

  function onSignupClicked() {
    props.navigation.navigate("signup");
  };

  function onTermsOfServiceClicked() {
    setShowTermsOfService(true);
  }

  function onHideTermsOfService() {
    setShowTermsOfService(false);
  };

  function renderTermsOfService() {
    return (
      <TermsOfService
        visible={showTermsOfService}
        onRequestClose={onHideTermsOfService}
    ></TermsOfService>
    )
  }

    function renderIllustrations() {
      const { illustrations } = props;

      console.log(props);

      return (
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={illustrations}
          extraData={extra}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <Image
              source={item.source}
              resizeMode="contain"
              style={{ width: width, height: height / 2, overflow: "visible" }}
            />
          )}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { x: scrollX } }
            }
          ])}
        />
      )
    }

    function renderSteps() {
      const { illustrations } = props;
      const stepPosition = Animated.divide(scrollX, width);

      return (
        <Block row center middle style={styles.stepsContainer}>
          {illustrations.map((item, index) => {
            const opacity = stepPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.4, 1, 0.4],
              extrapolate: "clamp"
            });
            return (
              <Block
                key={`step-${item.id}`}
                animated
                flex={false}
                style={[styles.steps, { opacity }]}
                color={theme.colors.gray}
              />
            );
          })}
        </Block>
      )
    }

    function renderWelcomeScreen() {
      return (
        <Block>
          <Block flex={0.4} center bottom>
            <Text h1 center bold>
              Plants.
              <Text h1 primary>
                Store.
              </Text>
            </Text>
            <Text h3 gray style={{ margin: theme.sizes.padding / 2 }}>
              For a greener home.
            </Text>
          </Block>

          <Block center middle>
            {renderIllustrations()}
            {renderSteps()}
          </Block>

          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
            <Button shadow gradient onPress={onLoginClicked}>
              <Text center semibold white>
                Login
              </Text>
            </Button>

            <Button
              center
              color={theme.colors.white}
              shadow
              onPress={onSignupClicked}
            >
              <Text center semibold>
                Signup
              </Text>
            </Button>

            <Button onPress={onTermsOfServiceClicked}>
              <Text center caption gray>
                Terms of Service
              </Text>
            </Button>
          </Block>
        </Block>
      );
    }

      if (showTermsOfService) {
        console.log('mostrar termos')
        return renderTermsOfService();
      }
      return renderWelcomeScreen()

  }

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});

WelcomeScreen.propTypes = {};

WelcomeScreen.defaultProps = {
  illustrations: [
    { id: 1, source: require("../../assets/images/illustration_1.png") },
    { id: 2, source: require("../../assets/images/illustration_2.png") },
    { id: 3, source: require("../../assets/images/illustration_3.png") }
  ]
};
