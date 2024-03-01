import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ListDeparts from "./components/ListDeparts";
import LoginScreen from "./screens/LoginScreen";
import InterruptionForm from "./components/InterruptionForm";
import MenuScreen from "./screens/MenuScreen";

const Stack = createNativeStackNavigator();


export default function App() {
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Accueil" component={MenuScreen}/>
                {/* <Stack.Screen name="Departs" component={ListDeparts}/>
                <Stack.Screen name="Formulaire Bon" component={InterruptionForm}
                    options={({route})=>({title: `Bon du ${route.params.depart.item}`})}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>

    )
}

