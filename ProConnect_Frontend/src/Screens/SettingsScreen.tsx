import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ProButton from '../Components/Controls/ProButton'
import ProHeader, { HeaderType } from "../Components/Layout/ProHeader";
import { Colors, Text, View } from "react-native-ui-lib";
import {clearData} from "../Utility/Storage";
import { useDispatch, useSelector } from 'react-redux';
import { isDarkTheme, toggleTheme } from '../Services/Redux/Slices/PreferencesSlice';
import { AppDispatch } from '../Services/Redux/Store';
import ProRefreshControl from '../Components/Controls/ProRefreshControl';
import ProSwitch from '../Components/Controls/ProSwitch';


const SettingsScreen: React.FC = () => {
  const darkTheme = useSelector(isDarkTheme);
  const dispatch = useDispatch<AppDispatch>();
  function delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function delayedLoop() {
    await delay(200);
    dispatch(toggleTheme());
  }
  
  return (
    // <SafeAreaView style={styles.container}>
      <View flex>
        <ProRefreshControl onRefreshAction={delayedLoop} children={(
        <View style={{height:"100%", alignContent:'center'}}>

          <ProHeader
            center
            text="Settings"
            headerType={HeaderType.H3}
            />
          <ProSwitch value={darkTheme} rightLabel='Light Theme' leftLabel='Dark Theme' delayChange onValueChange={() => {
            dispatch(toggleTheme());
          }}></ProSwitch>
        
            <ProButton onPress={()=>{clearData()}} text='Clear Data'></ProButton>
          {/* <View bg height={200}>
          </View> */}
          {/* <ProHeader text="Header Example N" headerType={HeaderType.H2} />
          <ProHeader text="Header Example L" headerType={HeaderType.H1} />
          <Text h1>Hello World</Text>
          <Text t2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisi
            arcu, mattis fermentum placerat vel, maximus blandit lorem. Nulla id
            condimentum magna. In hac habitasse platea dictumst. Praesent ut
            odio laoreet, consequat nisi eu, consequat lacus. Aenean tristique
            diam sit amet porta rutrum. Ut gravida volutpat pretium. Suspendisse
            non lorem at tellus tincidunt eleifend. Cras rhoncus tellus vitae
            sem tincidunt, ac malesuada turpis vehicula. Pellentesque ac tortor
            ut purus facilisis rutrum at quis neque. Praesent faucibus venenatis
            metus ut fermentum. Aliquam erat volutpat.
          </Text> 
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisi
            arcu, mattis fermentum placerat vel, maximus blandit lorem. Nulla id
            condimentum magna. In hac habitasse platea dictumst. Praesent ut
            odio laoreet, consequat nisi eu, consequat lacus. Aenean tristique
            diam sit amet porta rutrum. Ut gravida volutpat pretium. Suspendisse
            non lorem at tellus tincidunt eleifend. Cras rhoncus tellus vitae
            sem tincidunt, ac malesuada turpis vehicula. Pellentesque ac tortor
            ut purus facilisis rutrum at quis neque. Praesent faucibus venenatis
            metus ut fermentum. Aliquam erat volutpat.
          </Text>
           */}
          </View>)}>
            
          </ProRefreshControl>
        <ScrollView>
          
        </ScrollView>
      </View>
// </SafeAreaView>
  )
}

export default SettingsScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
    },
  });