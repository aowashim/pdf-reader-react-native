import 'react-native-gesture-handler'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import PdfScreen from './src/screens/PdfScreen'
import HomeScreen from './src/screens/HomeScreen'

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { initDb } from './src/helpers/db'
import UploadScreen from './src/screens/UploadScreen'
import AllPdf from './src/screens/AllPdf'

initDb()
  .then(() => {
    console.log('Initialized database')
  })
  .catch(err => {
    console.log('Initializing db failed.')
  })

const Stack = createStackNavigator()
const AboutStack = createStackNavigator()
const PdfStack = createStackNavigator()

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      backBehavior='initialRoute'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return focused ? (
              <Entypo name='home' size={24} color='rgba(6, 84, 117, 0.9)' />
            ) : (
              <AntDesign name='home' size={24} color='black' />
            )
          } else if (route.name === 'All') {
            return focused ? (
              <MaterialCommunityIcons
                name='file-pdf'
                size={24}
                color='rgba(6, 84, 117, 0.9)'
              />
            ) : (
              <MaterialCommunityIcons
                name='file-pdf-outline'
                size={24}
                color='black'
              />
            )
          } else if (route.name === 'Upload') {
            return focused ? (
              <AntDesign
                name='cloudupload'
                size={24}
                color='rgba(6, 84, 117, 0.9)'
              />
            ) : (
              <AntDesign name='clouduploado' size={24} color='black' />
            )
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: 'rgba(2, 20, 23, 1)',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen
        name='All'
        options={{ title: 'Resources' }}
        component={AllPdf}
      />
      <Tab.Screen name='Upload' component={UploadScreen} />
    </Tab.Navigator>
  )
}

const App = () => {
  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'

    switch (routeName) {
      case 'Home':
        return 'Pdf reader'
      case 'All':
        return 'Available resources'
      case 'Upload':
        return 'Upload pdf'
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeTab'
          component={HomeTabs}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen
          name='Pdf'
          options={{ headerShown: false }}
          component={PdfScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
