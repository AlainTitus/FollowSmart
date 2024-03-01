import { StyleSheet, Text, View, Pressable, FlatList, ImageBackground, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import PressComponent from '../../../utils/PressComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../qualite/config';
import { collection, addDoc, GeoPoint } from 'firebase/firestore';
import SmallPress from '../../../utils/SmallPress';


/**************Debut du composant principal************************/

const HomeMaintenance = ({ navigation }) => {

    const [datasList, setDatasList] = useState([]);
    const [rout, setRout] = useState("")

    const filterList = (tabList) => {
        let routLabel = [];
        let tabLength = tabList.length;
        if (tabLength == 0) {
            return [];
        }
        for (var i = 0; i < tabLength; i++) {
            routLabel.push(tabList[i].routSave)
        };
        const uniqrout = [...new Set(routLabel)]
        let newTabRout = [];
        let countRout = uniqrout.length
        for (var i = 0; i < countRout; i++) {
            const count = routLabel.filter(elm => elm == uniqrout[i]);
            newTabRout.push({
                name: uniqrout[i],
                nbr: count.length
            })
        }

        return newTabRout;
    }

    const HandleRoute = () => {
        navigation.navigate('Route support');
    }
    const HandleMap = () => {
        navigation.navigate('Map support');
    };

    const HandleMenu = () => {
        navigation.navigate('Support screen')
    }

    const getData = () => {
        try {
            AsyncStorage.getItem('routSave')
                .then(value => {
                    if (value != null) {
                        setRout(JSON.parse(value))
                        console.log('value')
                    }
                })
        } catch (error) {
            console.log('Erreur get: ', error)
        }

    }

    const HandleDataMap = () => {
        getData()
        console.log('refresh')
    }

    const HandleDeleteKey = () => {
        let count = rout.length;

        if (count == 0) {
            ToastAndroid.show("Aucune donnée dans le store", ToastAndroid.SHORT)
        } else {
            for (var i = 0; i < count; i++) {
                addDoc(collection(db, "route"), {
                    coorSup: new GeoPoint(rout[i].xSave, rout[i].ySave),
                    nomroute: rout[i].routSave,
                    structure: rout[i].structureSave
                }).then(() => {
                    console.log('data submited')
                }).catch((error) => {
                    console.log(error)
                })
            }

            AsyncStorage.removeItem('routSave');
            setRout('');

        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <View
            source={require('../../../assets/supportBg.jpg')}
            resizeMode="stretch"
            style={styles.container}
        >

            <PressComponent
                textPressable="Créer une route"
                colorIn='#154360'
                HandlePress={HandleRoute}
                positionLabel='center'
                colorLabel="#fff"
                bgColor="#3498DB"
                borderColor="white"
                bordRadius={10}
                width="100%"
                textSize={22}
                elevation={5}
                padding={5}
                margin={5}
                fontFam='Pacifico-Regular'
                weightText='bold'
                borderWidth={1}
            />
            <PressComponent
                textPressable="Visualiser la Map"
                colorIn='#154360'
                HandlePress={HandleMap}
                positionLabel='center'
                colorLabel="#fff"
                bgColor="#3498DB"
                borderColor="white"
                bordRadius={10}
                width="100%"
                textSize={22}
                elevation={5}
                padding={5}
                margin={5}
                fontFam='Pacifico-Regular'
                weightText='bold'
                borderWidth={1}
            />
            <PressComponent
                textPressable="Menu"
                bgColor='#154360'
                borderColor='#fff'
                colorIn='#3498DB'
                HandlePress={HandleMenu}
                positionLabel='center'
                colorLabel="#fff"
                bordRadius={10}
                width="100%"
                textSize={22}
                elevation={5}
                padding={5}
                margin={5}
                fontFam='Pacifico-Regular'
                weightText='bold'
                borderWidth={1}
            />

            <View style={{ backgroundColor: "#fff" }}>
                <View style={styles.refreshView}>
                    <Text style={styles.labelRefresh}>Nouvelle route</Text>
                    <SmallPress
                        textPressable='update'
                        positionLabel='center'
                        colorLabel='#fff'
                        bgColor='#3498DB'
                        borderColor='#3498DB'
                        bordRadius={15}
                        width={80}
                        textSize={14}
                        elevation={5}
                        padding={2}
                        margin={5}
                        HandlePress={HandleDataMap}
                        fontFam='sans-serif'
                        weightText='bold'
                        borderWidth={0}
                    />
                </View>
                <Text style={styles.underline}> </Text>
                <View style={styles.listRoute}>
                    {
                        rout.length == 0 ? (
                            <Text style={{ color: "#fff", fontStyle: 'italic' }}>Toutes les routes ont été synchronisées!</Text>
                        ) : (
                            <>

                                <FlatList
                                    data={filterList(rout)}
                                    renderItem={({ item }) => {
                                        return (
                                            <Pressable style={styles.pressList}>
                                                <Text style={styles.titleRoute}>{item.name}</Text>
                                                <Text style={styles.routeDescription}> <Text style={{ fontWeight: 'bold' }}>NbSup:</Text> {item.nbr}</Text>
                                            </Pressable>
                                        )
                                    }}
                                    keyExtractor={item => item.id}
                                    horizontal
                                />
                            </>

                        )
                    }
                </View>
                {
                    rout.length === 0 ? null : (
                        <>
                            <Text style={styles.underline}> </Text>
                            <View style={styles.refreshView}>
                                <Text style={styles.labelRefresh}>Synchroniser</Text>
                                <SmallPress
                                    textPressable='Sync'
                                    positionLabel='center'
                                    colorLabel='#fff'
                                    bgColor='#3498DB'
                                    borderColor='#3498DB'
                                    bordRadius={15}
                                    width={80}
                                    textSize={14}
                                    elevation={5}
                                    padding={2}
                                    margin={5}
                                    HandlePress={HandleDeleteKey}
                                    fontFam='sans-serif'
                                    weightText='bold'
                                    borderWidth={0}
                                />
                            </View>
                        </>
                    )
                }

                <Text style={styles.underline}> </Text>

                <View style={styles.seachCategory}>
                    <Text style={styles.textSearch}>Recherche par catégorie: </Text>
                    <Text style={styles.underline}> </Text>
                    <View style={styles.smallMenu}>
                        <SmallPress
                            textPressable='type support'
                            positionLabel='center'
                            colorLabel='black'
                            bgColor='#E5E7E9'
                            borderColor='black'
                            bordRadius={15}
                            width={80}
                            textSize={12}
                            elevation={5}
                            padding={2}
                            margin={5}
                        />
                        <SmallPress
                            textPressable='Exploitation'
                            positionLabel='center'
                            colorLabel='black'
                            bgColor='#E5E7E9'
                            borderColor='black'
                            bordRadius={15}
                            width={80}
                            textSize={12}
                            elevation={5}
                            padding={1}
                            margin={5}
                        />
                        <SmallPress
                            textPressable='Maintenance'
                            positionLabel='center'
                            colorLabel='black'
                            bgColor='#E5E7E9'
                            borderColor='black'
                            bordRadius={15}
                            width={80}
                            textSize={12}
                            elevation={5}
                            padding={1}
                            margin={5}
                        />
                        <SmallPress
                            textPressable='Date'
                            positionLabel='center'
                            colorLabel='black'
                            bgColor='#E5E7E9'
                            borderColor='black'
                            bordRadius={15}
                            width={50}
                            textSize={12}
                            elevation={5}
                            padding={1}
                            margin={5}
                        />
                        <SmallPress
                            textPressable='Fiche problème'
                            positionLabel='center'
                            colorLabel='black'
                            bgColor='#E5E7E9'
                            borderColor='black'
                            bordRadius={15}
                            width={100}
                            textSize={12}
                            elevation={5}
                            padding={1}
                            margin={5}
                        />
                    </View>
                </View>
            </View>

        </View>
    )
}

export default HomeMaintenance;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    listRoute: {
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#85929E',
        padding: 5,
        paddingVertical: 10
    },
    pressList: {
        width: 120,
        height: 85,
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 5,
        padding: 5,
        elevation: 5,
        justifyContent: 'space-between'
    },
    titleRoute: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        marginBottom: 7
    },
    routeDescription: {
        fontSize: 12
    },
    refreshView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
        marginTop: 5
    },
    btnRefresh: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    smallMenu: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 8,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    seachCategory: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginVertical: 15,
        paddingVertical: 5
    },
    textSearch: {
        fontWeight: 'bold',
        color: '#5D6D7E'
    },
    underline: {
        borderWidth: 2,
        fontSize: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#E5E7E9'
    },
    labelRefresh: {
        color: '#5D6D7E',
        fontWeight: 'bold'
    }
})