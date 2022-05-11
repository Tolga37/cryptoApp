import { Text, View, StyleSheet, Pressable, Button, SafeAreaView, FlatList, Linking, TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { login, logOut, appointInfo } from "../redux/actions/loginActions";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    FontAwesome.loadFont();
    const dispatch = useDispatch();
    const state = useSelector((state) => state)
  
    const { isLogin, name, information, day, time } = state.login
    const logout = () => {
        AsyncStorage.removeItem('number')
        dispatch(logOut({ isLogin: false }))
        console.log("Çıkış Yapıldı")
      }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            <Button
            title="ÇIKIŞ YAP"
            onPress={() => logout()} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
    },
    title: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
 
    }

});