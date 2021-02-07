import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Button } from 'react-native-paper'
import MyDockPicker from '../components/MyDockPicker'
import { insertHistory, fetchAll, clearTable } from '../helpers/db'
import { dockPicker } from '../helpers/dockPicker'
import { getTime } from '../helpers/getTime'
import MyHeading from '../components/MyHeading'
import MyFlatList from '../components/MyFlatList'

const HomeScreen = ({ navigation, route }) => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    getHistory()
    console.log('in')
    return () => {
      console.log('out')
    }
  }, [route.params?.changed])

  const getHistory = async () => {
    let data = await fetchAll()
    data = data.rows._array
    data.sort((a, b) => b.time - a.time)
    //console.log(data)
    setHistory(data)
  }

  const clearHistory = async () => {
    await clearTable()
    setHistory({})
  }

  const getPdf = async () => {
    const data = await dockPicker()
    //console.log(data[1])
    if (data[0]) {
      await insertHistory(data[1].name, data[1].uri, getTime())
      navigation.navigate('Pdf', {
        uri: data[1].uri,
        name: data[1].name,
        page: 1,
      })
    }
    //await getHistory()
  }

  return (
    <View style={styles.container}>
      <MyDockPicker onPress={getPdf} />

      <MyHeading title='HISTORY' />

      <MyFlatList
        data={history}
        navigation={navigation}
        scr='his'
        onRefresh={() => {}}
        refreshing={false}
      />

      <Button
        icon="cancel"
        style={{
          marginHorizontal: 40,
          marginVertical: 10,
          backgroundColor: 'rgba(6, 84, 117, 0.9)',
        }}
        mode='contained'
        onPress={clearHistory}
      >
        Clear History
      </Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
})
