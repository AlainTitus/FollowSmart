import { View, Text, StyleSheet, StatusBar, Pressable, Button, ImageBackground } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator()

export default function MainQualityScreen({navigation}){
    return(
        <ImageBackground
            style={styles.container}
            source={require('../../assets/reseauBg1.jpg')}
            resizeMode="stretch"
        >
            <Pressable style={styles.pressable} onPress={()=> navigation.navigate('Liste des départs')}>
                <Text style={styles.textPressable}>Saisie des bons</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={()=> navigation.navigate('Liste des bons')}>
                <Text style={styles.textPressable}>Liste des bons</Text>
            </Pressable>
            <Pressable style={styles.pressable}>
                <Text style={styles.textPressable}>Analyse des bons</Text>
            </Pressable>
            <View style={{marginTop: 20}}>
              <Button title="retour"  onPress={()=>navigation.toggleDrawer()}/>  
            </View>
            
        </ImageBackground>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        // justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'black'
    },
    pressable:{
        // borderEndColor: "black",
        // borderWidth: 2,
        padding: 8,
        borderRadius: 5,
        elevation: 5,
        height: 50,
        marginVertical: 7,
        backgroundColor: 'white'
    },
    textPressable: {
        fontSize: 24,
        textAlignVertical: 'center'
    }
})