import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { doc, setDoc, collection, getDocs, where, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from './config';
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import DateTime from './DateTime';

export default function ListBons({ navigation }) {

    const [datas, setDatas] = useState([])
    const [debut, setDebut] = useState(new Date());
    const [fin, setFin] = useState(new Date());
    const [recherche, setRecherche] = useState(false)
    const [bgColor, setBgColor] = useState('white')
    const [isError, setIsError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [noData, setNoData] = useState(false)

    console.log(new Date(debut).getTime())
    console.log(new Date(fin))

    const bonref = collection(db, 'bon')
    const req1 = query(bonref, 
        where('debutDate', '>=', new Date(debut)),
        where('debutDate', '<=', new Date(fin)),
        orderBy('debutDate', 'desc')
        );
    const req2 = query(bonref, orderBy('debutDate', 'desc'));

    const validaterange = () => {
        if (debut == "" || fin == "") {
            Alert.alert('Attention!', "Remplir les dates de début et de fin")
            return;
        }
        const timeDebut = new Date(debut).getTime();
        const timefin = new Date(fin).getTime();
        if (timeDebut <= timefin) {
            try {
                onSnapshot(req1, (snapshot) => {
                    let newList = [];
                    if (snapshot.docs.length == 0) {
                        setNoData(true)
                    } else {
                        snapshot.docs.forEach((doc) => {
                            newList.push({ id: doc.id, ...doc.data(), debutDate: new Date(doc.data().debutDate.toDate()).toLocaleString() })
                        })
                        setDatas([...newList])
                        setNoData(false)
                        console.log(newList)
                    }

                })

            } catch (error) {
                console.log("try error: ", error)
            }
        } else {
            Alert.alert('Attention!', 'Date de début supérieure à la date de Fin.')
        }
    }


    const getAllDatas = () => {
        try {
            onSnapshot(req2, (snapshot) => {
                let newList = [];
                if (snapshot.docs.length == 0) {
                    setNoData(true)
                } else {
                    snapshot.docs.forEach((doc) => {
                        newList.push({ id: doc.id, ...doc.data(), debutDate: new Date(doc.data().debutDate.toDate()).toLocaleString() })
                    })
                    setDatas([...newList])
                    setNoData(false)
                }

            })
        } catch (error) {
            console.log('ba:', error)
            setIsError(true)
        }
    }

    useEffect(() => {
        getAllDatas()
    }, [])

    const HandleRecherche = ()=>{
        let toggle = recherche
        setRecherche(!toggle);
        getAllDatas()
    }

    const onRefresh = () => {
        // setRefreshing(true);

        // try {
        //     getDocs(collection(db, 'bon')).then((datas) => {
        //         let newList = []
        //         if (datas) {

        //             datas.forEach(doc => {
        //                 // console.log("succès")
        //                 const interruption = { id: doc.id, ...doc.data() }
        //                 // console.log(doc.id)
        //                 newList.push(interruption)
        //                 setBgColor('grey')
        //             })
        //         } else {
        //             console.log('bad')
        //         }

        //         // console.log(newList)
        //         setDatas(newList);
        //     }).catch((error) => {
        //         console.log(error)
        //         setIsError(true)
        //     })
        // } catch (error) {
        //     console.log('bad:', error)
        //     setIsError(true)
        // }

        // setRefreshing(false)
 
    }

    return (
        <ImageBackground
            style={[styles.container, { backgroundColor: bgColor }]}
            source={require('../../assets/reseauBg1.jpg')}
            resizeMode="stretch"
        >
            <Text style={styles.title}>Par départ</Text>
            {isError ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 24 }}>Problème dans l'acquisiton des données. Vérifier votre connection!</Text>
                </View>
            ) : (
                datas.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size={"large"} color='green' />
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 24 }}>Loading...</Text>
                    </View>

                ) : (
                    <>
                        <View>
                            <TouchableOpacity
                                style={styles.touchable}
                                onPress={HandleRecherche}
                            >
                                <Text style={styles.textTouchable}> {recherche ? "Annuler la recherche" : "Recherche par la date"}</Text>
                            </TouchableOpacity>

                            {recherche ? (
                                <View style={{ backgroundColor: 'white', padding: 5, marginBottom: 30 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', columnGap: 8, marginBottom: 10, marginTop: 10, backgroundColor: 'white' }}>
                                        <View style={styles.input}>
                                            <DateTime label="Date debut" dateType='date' placeHolderText='Date début' setTime={setDebut} />
                                        </View>
                                        <View style={styles.input}>
                                            <DateTime label="Date Fin" dateType='date' placeHolderText='date fin' setTime={setFin} />
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                                        <TouchableOpacity
                                            style={styles.touchableValidate}
                                            onPress={validaterange}
                                        >
                                            <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}> Valider </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            ) : null}
                        </View>

                        {
                            noData ? (
                                <View style={{backgroundColor: 'white', padding: 5}}>
                                    <Text style={{fontSize: 20, color: 'crimson', fontStyle: 'italic'}}>Aucun bon correspondant à cette plage de date</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={datas}
                                    renderItem={({ item }) => {
                                        return (
                                            <Pressable
                                                style={item.natureInter === 'ID' ? styles.elementListID : styles.elementList}
                                                onPress={() => navigation.navigate('Details', {
                                                    bon: { ...item }
                                                })}
                                                key={item.id}
                                            >
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={styles.textElement}>{item.depart} </Text>
                                                    <Text style={styles.traite}>{item.traite ? "(traité)" : null}</Text>
                                                </View>

                                                <View style={styles.description}>
                                                    <Text style={styles.date}>{item.debutDate}</Text>
                                                    <Text style={styles.nature}>{item.natureInter}</Text>
                                                </View>
                                            </Pressable>
                                        )
                                    }}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                            colors={['green']}
                                        />
                                    }
                                />
                            )
                        }

                    </>

                )

            )}

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        // backgroundColor: 'grey',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        marginTop: 10
    },
    elementList: {
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 5,
        padding: 5
    },
    elementListID: {
        backgroundColor: 'pink',
        marginVertical: 5,
        borderRadius: 5,
        padding: 5
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textElement: {
        fontWeight: 'bold',
        fontSize: 20
    },
    date: {
        fontStyle: 'italic'
    },
    traite: {
        color: 'green',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    input: {
        width: '45%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
    },
    touchable: {
        backgroundColor: 'blue',
        padding: 5
    },
    textTouchable: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    touchableValidate: {
        backgroundColor: 'green',
        padding: 5,
        width: '50%',
        elevation: 5,
        borderRadius: 5
    }
})

