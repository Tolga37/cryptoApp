import { Text, View, StyleSheet, Pressable, Button, SafeAreaView, FlatList, Linking, TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    FontAwesome.loadFont();
const [data,setData] = useState({})
    const config = {
        headers: {
            apikey: "ZoSa5lGLkMJmgvFOSbRQ85TQ8p6yk4Rh"
        }
    }
const url = "https://api.apilayer.com/exchangerates_data/latest?symbols=TRY,EUR&base=USD"
const getData = async () => {
   await axios.get(url, config)
        .then(async(res) => {
           await setData(res.data)
            console.log("Gelen", JSON.stringify(res, null, 4))
            console.log("DATAA",data)
        }
          
        )
        .catch((e) => {
            console.log("errorrr", e)
        }
        )
}
    useEffect(() => {
        getData()
    }, [])
        ;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Piyasa</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    }

});

// const config = {
//     headers: {
//         apikey: "ZoSa5lGLkMJmgvFOSbRQ85TQ8p6yk4Rh"
//     }
// }
// const url = "https://api.apilayer.com/exchangerates_data/latest?symbols=TRY,EUR&base=USD"
// const getData = async () => {
//     const response = await axios.get(url, config)
//         .then(
//             console.log("Gelen", JSON.stringify(response, null, 4))
//         )
//         .catch((e) => {
//             console.log("errorrr", e)
//         }
//         )
// }