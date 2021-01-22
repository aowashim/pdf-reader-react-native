import 'react-native-gesture-handler'
import React from 'react'

import PdfScreen from './src/screens/PdfScreen'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { initDb } from './src/helpers/db'
import { Title } from 'react-native-paper'

initDb()
  .then(() => {
    console.log('Initialized database')
  })
  .catch(err => {
    console.log('Initializing db failed.')
  })

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          options={{ title: 'Pdf Reader' }}
          component={HomeScreen}
        />
        <Stack.Screen
          name='Pdf'
          component={PdfScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
