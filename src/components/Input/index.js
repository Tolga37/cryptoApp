import React, { useState } from "react";
import {View,Text,StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from "../../constants";
IconCommunity.loadFont();
Icon.loadFont();
export default function Input({
    onChangeText,
    value = '',
    isHidden,
    icon,
    placeHolder = '',
    style,
    color,
    keyboardType,
    maxLength,
    clearButtonMode
}) {
    const [showPass,setShowPass] = useState(false);

    const placeHolderTextColor= colors.white['100']

    return(
        <View 
        style={[styles.container ,{...style}]}
        >
            <Icon name={icon} size={26} color={color} style={{marginRight:15}} /> 
            <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeHolder}
            keyboardType={keyboardType}
            maxLength={maxLength}
            clearButtonMode={clearButtonMode}
            
            placeholderTextColor={placeHolderTextColor}
            secureTextEntry={isHidden ? !showPass : false}
            //isHidden, yani gizli mi özelliği varsa showPass in tersi, değilse false
            style={[styles.text, {color}]}
             />
             {isHidden && (
                 <IconCommunity 
                 name={showPass ? 'eye' : 'eye-off'}
                 onPress={() => setShowPass(pass => !pass)}
                 color={color}
                 style={styles.icon}
                 size={26}
                 />
             )}

        </View>
    );
}
const styles = StyleSheet.create({
    icon:{
        marginRight:15
    },
    container:{
        flexDirection:'row',
        paddingBottom:10,
        borderBottomWidth :1,
        borderBottomColor:'#97a1be',
        marginHorizontal: 17,
    
    },
    text:{
        width:280,
        marginTop:3,
        fontSize:13,
        letterSpacing:1,
        fontWeight:'600'
    },
})