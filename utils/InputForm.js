import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

const InputForm = ({label, setChange, placeholder, val, keyboardType}) => {
    const [state, setState] = useState(val);
 
    useEffect(()=>{
      setChange(state)
      console.log(val)
    }, [state]);

  return (
    <View style={styles.inputForm}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        value={state}
        onChangeText={setState}
        placeholder={placeholder ? placeholder : ""}
        style={styles.input}
        keyboardType={keyboardType ? keyboardType : 'default'}
      />
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
    inputForm: {
        marginVertical: 5
    },
    label:{
        fontSize: 18
    },
    input: {
        padding: 8,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize: 18
    }
})