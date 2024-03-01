import { StyleSheet, Alert, ToastAndroid, Text, ImageBackground, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import InputForm from '../../../utils/InputForm';
import PressComponent from '../../../utils/PressComponent';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('mainD.db')

/***************     COMPOSANT PRINCIPAL     *********************** */
const RouteSupport = ({ navigation }) => {

  const [coordX, setCoordX] = useState('');
  const [coordY, setCoordY] = useState('');
  const [rout, setRout] = useState('');
  const [structure, setStructure] = useState('')
  const [dataStore, setDataStore] = useState([]);
  const [exploitation, setExploitation] = useState('');
  const [typeSupport, setTypeSupport] = useState('');

  const exploitations = [
    { key: '1', value: 'Bertoua' },
    { key: '2', value: 'Belabo' },
    { key: '4', value: 'Batouri' },
    { key: '5', value: 'Abong Mbang' },
    { key: '6', value: 'Lomie' },
    { key: '7', value: 'Yokadouma' },
    { key: '8', value: 'Moloundou' },
    { key: '9', value: 'Garoua Boulai' },
    { key: '10', value: 'Betare Oya' },
  ];
  const supports = [
    { key: '1', value: 'BT' },
    { key: '2', value: 'MT' },
  ];

  const setData = async () => {
    if (coordX.length == 0 || coordY.length == 0 || rout.length == 0 || structure.length == 0 || exploitation.length == 0 || typeSupport.length == 0) {
      console.log(coordX)
      console.log(coordY)
      console.log(rout)
      console.log(structure)
      console.log(exploitation)
      console.log(typeSupport)
      Alert.alert('Attention!', 'Bien vouloir remplir tous les champs')
    } else {
      try {
        const dataSave = {
          routSave: "FP"+rout,
          xSave: coordX,
          ySave: coordY,
          structureSave: structure,
          exploitat: exploitation,
          typSup : typeSupport
        }
        const allSave = [...dataStore];
        allSave.push(dataSave)
        await AsyncStorage.setItem('routSave', JSON.stringify(allSave));
        Alert.alert("Requète", "Continuer avec la route?", [
          {
            text: 'OK',
            onPress: () => {
              setRout(rout);
              setCoordX('');
              setCoordY('');
              setDataStore(allSave)
              console.log("save ok")
            }
          },
          {
            text: 'NO',
            onPress: () => {
              setDataStore(allSave)
              console.log("save no")
              navigation.navigate("Main support");
            }
          }
        ])
      } catch (error) {
        console.log('error async: ', error)
      }
    }
  }

  const getData = () => {
    try {
      AsyncStorage.getItem('routSave')
        .then(value => {
          if (value != null) {
            let data = JSON.parse(value)
            setDataStore(data)
          }
        })
    } catch (error) {
      console.log('Erreur get: ', error)
    }

  }

  const HandleRoute = () => {
    navigation.navigate('Main support')
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    
      <ScrollView
        style={styles.container}
      >
      <KeyboardAvoidingView>
      <PressComponent
        textPressable='Coordonnées de la route'
        positionLabel='center'
        colorLabel='white'
        bgColor="green"
        borderColor='none'
        bordRadius={1}
      />

      <View style={styles.field}>
        <Text style={styles.labelField}>Exploitation:</Text>
        <SelectList
          setSelected={((val) => setExploitation(val))}
          data={exploitations}
          save='value'
          boxStyles={{
            borderColor: 'green',
            backgroundColor: "white"
          }}
          dropdownStyles={{
            backgroundColor: 'green'
          }}
          dropdownTextStyles={{ color: "white" }}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.labelField}>Type supports:</Text>
        <SelectList
          setSelected={((val) => setTypeSupport(val))}
          data={supports}
          save='value'
          boxStyles={{
            borderColor: 'green',
            backgroundColor: "white"
          }}
          dropdownStyles={{
            backgroundColor: 'green'
          }}
          dropdownTextStyles={{ color: "white" }}
        />
      </View>

      <InputForm
        label="Nom de la route"
        val={rout}
        setChange={setRout}
        placeholder="nom de la route"
      />
      <InputForm
        label="Coordonnée X"
        val={coordX}
        setChange={setCoordX}
        placeholder="xx.xxxxxx - lat"
        keyboardType='numeric'
      />
      <InputForm
        label="Coordonnée Y"
        val={coordY}
        setChange={setCoordY}
        placeholder="yy.zzzzzz - long"
        keyboardType='numeric'
      />
      <InputForm
        label="Structure du support"
        val={structure}
        setChange={setStructure}
        placeholder="S ou X ou J ..."
      />

      <PressComponent
        colorIn='#154360'
        textPressable="Enregistrer"
        HandlePress= {setData}
        positionLabel='center'
        colorLabel= "#fff"
        bgColor= "#3498DB"
        borderColor= "white"
        bordRadius= {10}
        width="100%"
        textSize= {22}
        elevation= {5}
        padding= {5}
        margin={5}
        fontFam= 'Pacifico-Regular'
        weightText= 'bold'
        borderWidth= {1}
      />
      <PressComponent
        colorIn='#154360'
        textPressable="Retour"
        HandlePress= {HandleRoute}
        positionLabel='center'
        colorLabel= "#fff"
        bgColor= "#3498DB"
        borderColor= "white"
        bordRadius= {10}
        width="100%"
        textSize= {22}
        elevation= {5}
        padding= {5}
        margin={5}
        fontFam= 'Pacifico-Regular'
        weightText= 'bold'
        borderWidth= {1}
      />
      </KeyboardAvoidingView>
    </ScrollView>
    
    
  )
}

export default RouteSupport

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 5
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'green',
    color: 'white'
  }
})