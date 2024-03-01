import { View, Text } from "react-native";

export default function Greet ({nom}){
    return(
        <View>
            <Text> Bonjour {nom}</Text>
        </View>
    )
}