import React from 'react'
import { BackHandler, Dimensions, View } from 'react-native'
import BackgroundView from '../Components/Layout/BackgroundView'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Friends from '../Screens/Friends/Friends';
import PersonsPage from '../Features/Persons/PersonsPage';

const SearchTabNavigator = () => {

  

const Tab = createMaterialTopTabNavigator();

let width =  Dimensions.get('window').width;
//let height =  Dimensions.get('window').height


  return (
    <Tab.Navigator  screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarItemStyle: { width: width / 2 },
      tabBarStyle: { backgroundColor: 'powderblue' },
    }}>
      <Tab.Screen name="HomeOwners" component={PersonsPage} />
      <Tab.Screen name="Professionals" component={PersonsPage} />
      
    </Tab.Navigator>
  )
}

export default SearchTabNavigator
