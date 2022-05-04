import React,{useMemo} from "react";
import {View} from 'react-native';
import {colors} from '../../constants';

export default function CustomView(props) {
    const isDark = false
    
  

  const containerStyle = useMemo(() => {
const styles = {
    backgroundColor: isDark
    ? colors.dark.primary[1]
    : colors.light.primary[1],
    ...props.style,
}
return styles;
  },[props , isDark]) // isDark ya da props değişmemişse sayfa kendi kendine render olmayacak

    return (
        <View 
        style={containerStyle}>
            {props.children}
        </View>
    );
}
// CustomView ' ı kullandığımız yerde(LoginScreen), içindeki alan children olarak geçer. 
// o yüzden burada böyle children olarak kullanırız