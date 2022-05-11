import React, { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import LoginScreen from "./screens/LoginScreen"
import SignUpScreen from "./screens/SignUpScreen"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Pressable,
    View,
    Alert,
    Text,
    LogBox
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logOut, appointInfo } from "./redux/actions/loginActions";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const Router = ({ }) => {
    const { width, height } = Dimensions.get("window")
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin)

    async function getLogged() {
        const number = await AsyncStorage.getItem('number')
        if (number) {
            const user = (await firestore().collection('users').doc(number).get()).data();
            dispatch(login({isLogin:true,name:user.name,uid:user.uid,number:user.number, favorites: user.favorites}))
        } else {
            dispatch(logOut({ isLogin: false }))
        }
    }

    useEffect(function () {
        getLogged()
    }, [])

    function HomeStack() {
        return (
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen component={HomeScreen} name="Piyasa" />
            </Stack.Navigator>
        );
    }
    function FavoritesStack() {
        return (
            <Stack.Navigator initialRouteName="FavoritesScreen">
                <Stack.Screen component={FavoritesScreen} name="Favorites" />
            </Stack.Navigator>
        );
    }
    function ProfileStack() {
        return (
            <Stack.Navigator initialRouteName="ProfileScreen">
                <Stack.Screen component={ProfileScreen} name="Profile" />
            </Stack.Navigator>
        );
    }

    function LoginStack() {
        return (
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen component={LoginScreen} name="Login" options={{ headerShown: false }} />
                <Stack.Screen component={SignUpScreen} name="SignUpScreen" options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }

    function TabNavigator() {
        return (
            <Tab.Navigator
                initialRouteName="HomeStack"
                activeColor={'#000'}
                inactiveColor={'grey'}
                barStyle={{ backgroundColor: '#fff' }}>
                {isLogin === false ?
                    <>
                        <Tab.Screen name="Anasayfa" component={HomeStack}
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <FontAwesome name="home" color={color} size={20} />
                                ),
                            }}
                        />
                        <Tab.Screen name="Favoriler" component={FavoritesStack}
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <FontAwesome name="heart" color={color} size={20} />
                                ),
                            }}
                        />
                        <Tab.Screen name="Giriş" component={LoginStack}
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <FontAwesome name="user" color={color} size={20} />
                                ),
                            }}
                        />
                    </>
                    :
                    <>
                        <Tab.Screen name="Anasayfa" component={HomeStack}
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <FontAwesome name="home" color={color} size={20} />
                                ),
                            }}
                        />
                        <Tab.Screen name="Favoriler" component={FavoritesStack}
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <FontAwesome name="heart" color={color} size={20} />
                                ),
                            }}
                        />
                        <Tab.Screen name="Profil" component={ProfileStack}
                            options={{
                                tabBarIcon: ({ color }) => (
                                    <FontAwesome name="user" color={color} size={20} />
                                ),
                            }}
                        />


                    </>
                }
            </Tab.Navigator>
        )

    }

    return (
        <NavigationContainer>
            {isLogin === null ? null : <TabNavigator />}
        </NavigationContainer>
    );
}
export default Router;