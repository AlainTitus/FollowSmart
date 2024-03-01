import { useEffect, useState } from "react";
import {
    View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, Pressable, Alert, ActivityIndicator,
    ToastAndroid, ImageBackground
} from "react-native";
import { doc, deleteDoc, getDoc, updateDoc, collection, query } from "firebase/firestore";
import { db } from "./config";



export default function DetailsBon({ route, navigation }) {
    const [checked, setChecked] = useState(route.params.bon.traite);
    const [bon, setBon] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const idDetail = route.params.bon.id;
    console.log(checked)



    const HandleDeleteBon = (id) => {

        Alert.alert("Suppression du bon", "Confirmer la suppression", [
            {
                text: 'Cancel',
                onPress: () => ToastAndroid.show('Suppression Annulée!', ToastAndroid.SHORT, ToastAndroid.CENTER),
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: () => deleteBon(id),
            }
        ])
        console.log(id)
    }

    const deleteBon = (id) => {
        try {
            deleteDoc(doc(db, 'bon', id))
            ToastAndroid.show('Supprimé avec succès!', ToastAndroid.SHORT, ToastAndroid.CENTER)
            navigation.navigate('Liste des bons')
        } catch (error) {
            console.log("error delete: ", error)
        }
    }

    const traitement = (id) => {
        try {
            updateDoc(doc(db, 'bon', id), {
                traite: !checked
            }).then((res) => {
                ToastAndroid.showWithGravity(
                    'changement enregistré avec succès!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )

                getDoc(doc(db, 'bon', idDetail)).then(inter => {
                    const newBon = inter.data()
                    console.log(inter.data())
                    setBon({
                        id: idDetail, ...newBon,
                        debutDate: new Date(newBon.debutDate.toDate()).toLocaleString(),
                        finDate: new Date(newBon.finDate.toDate()).toLocaleString()
                    });
                    setIsLoading(false)
                    console.log(newBon.traite)
                    setIsLoading(false)
                })
            })
            setChecked(!checked)
            console.log('update success')
        } catch (error) {
            console.log(error)
        }
    }

    // const traitement = (id) => {
    //     try {
    //         setIsLoading(true)
    //         getDoc(doc(db, 'bon', idDetail)).then(inter =>{
    //             const newBon = inter.data()
    //             console.log(newBon)
    //             setBon({...newBon, traite: !route.params.bon.traite});
    //             setIsLoading(false)
    //             updateDoc(doc(db, 'bon', id), {
    //                 traite: !route.params.bon.traite
    //             })
    //         })
    //     } catch (error) {
    //         console.log("erreur", error)
    //     }
    // }



    useEffect(() => {
        getDoc(doc(db, 'bon', idDetail)).then(inter => {
            const newBon = inter.data()
            console.log(inter.data().debuDate)
            setBon({
                id: idDetail, ...newBon,
                debutDate: new Date(newBon.debutDate.toDate()).toLocaleString(),
                finDate: new Date(newBon.finDate.toDate()).toLocaleString(),
            });
            setIsLoading(false)
            // console.log(newBon.traite)
        }).catch(error => {
            console.log('Promise error: ', error)
        })
    }, [])

    // useEffect(()=>{
    //     setIsLoading(true)
    //     getDoc(doc(db, 'bon', idDetail)).then(inter =>{
    //         const newBon = inter.data()
    //         console.log(inter.data())
    //         setBon({...newBon});
    //         setIsLoading(false)
    //         console.log(newBon.traite)
    //         setIsLoading(false)
    //     }) 
    // }, [checked])
    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/reseauBg1.jpg')}
            resizeMode="stretch"
        >
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='green' />
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 24 }}>Loading...</Text>
                </View>

            ) : (
                <>
                    <Text style={styles.title}>{bon.depart} - <Text style={{ color: "green" }}>{bon.debutDate}</Text> </Text>
                    <ScrollView style={styles.details}>
                        <Text style={styles.label}>Date début:</Text>
                        <Text style={styles.detail}>{bon.debutDate}</Text>
                        <Text style={styles.label}>Date Fin:</Text>
                        <Text style={styles.detail}>{bon.finDate}</Text>
                        <Text style={styles.label}>Système:</Text>
                        <Text style={styles.detail}>{bon.systeme}</Text>
                        <Text style={styles.label}>Nature interruption:</Text>
                        <Text style={styles.detail}>{bon.natureInter}</Text>
                        <Text style={styles.label}>Groupe cause:</Text>
                        <Text style={styles.detail}>{bon.groupeCause}</Text>
                        <Text style={styles.label}>Cause interruption:</Text>
                        <Text style={styles.detail}>{bon.causeInter}</Text>
                        <Text style={styles.label}>Observation:</Text>
                        <Text style={styles.detail}>{bon.observation}</Text>
                        <Text style={styles.label}>Lieu interruption:</Text>
                        <Text style={styles.detail}>{bon.lieuInter}</Text>
                        <Text style={styles.label}>Tronçon:</Text>
                        <Text style={styles.detail}>{bon.troncon}</Text>
                        <Text style={styles.label}>Groupe siège:</Text>
                        <Text style={styles.detail}>{bon.groupeSiege}</Text>
                        <Text style={styles.label}>Siège:</Text>
                        <Text style={styles.detail}>{bon.siege}</Text>
                        <View style={styles.checkbox}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Traité: </Text>
                            <TouchableOpacity style={bon.traite === true ? styles.touchable : styles.touchableCheck} onPress={() => traitement(idDetail)}>
                                <Text style={styles.checked}>{bon.traite === true ? "✓" : null}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 20, width: '80%', alignSelf: 'center' }}>
                        <Pressable
                            onPress={() => console.log("modifier")}
                            style={[styles.pressable, { backgroundColor: 'blue' }]}
                        >
                            <Text style={{ color: 'white' }}>Modifier</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => HandleDeleteBon(bon.id)}
                            style={styles.pressable}
                        >
                            <Text style={{ color: 'white' }}>Delete</Text>
                        </Pressable>
                    </View>

                </>
            )}
        </ImageBackground>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: 'lightgrey'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
        color: 'white'
    },
    details: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingHorizontal: 4
    },
    detail: {
        fontSize: 14,
        marginBottom: 10,

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'blue'
    },
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    touchable: {
        width: 50,
        height: 25,
        borderWidth: 1,
        borderBlockColor: 'black',
        borderRadius: 3,
        alignItems: 'center',
        backgroundColor: 'green'
    },
    touchableCheck: {
        width: 50,
        height: 25,
        borderWidth: 1,
        borderBlockColor: 'black',
        borderRadius: 3,
        alignItems: 'center',
        padding: 2,
        marginLeft: 4
    },
    checked: {
        fontSize: 15,
        textAlignVertical: "center",
        color: 'white'
    },
    pressable: {
        width: 100,
        backgroundColor: 'crimson',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 5
    }
})