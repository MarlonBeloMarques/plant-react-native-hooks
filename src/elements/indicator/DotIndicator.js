import PropTypes from "prop-types";
import React from "react";
import { Animated, Easing } from "react-native";
import Indicator from "./Indicator";

export default function DotIndicator(props) {
  
  const defaultProps = {
    animationEasing: Easing.inOut(Easing.ease),
    color: "rgb(0, 0, 0)",
    count: 4,
    size: 16 
  };

  const propTypes = {
    ...Indicator.propTypes,

    color: PropTypes.string,
    size: PropTypes.number
  };  

  function renderComponent({ index, count, progress }) {
    let { size, color: backgroundColor } = props;

    let style = {
      width: size,
      height: size,
      margin: size / 3,
      borderRadius: size / 2,
      backgroundColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [
              0.0,
              (index + 0.5) / (count + 1),
              (index + 1.0) / (count + 1),
              (index + 1.5) / (count + 1),
              1.0
            ],
            outputRange: [1.0, 1.36, 1.56, 1.06, 1.0]
          })
        }
      ]
    };

    return <Animated.View style={style} {...{ key: index }} />
  }
  
  return (
    <Indicator
      style={[styles.container, style]}
      renderComponent={renderComponent}
    />
  )
  
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }
}
