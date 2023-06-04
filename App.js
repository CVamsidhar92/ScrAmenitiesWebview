import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectStn from './Screens/SelectStn';
import Home from './Screens/Home';
import AmenitiesList from './Screens/AmenitiesList';
import Feedback from './Screens/Feedback';
import MapsWebview from './Screens/MapsWebview';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapsWebView">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectStn"
          component={SelectStn}
          options={{
            headerTitle: 'Passenger Amenities App',
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#833471',
            },
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'Passenger Amenities App',
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#833471',
            },
          }}
        />

        <Stack.Screen
          name="AmenitiesList"
          component={AmenitiesList}
          options={{
            headerTitle: 'Amenities List',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#833471',
            },
          }}
        />

<Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{
            headerTitle: 'Feedback',
            headerTitleAlign: 'center',            
            headerTitleStyle: {
              color: 'white',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#833471',
            },
          }}
        />

<Stack.Screen
          name="MapsWebView"
          component={MapsWebview}
          options={{
            headerTitle: 'Maps',
            headerTitleAlign: 'center',            
            headerTitleStyle: {
              color: 'white',
              fontSize: 18,
            },
            headerStyle: {
              backgroundColor: '#833471',
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Splash({ navigation }) {
  setTimeout(() => {
    navigation.replace('SelectStn');
  }, 3000);

  return (
    <View>
      <Image
        source={require('./images/splash.jpeg')}
        style={{
          width: '50%',
          height: '50%',
          resizeMode: 'contain',
          margin: 30,
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          fontSize: 28,
          color: 'blue',
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 15,
        }}>
        South Central Railway
      </Text>
      <Text
        style={{
          fontSize: 28,
          color: 'blue',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Station Amenities App
      </Text>
    </View>
  );
}
