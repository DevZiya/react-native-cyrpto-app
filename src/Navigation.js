import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CoinDetail from "./screens/CoinDetails/CoinDetail";
import BottomTabsNavigation from "./BottomTabsNavigation";
import { StatusBar } from "expo-status-bar";
import AddNewAssets from "./screens/AddNewAssets/AddNewAssets";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {ActivityIndicator} from 'react-native'

const Navigation = () => {
  const Stack = createStackNavigator();
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    DoridSans:require('./assets/fonts/DroidSans.ttf')
  });

  if(!fontsLoaded){
    return(
      <ActivityIndicator size={"large"}  color='white'/>
    )
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "black",
        },
      }}
    >
      <Stack.Navigator initialRouteName="Route">
        <Stack.Screen
          name="Root"
          component={BottomTabsNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CoinDetail"
          component={CoinDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AddNewAssets" component={AddNewAssets} options={{
          title:'Add New Assets',
          headerStyle:{
            backgroundColor:'#121212'
          },
          headerTintColor:"#fff",
          headerTitleStyle:{
            fontWeight:'bold'
          }
        }} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
};

export default Navigation;
