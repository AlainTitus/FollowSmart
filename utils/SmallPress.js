import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useFonts } from 'expo-font'

const SmallPress = ({
    colorIn,
    textPressable,
    HandlePress,
    positionLabel,
    colorLabel,
    bgColor,
    borderColor,
    bordRadius,
    width,
    textSize,
    elevation,
    padding,
    margin,
    fontFam,
    weightText,
    borderWidth
}) => {
    const [pressColor, setPressColor] = useState(bgColor)
    const [fontsLoader] =useFonts({
        'Bangers-Regular': require('../assets/fonts/Bangers-Regular.ttf'),
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
    })

    const HandlePressIn = ()=>{
      if(colorIn){
        setPressColor(colorIn)
      }
      return;
    }

    const HandlePressOut = ()=>{
      if(bgColor){
        setPressColor(bgColor)
        return;
      }
    }
    
  return (
    <Pressable 
      onPress={HandlePress}
      // onPressIn={HandlePressIn}
      // onPressOut={HandlePressOut}
      style={[styles.pressable, {
        borderWidth: borderWidth ? borderWidth : 1,
        margin: margin ? margin : 0,
        padding:padding ? padding : 5,
        backgroundColor: pressColor ? pressColor : 'white',
        borderColor: borderColor ? borderColor : 'none',
        borderRadius: bordRadius ? bordRadius : 20,
        width: width ? width : '100%',
        elevation: elevation ? elevation : 5
      }]}
    >
      <Text style={[styles.text, {
          fontFamily: fontFam? fontFam : 'Pacifico-Regular',
          fontWeight: weightText ? weightText : 'normal',
          textAlign: positionLabel ? positionLabel : 'left',
          color: colorLabel ? colorLabel : 'black',
          fontSize: textSize ? textSize : '24'
          }]}>{textPressable}</Text>
    </Pressable>
  )
}

export default SmallPress;

const styles = StyleSheet.create({

    text: {

        // textAlign: "center",
        fontSize: 24,
    }
})