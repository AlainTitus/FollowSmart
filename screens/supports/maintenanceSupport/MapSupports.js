import { StyleSheet, Text, View, Button, ScrollView, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { db } from '../../qualite/config';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { TabActions } from '@react-navigation/native';

let locationsOfInterest = [
  {
    title: "First",
    location: {
      latitude: 4.577282,
      longitude: 13.685868
    },
    description: "My first support"
  },
  {
    title: "Second",
    location: {
      latitude: 4.577594,
      longitude: 13.677469
    },
    description: "My second support"
  },
  {
    title: "First",
    location: {
      latitude: 4.570868,
      longitude: 13.696985
    },
    description: "My thirth support"
  },
]

/***********Debut du composant******* */
const MapSupports = ({ navigation }) => {

  const [points, setPoints] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchResult, setFetchResult] = useState("")


  const HandleDelete = (id) => {
    Alert.alert("Warning!", "Confirmer la suppression du support?", [
      {
        text: 'OK',
        onPress: async () => {
          await deleteDoc(doc(db, 'route', id))
          ToastAndroid.show('Supprimer avec succès!', ToastAndroid.SHORT)
        }
      },
      {
        text: 'NO',
        onPress: () => {
          ToastAndroid.show('Suppresion annulée!', ToastAndroid.SHORT)
        }
      }
    ])
  }

  const HandleAllDelete = () => {
    if (points.length === 0) {
      ToastAndroid.show('Aucune données à supprimer', ToastAndroid.SHORT)
    } else {
      points.forEach(point => {
        (
          async () => {
            await deleteDoc(doc(db, 'route', point.id))
          }
        )()
      })
    }

  }

  const showLocationOfInterest = () => {
    return points.map((item, index) => {
      return (
        <Marker
          key={item.id}
          tappable
          onPress={() => HandleDelete(item.id)}
          pinColor='blue'
          coordinate={{ latitude: item.coorSup.latitude, longitude: item.coorSup.longitude }}
          title={item.nomroute}
          description={item.structure}
          image={require('../../../assets/red_point_resized.png')}
        />
      )
    })
  }

  const HandleRetour = () => {
    navigation.navigate('Main support')
  }

  useEffect(() => {
    try {
      getDocs(collection(db, 'route')).then((datas) => {
        let newList = []
        if (datas) {
          datas.forEach(doc => {
            console.log("succès")
            const interruption = { id: doc.id, ...doc.data() }
            console.log(doc.id)
            console.log(doc.data().coorSup)
            newList.push(interruption)
          })
          if(newList.length == 0) {
            setFetchResult("Aucune donnée enregistrée pour le moment")
            setIsLoading(false)
            return;
          }
          setPoints([...newList]);
          setIsLoading(false)
          setFetchResult("")
        } else {
          setFetchResult('Aucune donnée trouvée suite à la requète');
          setIsLoading(false);
        }
      }).catch((error) => {
        console.log("promise error: ", error);
        setFetchResult("Une erreure lors de la requête sur la promesse");
        setIsLoading(false);
      })
    } catch (error) {
      console.log('Try error:', error);
      setFetchResult("Une erreure lors de la requête sur le Try");
      setIsLoading(false);
    }
  }, [])


  return (
    <View style={styles.container}>
      {
        isLoading ? (
          <Text>Chargement de la carte en cours...</Text>
        ) : (

          (fetchResult.length === 0 && points.length !== 0) ? (
            <>
              <View style={styles.viewTitleMap}>
                <Text style={styles.textMapView}>Nombre de supports : {points.length}</Text>
              </View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 4.521372,
                  latitudeDelta: 3.7999,
                  longitude: 13.914164,
                  longitudeDelta: 3.752148
                }}
              >
                {showLocationOfInterest()}
              </MapView>
            </>

          ) : (
            <Text>{fetchResult}</Text>
          )


        )
      }

      <View style={{ marginVertical: 10 }}>
        <Button title='retour' onPress={HandleRetour}></Button>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title='Effacer toutes les données' onPress={HandleAllDelete}></Button>
      </View>

    </View>
  )
}

export default MapSupports

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  map: {
    width: '100%',
    height: '75%',
  },
  viewTitleMap: {
    backgroundColor: '#fff',
    padding: 5,
    marginTop: 5
  },
  textMapView: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  }
})