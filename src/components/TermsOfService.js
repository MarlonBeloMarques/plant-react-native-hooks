import React from 'react'
import { Modal, ScrollView, FlatList } from 'react-native' 
import { Block, Text, Button } from '../elements'
import PropTypes from "prop-types";
import { theme } from '../constants'

const  termsOfService = (props) => {
  return (
    <Modal
        visible = {props.visible}
        animationType = "slide"
        onRequestClose = {props.onRequestClose}
      >
       <Block
          padding = {[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
          color={theme.colors.white}
        >
          <Text h2 light>Terms of Service</Text>
          <FlatList
            style={{ marginVertical: theme.sizes.padding }}
            data={props.terms}
            renderItem= {({item, index}) => 
              <Text
                key={`${index}`}
                style={{ marginBottom: theme.sizes.base, color: theme.colors.gray }}>
                {`${index+1}.${item}`}
              </Text>
            }
          />
          <Block
            middle
            padding = {[theme.sizes.padding/2,0]}>
             <Button gradient onPress = {props.onRequestClose}>
              <Text center white> I agree</Text>   
            </Button>
             </Block>
        </Block> 
    </Modal>
  )
}

termsOfService.propTypes = {
  visible: false,
  terms: [''],
  onRequestClose: () => {}
};

export default termsOfService