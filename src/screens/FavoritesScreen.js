import { Text, View, StyleSheet, Pressable, Dimensions, Button, SafeAreaView, FlatList, Linking, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { login, logOut, appointInfo } from "../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
    FontAwesome.loadFont();

    const isFocused = useIsFocused();
    const [data, setData] = useState(null)
    const [newData, setNewData] = useState(null)
    const [refresh, setRefresh] = useState(true)
    const number = useSelector((state) => state.login.number)
    const favorites = useSelector((state) => state.login.favorites)
    const dispatch = useDispatch();

    const getData = async () => {
        const ret =  Object.entries(favorites).filter(([key, value])=> value === true);

        const url = 'https://api.apilayer.com/exchangerates_data/latest?symbols=' + ret.toString() + '&base=TRY';
        const config = {
            headers: {
                apikey: "EaI1FFHCRfJLVPiOnC4zCD4oX3DRPY9y" // ZoSa5lGLkMJmgvFOSbRQ85TQ8p6yk4Rh
            }
        }

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


    useEffect(() => {
        if (isFocused) {
            getData()
        } else {
            setData(null)
            setNewData(null)
        }
    }, [isFocused, refresh])

    return (
        <SafeAreaView style={styles.container}>
            {newData &&
                <FlatList
                    data={newData}
                    renderItem={renderItem}
                    keyExtractor={index => index.toString()}
                    extraData={refresh}
                />}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
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