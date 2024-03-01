import { View, Button, Text, StatusBar, StyleSheet, Pressable, ImageBackground, Platform } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';



const Drawer = createDrawerNavigator()

export default function Menus({navigation}) {
    const [fontsLoader] =useFonts({
        'Bangers-Regular': require('../../assets/fonts/Bangers-Regular.ttf'),
        'Pacifico-Regular': require('../../assets/fonts/Pacifico-Regular.ttf'),
        'CrimsonText-Regular': require('../../assets/fonts/CrimsonText-Regular.ttf'),
        'CrimsonText-Italic': require('../../assets/fonts/CrimsonText-Italic.ttf'),
        'DancingScript-VariableFont_wght': require('../../assets/fonts/DancingScript-VariableFont_wght.ttf'),
    })

    if(!fontsLoader){
        return undefined
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/reseauBg1.jpg')}
            resizeMode='stretch'
        >
            <View>
                <Text style={[styles.textMain, {fontFamily: 'DancingScript-VariableFont_wght'}]}>Faciliter le reporting pour l'évaluation des principaux KPI et procéder à leur analyse rapide en temps réel est notre objectif. Un pilotage optimal qui intègre l'approche DMAIC dans toutes les actions et s'appuie sur un levier essentiel : l'<Text style={styles.ebibda}>EBIPDA</Text></Text>
                <Text style={[styles.text, {fontFamily: 'Pacifico-Regular'}]}>- Qualité de service</Text>
                <Text style={[styles.text, {fontFamily: 'Pacifico-Regular'}]}>- Suivi des transformateurs</Text>
                <Text style={[styles.text, {fontFamily: 'Pacifico-Regular'}]}>- Suivi des supports</Text>
                <Text style={[styles.text, {fontFamily: 'Pacifico-Regular'}]}>- Analyse des investissements</Text>
                <View style={styles.viewPressable}>
                    <Pressable style={styles.pressable} onPress={()=> navigation.toggleDrawer()}>
                        <Text style={[styles.buttonGo, {fontFamily: 'Pacifico-Regular'}]}>Open Menu</Text>
                    </Pressable>
                </View>
                <View style={styles.viewPressable}>
                    <Pressable style={styles.pressable} onPress={()=> navigation.navigate("Login")}>
                        <Text style={[styles.buttonGo, {fontFamily: 'Pacifico-Regular'}]}>Go Back</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10
    },
    textMain: {
        color: 'white',
        fontSize: 20,
        marginBottom: 16,
        letterSpacing: 1,
        lineHeight: 24,
    },
    text:{
        color: 'white',
        fontSize: 18,
        marginVertical: 3,
        fontFamily: 'serif'
    },
    ebibda: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },
    buttonGo: {
        color:"black",
        fontSize: 20,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    pressable: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
        marginHorizontal: 10
    },
    viewPressable: {
        // alignItems: 'center',
        padding: 10,
        marginTop: 5
    }
})