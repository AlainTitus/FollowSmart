import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import PressComponent from "../../utils/PressComponent";
import { useState } from "react";
import SmallPress from "../../utils/SmallPress";

export default function Supports({ navigation }) {

    const [visibleSupport, setVisibleSupport] = useState(false);
    const [visibleProtectDerivation, setVisibleProtectDerivation] = useState(false)
    const [visibleVegetation, setVisibleVegetation] = useState(false)

    const HandleSupports = () => {
        navigation.navigate('Main support')
    }
    return (
        <ScrollView
            style={styles.container}
        >
            <PressComponent
                textPressable="Maintenance supports"
                colorLabel='#fff'
                HandlePress={HandleSupports}
                colorIn='#3498DB'
                positionLabel='center'
                bgColor="#154360"
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
                textPressable="Maintenance armements"
                HandlePress={() => { }}
                colorLabel='#fff'
                colorIn='#3498DB'
                positionLabel='center'
                bgColor="#154360"
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
                textPressable="Protection derivation"
                HandlePress={() => { }}
                margin={5}
                colorLabel='#fff'
                colorIn='#3498DB'
                positionLabel='center'
                bgColor="#154360"
                borderColor="white"
                bordRadius={10}
                width="100%"
                textSize={22}
                elevation={5}
                padding={5}
                fontFam='Pacifico-Regular'
                weightText='bold'
                borderWidth={1}
            />
            <PressComponent
                textPressable="Entretien corridors"
                HandlePress={() => { }}
                margin={5}
                colorLabel='#fff'
                colorIn='#3498DB'
                positionLabel='center'
                bgColor="#154360"
                borderColor="white"
                bordRadius={10}
                width="100%"
                textSize={22}
                elevation={5}
                padding={5}
                fontFam='Pacifico-Regular'
                weightText='bold'
                borderWidth={1}
            />
            <View style={styles.switchContainer}>
                <Text style={styles.labelSwitch}>Stat supports</Text>
                <Switch
                    value={visibleSupport}
                    onValueChange={() => setVisibleSupport(prev => !prev)}
                    trackColor={{ false: '#AAB7B8', true: '#154360' }}
                    thumbColor='#AAB7B8'
                />
            </View>
            {
                visibleSupport ? (
                    <View style={styles.statSupport}>
                        <Text>Statistiques sur les supports remplacés</Text>
                    </View>
                ) : null
            }

            <View style={styles.switchContainer}>
                <Text style={styles.labelSwitch}>Stat protection dérivation</Text>
                <Switch
                    value={visibleProtectDerivation}
                    onValueChange={() => setVisibleProtectDerivation(prev => !prev)}
                    trackColor={{ false: '#AAB7B8', true: '#154360' }}
                    thumbColor='#AAB7B8'
                />
            </View>
            {
                visibleProtectDerivation ? (
                    <View style={styles.statSupport}>
                        <Text>Statistiques sur la protection des dérivations</Text>
                    </View>
                ) : null
            }
            <View style={styles.switchContainer}>
                <Text style={styles.labelSwitch}>Stat végétation</Text>
                <Switch
                    value={visibleVegetation}
                    onValueChange={() => setVisibleVegetation(prev => !prev)}
                    trackColor={{ false: '#AAB7B8', true: '#154360' }}
                    thumbColor='#AAB7B8'
                />
            </View>
            {
                visibleVegetation ? (
                    <View style={styles.statSupport}>
                        <Text>Statistiques sur l'entretien des corridors</Text>
                    </View>
                ) : null
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 8
    },
    switchContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
        marginTop: 5
    },
    labelSwitch: {
        color: '#5D6D7E',
        fontWeight: 'bold'
    },
    statSupport: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})