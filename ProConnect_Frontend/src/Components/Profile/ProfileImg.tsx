import React from "react";
import {View, Image, StyleSheet } from "react-native";
import Colors from "../../Constants/Colors";
import getColors from "../../Constants/Colors";
interface ProfileImgProps{
    img:string;
}
const ProfileImg: React.FC<ProfileImgProps> =  (props) => {
    const location = "../../../assets/" + props.img
    console.log(location)
    return (
        <View>
           <Image 
           source={require(location)}
           style={styles.img}
           />

           
        </View>
    )
}

const styles = StyleSheet.create({
  img:{
      height: 150,
      borderWidth: 3,
      width: 150,
      borderRadius: 100,
      borderColor: getColors().highlight,
  },
  
})
export default ProfileImg