import { View, Pressable, Text, StyleSheet, StatusBar, Image } from "react-native";
import { useFonts } from "expo-font";


export default function LoginScreen({ navigation }) {

    const [fontsLoader] =useFonts({
        'Bangers-Regular': require('../assets/fonts/Bangers-Regular.ttf'),
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
    })

    if(!fontsLoader){
        return undefined
    }

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <Image source={require('../assets/logo2.jpg')} style={styles.logo} />
                </View>
                <Text style={[styles.textTitle, {fontFamily:'Pacifico-Regular'}]}>The new way for to follow reporting</Text>
                <Pressable style={styles.pressable} onPress={() => navigation.navigate('Accueil')}>
                    <Text style={[styles.textPressable, {fontFamily: 'Pacifico-Regular'}]}>Let's Go</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "black",
        paddingHorizontal: 8,
        paddingTop: StatusBar.currentHeight
    },
    textTitle: {
        color: 'white',
        fontSize: 30,
        // fontStyle: 'italic',
        // fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    textPressable: {
        color: 'black',
        // fontWeight: 'bold',
        textAlign: "center",
        fontSize: 24,
        // fontStyle: 'italic'
    },
    pressable: {
        padding: 5,
        borderWidth: 2,
        borderRightColor: 'white',
        borderRadius: 8,
        backgroundColor: 'white',
        width: 300
    },
    logo: {
        width: 300,
        height: 300,
    }

})