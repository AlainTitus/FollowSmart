import { View, Text, StyleSheet, StatusBar, Pressable, FlatList } from 'react-native';
import listDeparts from '../../datas/departs.json';

export default function ListDeparts({ navigation }) {
    const listes = listDeparts[0].departs;
    return (
        <View style={styles.container}>

            <FlatList
                data={listes}
                renderItem={({ item }) => {
                    return (
                        <Pressable style={styles.pressableElement} onPress={() => navigation.navigate("Formulaire", {
                            depart: { item }
                        })}>
                            <Text style={styles.pressableText}>{item}</Text>
                        </Pressable>
                    )
                }}
                ListHeaderComponent={<Text style={styles.titleForm}>Début de la liste</Text>}
                ListFooterComponent={<Text style={styles.titleForm}>Fin de la liste</Text>}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
        backgroundColor: "#f5f5f5"
    },
    titleForm: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10
    },
    pressableElement: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 60,
        // borderWidth: 1,
        shadowColor: "grey",
        elevation: 2,
        borderRadius: 5,
        margin: 5,
        justifyContent: "center"
    },
    pressableText: {
        fontSize: 18
    },
    pressable: {
        color: 'white',
        width: 100
    },
    titleForm: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
        color: 'green'
    }
})