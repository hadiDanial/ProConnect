import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  initializePreferences,
  isDarkTheme,
} from "./Services/Redux/PreferencesSlice";
import JobsList from "./Features/Jobs/JobsList";
import Testing from "./Components/Testing";
import JobPage from "./Features/Jobs/JobPage";
import { setDimensions } from "./Services/Redux/DimensionSlice";
import { AppDispatch } from "./Services/Store";
import EmailPasswordLoginScreen from "./Screens/Login/EmailPasswordLoginScreen";
import SignInScreen from "./Screens/Authentication/SignInScreen";
import ForgotPasswordScreen from "./Screens/Authentication/ForgotPasswordScreen";
import NewPasswordScreen from "./Screens/Authentication/NewPasswordScreen";
import SignUpScreen from "./Screens/Authentication/SignUpScreen";

const Index: React.FC = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch<AppDispatch>();
  const darkTheme = useSelector(isDarkTheme);

  useEffect(() => {
    dispatch(initializePreferences());
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        dispatch(setDimensions({ sceen: screen, window: window }));
      }
    );
    return () => subscription?.remove();
  }, []);

  return (
      <NavigationContainer key={darkTheme.toString()}>
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          <Stack.Screen name="Home" component={JobsList} />
          <Stack.Screen name="Testing" component={Testing} />
          <Stack.Screen name="Job" component={JobPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Index;