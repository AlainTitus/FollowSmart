import { View, Button, Text, StatusBar, StyleSheet, Pressable } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Menus from './menu/MenuScreen';
import Quality from './qualite/QualityScreen';
import Transformateurs from './transformateurs/Transformateurs';
import Supports from './supports/Supports';
import Investissements from './couts/Investissements';
import MainScreenSupport from './supports/maintenanceSupport/MainScreenSupport';

const Drawer = createDrawerNavigator()

export default function MenuScreen() {

    return (
 
            <Drawer.Navigator screenOptions={{
              
            }}>
                <Drawer.Screen name="Menus" component={Menus}/>
                <Drawer.Screen name="Qualité service" component={Quality}
                options={{
                    headerShown: false
                }}
                />
                <Drawer.Screen name="Transformateur" component={Transformateurs}/>
                <Drawer.Screen name="Supports" component={MainScreenSupport}/>
                <Drawer.Screen name="Investissements" component={Investissements}/>
            </Drawer.Navigator>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 8
    },
    textMain: {
        color: 'white',
        fontSize: 16,
        marginBottom: 16,
        letterSpacing: 1,
        lineHeight: 24,
        fontFamily: 'serif'
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
        fontSize: 30,
        fontWeight: 'bold'
    },
    pressable: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 20,
    },
    viewPressable: {
        alignItems: 'center',
        padding: 10,
        marginTop: 20
    }
})