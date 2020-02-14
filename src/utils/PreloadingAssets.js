import { Font } from 'expo'
import { Image } from 'react-native'
import { Asset } from 'expo-asset'


// Para uma melhor experiência do usuário, é necessário fazer o download e armazenar em cache certos ativos antes mesmo de o aplicativo ser iniciado.
// A API AppLoading da Expo nos permite realizar determinadas operações assíncronas antes do aplicativo começar.
// Utilizamos a mesma API para baixar os ativos e armazená-los em cache.

// TODO: os locais da imagem devem ser relativos a este arquivo ou ao App.js em que estamos executando essas operações? Aqui estou escrevendo seus locais em relação ao App.js, porque ele chamará as funções cacheImages e cacheFonts e, idealmente, deve fornecer as imagens. Estou usando o comportamento padrão das funções de argumento para fornecê-las eu mesmo, em nome do App.js.
const requiredImagesForCaching = [

  require("../../assets/splash.png"),
  require("../../assets/icon.png"),
  require("../../assets/images/icon.png"),
  require("../../assets/images/avatar.png"),
  require("../../assets/images/plants_1.png"),
  require("../../assets/images/plants_2.png"),
  require("../../assets/images/plants_3.png"),
  require("../../assets/images/explore_1.png"),
  require("../../assets/images/explore_2.png"),
  require("../../assets/images/explore_3.png"),
  require("../../assets/images/explore_4.png"),
  require("../../assets/images/explore_5.png"),
  require("../../assets/images/explore_6.png"),
  require("../../assets/icons/back.png"),
  require("../../assets/icons/fertilizers.png"),
  require("../../assets/icons/flowers.png"),
  require("../../assets/icons/plants_1.png"),
  require("../../assets/icons/plants.png"),
  require("../../assets/icons/pots.png"),
  require("../../assets/icons/seeds.png"),
  require("../../assets/icons/sprayers.png"),
  require("../../assets/icons/slider-dot.png")

]

const requiredFontsForCaching = [

]

export const cacheImages = (images = requiredImagesForCaching) => {
  return images.map(image => {
    if(typeof image === 'string') {
      return Image.prefetch(image)
    }
    else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export const cacheFonts = (fonts = requiredFontsForCaching) => {
  return fonts.map(font => Font.loadAsync(font))
}