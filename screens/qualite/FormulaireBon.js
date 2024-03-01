import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Pressable, Platform } from 'react-native';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from './config';
import DateTime from './DateTime';
import { SelectList } from 'react-native-dropdown-select-list';
import { troncons_dre } from '../../datas/troncon';

export default function FormulaireBon({ route, navigation }) {

    const [selected, setSelected] = useState('');
    const [system, setSystem] = useState('');
    const [nature, setNature] = useState('');
    const [groupCause, setGroupCause] = useState('');
    const [groupSiege, setGroupSiege] = useState('');
    const [causeInterruption, setCauseInterruption] = useState('');
    const [observations, setObservations] = useState('');
    const [lieuInterruption, setLieuInterruption] = useState('');
    const [troncon, setTroncon] = useState("");
    const [siege, setSiege] = useState("");
    const [isDateDebut, setIsDateDebut] = useState("");
    const [isHeureDebut, setIsHeureDebut] = useState("");
    const [isDateFin, setIsDateFin] = useState("");
    const [isHeureFin, setIsHeureFin] = useState("");
    const [bon, setBon] = useState({})
    const [errors, setErrors] = useState("");
    const [listTroncon, setListTroncon] = useState([])

    const systeme = [
        { key: '1', value: 'Distribution' },
        { key: '2', value: 'Transport' },
        { key: '3', value: 'Production' },
    ];

    const natureInterruption = [
        { key: '1', value: 'ID' },
        { key: '2', value: 'IP' },
        { key: '3', value: 'IT' },
        { key: '4', value: 'TPD' },
        { key: '5', value: 'TPP' },
        { key: '6', value: 'TPT' },
    ];

    const groupeCause = [
        { key: '1', value: 'AUTRE' },
        { key: '2', value: 'AVARIE' },
        { key: '3', value: 'DELESTAGE' },
        { key: '4', value: 'DISTRIBUTION TRVX PRGM' },
        { key: '5', value: 'ELAGAGE INSUFFISANT' },
        { key: '6', value: 'PRODUCTION TRVX PRGM' },
    ];

    const groupeSiege = [
        { key: '1', value: 'APPAREILLAGE AERIEN' },
        { key: '2', value: 'AUTRE OCR' },
        { key: '3', value: 'COMPENSATEUR STATIQUES' },
        { key: '4', value: 'DEPART HTA' },
        { key: '5', value: 'LIGNE AERIENNE HTA' },
        { key: '6', value: 'LIGNE SOUTERRAINE HTA' },
        { key: '6', value: 'POSTE CABINE' },
        { key: '6', value: 'POSTE SUR POTEAU' },
        { key: '6', value: 'RAME HTA' },
    ];

    const validateForm = () => {
        let errors = {};

        if (system === "") errors.system = "System is required";
        if (nature === "") errors.nature = "Nature is required";
        if (groupCause === "") errors.groupCause = "Groupe  cause is required";
        if (causeInterruption === "") errors.causeInterruption = "Cause interruption is required";
        if (observations === "") errors.observations = "Observations is required";
        if (lieuInterruption === "") errors.lieuInterruption = "Lieu interruption is required";
        if (troncon === "") errors.troncon = "Tronçon is required";
        if (groupSiege === "") errors.groupSiege = "Groupe siège is required";
        if (siege === "") errors.siege = "Siège is required";
        if (isDateDebut === "") errors.isDateDebut = "Date de debut is required";
        if (isHeureDebut === "") errors.isHeureDebut = "Heure de debut is required";
        if (isDateFin === "") errors.isDateFin = "Date de fin is required";
        if (isHeureFin === "") errors.isHeureFin = "Heure de fin is required";

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const HandleSubmit = () => {
        if (validateForm()) {
            let firstDate = isDateDebut + " " + isHeureDebut;
            let endDate = isDateFin + " " + isHeureFin;
            let date1 = new Date(firstDate)
            let date2 = new Date(endDate)
            addDoc(collection(db, "bon"), {
                causeInter: causeInterruption,
                debutDate: date1,
                finDate: date2,
                depart: route.params.depart.item,
                groupeCause: groupCause,
                groupeSiege: groupSiege,
                lieuInter: lieuInterruption,
                natureInter: nature,
                observation: observations,
                siege: siege,
                systeme: system,
                troncon: troncon,
                traite: false
            }).then(() => {
                console.log('data submited')
            }).catch((error) => {
                console.log(error)
            })

            setErrors({})
            setSystem("");
            setNature("");
            setGroupCause("");
            setCauseInterruption("");
            setObservations("");
            setLieuInterruption("");
            setGroupSiege("");
            setSiege("");
            setIsDateDebut("");
            setIsHeureDebut("");
            setIsDateFin("");
            setIsHeureFin("");
            alert("données enregistrées avec succès")
        } else {
            alert("Merci de remplir tous les champs")
        }
    }

    const detectTroncon = (nameDepart) => {
        const allDepart = troncons_dre[0];
        console.log(allDepart[nameDepart])
        const list = allDepart[nameDepart];
        const lengtTroncon = list.length;
        let tab = []
        for(var i = 0; i < lengtTroncon; i++){
            tab.push({key: 1, value: list[i]})
        }
        setListTroncon([...tab])
    }


    useEffect(() => {
        detectTroncon(route.params.depart.item)
    }, [])
    console.log(listTroncon)


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titleForm}> Bon N°</Text>
            <View style={styles.field}>
                <DateTime label="Date debut" dateType='date' placeHolderText='Mon Feb 02 2024' setTime={setIsDateDebut} />
                {errors.isDateDebut ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.isDateDebut}</Text> : null}
            </View>
            <View style={styles.field}>
                <DateTime label="Heure debut" dateType='time' placeHolderText='00:00:00 GMT+0100' setTime={setIsHeureDebut} />
                {errors.isHeureDebut ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.isHeureDebut}</Text> : null}
            </View>
            <View style={styles.field}>
                <DateTime label="Date Fin" dateType='date' placeHolderText='Mon Feb 02 2024' setTime={setIsDateFin} />
                {errors.isDateFin ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.isDateFin}</Text> : null}
            </View>
            <View style={styles.field}>
                <DateTime label="Heure Fin" dateType='time' placeHolderText='00:00:00' setTime={setIsHeureFin} />
                {errors.isHeureFin ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.isHeureFin}</Text> : null}
            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Système:</Text>
                <SelectList
                    setSelected={((val) => setSystem(val))}
                    data={systeme}
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
                {errors.system ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.system}</Text> : null}
            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Nature interruption:</Text>
                <SelectList
                    setSelected={((val) => setNature(val))}
                    data={natureInterruption}
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
                {errors.nature ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.nature}</Text> : null}
            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Groupe cause:</Text>
                <SelectList
                    setSelected={((val) => setGroupCause(val))}
                    data={groupeCause}
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
                {errors.groupCause ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.groupCause}</Text> : null}
            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Cause Interruption:</Text>
                <TextInput style={[styles.inputField]} value={causeInterruption} onChangeText={setCauseInterruption} />
                {errors.causeInterruption ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.causeInterruption}</Text> : null}
            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Observations :</Text>
                <TextInput style={[styles.inputField, styles.textAera]} multiline value={observations} onChangeText={setObservations} />
                {errors.observations ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.observations}</Text> : null}
            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Lieu interruption :</Text>
                <TextInput style={[styles.inputField, styles.textAera]} multiline value={lieuInterruption} onChangeText={setLieuInterruption} />
                {errors.lieuInterruption ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.lieuInterruption}</Text> : null}
            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Tronçon:</Text>

                {listTroncon.length == 0 ? null : (
                    <>
                        <SelectList
                            setSelected={((val) => setTroncon(val))}
                            data={listTroncon}
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
                        {errors.troncon ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.troncon}</Text> : null}
                    </>
                )}

            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Groupe Siège:</Text>
                <SelectList
                    setSelected={((val) => setGroupSiege(val))}
                    data={groupeSiege}
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
                {errors.groupSiege ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.groupSiege}</Text> : null}
            </View>
            <View style={styles.field}>
                <Text style={styles.labelField}>Siège:</Text>
                <TextInput style={[styles.inputField, styles.textAera]} multiline value={siege} onChangeText={setSiege} />
                {errors.siege ? <Text style={{ color: 'red', fontSize: 12 }}>{errors.siege}</Text> : null}
            </View>
            <View style={styles.validationForm}>
                <Button title='Enregister' onPress={HandleSubmit} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e7e9'
    },
    titleForm: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
        color: 'green'
    },
    field: {
        marginHorizontal: 8,
        marginVertical: 5
    },
    labelField: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    inputField: {
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        padding: 6,
        borderColor: 'green',
        backgroundColor: 'white'
    },
    textAera: {
        height: 100,
        textAlignVertical: 'top'
    },
    validationForm: {
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 20
    },
    pressable: {
        color: 'white',
        width: 100
    }
})