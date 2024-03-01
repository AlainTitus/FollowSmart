import { View, Text, StyleSheet, ImageBackground} from "react-native";
import PressComponent from "../../utils/PressComponent";

export default function Transformateurs(){

    const HandlePress = ()=>{
        console.log("PressComponent pressed!")
    }
    return(
        <ImageBackground
            source={require('../../assets/transformerBg1.jpg')}
            resizeMode="cover"
            style={styles.container}
        >
            <PressComponent textPressable="Transformateurs cramés" HandlePress={HandlePress}/>
            <PressComponent textPressable="Protection transformateurs" HandlePress={()=>{}}/>
            <PressComponent textPressable="Inspection transfos" HandlePress={()=>{}}/>
            <PressComponent textPressable="Mesures postes" HandlePress={()=>{}}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    }
})