import { Text, View, StyleSheet, Pressable, Button, SafeAreaView, FlatList, Linking, TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";


export default function HomeScreen({navigation}) {
    FontAwesome.loadFont();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Piyasa</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        color: '#e63946'
    }

});