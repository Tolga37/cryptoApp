import React from "react";
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { color } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from "../../constants";
Icon.loadFont();
export default function Checbox({
    checked,
    checkedColor,
    style,
    onChangeState
}) {
    return(
        <TouchableOpacity
         onPress={() =>onChangeState && onChangeState(!checked)} 
         style={[styles.container , {...style}]} >
            {checked && (
                <Icon name="check" color={checked ? checkedColor : colors.cFFFFFF}
                size={20}
                 />
            )}
            
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor: colors.white[100],
        borderRadius:5,
        width:25,
        height:25,
        justifyContent:"center",
        alignItems:"center"
    }
})