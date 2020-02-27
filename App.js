import React, { useState } from 'react';
import AppContainer from './src/navigation'
import { View } from 'react-native'

import { PreloadingAssets } from './src/utils/PreloadingAssets'
import { AppLoading } from 'expo';

export default function App (props) {
  
  const [isReady, setisReady] = useState(false)

  const loadAssetsAsynchrously = () => {
    const imageAssets = PreloadingAssets.cacheImages()
    const fontsAssets = PreloadingAssets.cacheFonts()
  }

  console.disableYellowBox = true

  if(!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsynchrously}
        onFinish = { () => {
          setisReady(true); 
        }}
        onError={console.warn}
      />
    )
  }
  else {
    return (
      <View style={{flex: 1}}>
        <AppContainer />
      </View>
    ); 
  }
}