import React, { useState } from 'react';
import AppContainer from './src/navigation'
import { View } from 'react-native'

import * as PreloadingAssets from './src/utils/PreloadingAssets'
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
          console.log('Apploading complete')
        }}
        onError={console.warn}
      />
    )
  }
  else {
    return <AppContainer /> 
  }
}