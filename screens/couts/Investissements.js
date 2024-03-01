import { View, Text, StyleSheet, ImageBackground } from "react-native";

export default function Investissements(){
    return(
        <ImageBackground
        source={require('../../assets/reportBg2.jpg')}
        style={styles.container}
        >
            <Text style={styles.title}>Investissement</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 10
    }
})