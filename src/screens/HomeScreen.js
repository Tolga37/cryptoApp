import { Text, View, StyleSheet, Pressable, Dimensions, Button, SafeAreaView, FlatList, Linking, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { login, logOut, appointInfo } from "../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");
export default function HomeScreen({ navigation }) {
    FontAwesome.loadFont();
    const [data, setData] = useState()
    const [moneyKey, setMoneyKey] = useState()
    const [refresh, setRefresh] = useState(true)
    const [newData, setNewData] = useState()
    const [firebasedata, setFirebaseData] = useState([])
    const number = useSelector((state) => state.login.number)
    const favorites = useSelector((state) => state.login.favorites)
    const dispatch = useDispatch();
    
    const isFocused = useIsFocused();

    const config = {
        headers: {
            apikey: "EaI1FFHCRfJLVPiOnC4zCD4oX3DRPY9y" // ZoSa5lGLkMJmgvFOSbRQ85TQ8p6yk4Rh
        }
    }

    const url = "https://api.apilayer.com/exchangerates_data/latest?symbols=TRY,EUR,BTC,AMD&base=TRY"
    const getData = async () => {
        await axios.get(url, config)
            .then(async (res) => {
                await setData(res.data)
                console.log("Gelen", JSON.stringify(res, null, 4))
                //  const moneyValue = Object.values(res.data.rates)
                //  const moneyKeys = Object.keys(res.data.rates)
                // console.log("MoneyValue", moneyValue)
                // console.log("MoneyKeys", moneyKeys)

                //    "data": { apiden gelen veririn "data" kısmı
                //     "success": true,
                //     "timestamp": 1652282703,
                //     "base": "USD",
                //     "date": "2022-05-11",
                //     "rates": {
                //         "TRY": 15.309034,
                //         "EUR": 0.94846,
                //         "BTC": 0.000031938126
                //     }

                const entries = Object.entries(res.data.rates);
                console.log("yeni data", entries)
                setNewData(entries)
                // setMoneyKey(moneyKeys)
                //  setMoneyVal(moneyValue)
            }
            )
            .catch((e) => {
                console.log("errorrr", e)
            }
            )
    }

    useEffect(() => {
        isFocused && getData()
    }, [isFocused])

    const setFirebase = async (data) => {
        let temp = favorites
        temp[data] = temp[data] ? !temp[data] : true
        await firestore()
            .collection('users')
            .doc(number)
            .update({
                favorites: temp //[`${data}`]
                // value: value
            })
            .then(() => {
                dispatch(login({ favorites: temp }))
                setRefresh(!refresh)
            })
            .catch((e) => {
                console.log("ERROR:", e)
            })
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.moneyView} >
            <Text style={styles.itemStyle}>{item[0]}         {item[1]} </Text>
            <FontAwesome name={favorites[item[0]] ? 'heart' : 'heart-o'} size={25} color="red" onPress={() => setFirebase(item[0])} />
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>

            {moneyKey !== null ?
                <FlatList
                    data={newData}
                    renderItem={renderItem}
                    keyExtractor={index => index.toString()}
                    extraData={refresh}
                />
                :
                <Text style={styles.title}>Piyasa</Text>
            }

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

    },
    moneyView: {
        borderWidth: 1,
        padding: 10,
        margin: 5,
        width: width / 1.05,
        height: height / 15,
        // justifyContent:"center",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    itemStyle: {
        fontSize: 20
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