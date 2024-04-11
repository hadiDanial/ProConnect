import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainDrawerScreen } from "./MainDrawerScreen";
import { AuthStackScreen } from "./AuthStack";
import JobsList from "../Features/Jobs/JobsList";
import JobPage from "../Features/Jobs/JobPage";
import PersonsPage from "../Features/Persons/PersonsPage";
import Chat from "../Screens/Chat/Chat";

import {Image, StyleSheet, View,Text, Dimensions} from 'react-native'
import { Colors } from "react-native-ui-lib";
import { color } from "react-native-elements/dist/helpers";


const AppStack = createNativeStackNavigator();

const {width, height} = Dimensions.get('window');

export const AppStackScreen: React.FC = () => {

 
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Auth" component={AuthStackScreen}/>
        <AppStack.Screen name="Main" component={MainDrawerScreen} />

        <AppStack.Screen options={{headerShown: true}}  name="Job" component={JobPage}  />
        <AppStack.Screen name="PersonsPage" component={PersonsPage} />
        <AppStack.Screen name="Chats" component={Chat} options={{headerShown : true,headerTintColor : "white", headerStyle :styles.header, headerTitle: () => (
          <View style={styles.container}>

            <View style={styles.chatHeader}>
              <Image
              source={require('../../gardner2.png')}
              style={{ width: 40, height: 40,  borderRadius : 40}}
            />
    
            <View>
            <Text style={{color : "white"}}>Aziz Hamed</Text>
            <Text style={{color : "white"}}> Available</Text>
            </View>
          </View>
        
          </View>
            ),}} />

    </AppStack.Navigator>

  );
};

const styles = StyleSheet.create({
  chatHeader : {
    flexDirection : "row",
   justifyContent : "space-between",
   alignItems : "center",
   width : 130,
  },
  header : {
    backgroundColor : Colors.$backgroundDark,
    },
  container : {

    width : "100%",
    },

})