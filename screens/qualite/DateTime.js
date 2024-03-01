import { View, Text, TextInput, StyleSheet, ScrollView, Button, Pressable, Platform } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateTime({label, dateType, placeHolderText, setTime}){

    const [date, setDate] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [moment, setMoment] = useState(new Date());
    

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    };

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currenDate = selectedDate;
            console.log(currenDate)
            setMoment(currenDate)
            if(Platform.OS === "android" && dateType == "time"){
                toggleDatepicker();
                setDate(currenDate.toTimeString());
                setTime(currenDate.toTimeString())
            }
            if(Platform.OS === "android" && dateType == "date"){
                toggleDatepicker();
                setDate(currenDate.toDateString());
                setTime(currenDate.toDateString())
            }
        } else {
            toggleDatepicker()
            setTime("")
        }
    }

    return (
        <>
                <Text style={styles.labelField}>{label}:</Text>
                {showPicker && (
                    <DateTimePicker
                        mode={dateType}
                        // display='spinner'
                        value={moment}
                        onChange={onChange}
                        maximumDate={new Date()}
                        minimumDate={new Date('2024-1-1')}
                    />)}
                
                    <Pressable
                        onPress={toggleDatepicker}
                    >
                        <TextInput
                            style={styles.inputField}
                            placeholder= {placeHolderText}
                            placeholderTextColor="#d5dbdb"
                            value={date}
                            onChange={setDate}
                            // is24Hour={true}
                            editable={false}
                        />
                    </Pressable>
                

            </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e7e9'
    },
    titleForm: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
        color: 'green'
    },
    field: {
        marginHorizontal: 8,
        marginVertical: 5
    },
    labelField: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    inputField: {
        height: 45,
        color: "black",
        borderWidth: 1,
        borderRadius: 8,
        padding: 6,
        borderColor: 'green',
        backgroundColor: 'white'
    },
    textAera: {
        height: 100,
        textAlignVertical: 'top'
    },
    validationForm: {
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 20
    }
})