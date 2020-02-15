import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import RN from "react-native/package";

//configurações de versão
const [major, minor] = RN.version.split(".").map(item => Number(item));
const hasLoopSupport = !major && minor >= 45;

export default function Indicator(props) {
  const defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,

    animating: true,
    interaction: true,

    count: 1
  };

  const propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number
  };

  const [isProgress, setIsProgress] = useState(new Animated.Value(0))

  mounted = false;

  function startAnimation({ finished } = {}) {
    let progress = isProgress
    let { interaction, animationEasing, animationDuration } = props;

    if (!mounted || false === finished) {
      return;
    }

    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    });

    if (hasLoopSupport) {
      Animated.loop(animation).start();
    } else {
      progress.setValue(0);
      animation.start(startAnimation);
    }

    setIsProgress({animation})
  }

  function stopAnimation() {
    let { animation } = isProgress;

    if (null == animation) {
      return;
    }

    animation.stop();

    setIsProgress({ animation: null });
  }

  useEffect(() => {
    let { animating } = props;

    mounted = true;

    if (animating) {
      startAnimation();
    }

    return () => {
      mounted = false;
    }
  })

  useEffect(() => {
    let { animating } = props;

    if (animating ^ props.animating) {
      if (animating) {
        stopAnimation();
      } else {
        startAnimation();
      }
    }
  }, [props.animating])

  function renderComponent(undefined, index) {
    let { progress } = isProgress
    let { renderComponent, count } = props;

    if (typeof renderComponent === "function") {
      return renderComponent({ index, count, progress });
    } else {
      return null;
    }
  }

  return (
    <Animated.View {...props}>
      {Array.from(new Array(count), renderComponent)}
    </Animated.View>
  );
}
