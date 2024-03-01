import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainQualityScreen from "./MainQualityScreen";
import ListDeparts from "./ListDeparts";
import FormulaireBon from "./FormulaireBon";
import ListBons from "./ListBons";
import DetailsBon from "./DetailsBon";

const Stack = createNativeStackNavigator()

export default function Quality(){
    return(

            <Stack.Navigator
                // screenOptions={{
                //     headerShown: false
                // }}
            >
                <Stack.Screen name="Qualité de service" component={MainQualityScreen}/>
                <Stack.Screen name="Liste des départs" component={ListDeparts} />
                <Stack.Screen name="Formulaire" component={FormulaireBon}/>
                <Stack.Screen name="Liste des bons" component={ListBons}/>
                <Stack.Screen name="Details" component={DetailsBon}/>
            </Stack.Navigator>
 
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        // justifyContent: 'center'
        paddingTop: StatusBar.currentHeight
    },
    pressable:{
        // borderEndColor: "black",
        // borderWidth: 2,
        padding: 8,
        borderRadius: 5,
        elevation: 5,
        height: 50,
        marginVertical: 7
    },
    textPressable: {
        fontSize: 24,
        textAlignVertical: 'center'
    }
})