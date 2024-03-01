import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerStyle: {
          backgroundColor: "purple"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerRight: () => (
          <Pressable onPress={() => alert("Menu button pressed")}>
            <Text style={{ color: "white", fontSize: 16 }}>Menu</Text>
          </Pressable>
        ),
        contentStyle: {
          backgroundColor: '#e8e4f3'
        }
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: "Welcome Home",
        }} />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          initialParams={{
            name: "invité"
          }}
          // options={({route}) => ({
          //   title: route.params.name
          // })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}