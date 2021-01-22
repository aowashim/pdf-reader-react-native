import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, FlatList, Pressable } from 'react-native'

import { Text, Button } from 'react-native-paper'
import MyDockPicker from '../components/MyDockPicker'
import { insertHistory, fetchAll, clearTable } from '../helpers/db'
import { dockPicker } from '../helpers/dockPicker'
import { getTime } from '../helpers/getTime'
import { FontAwesome5 } from '@expo/vector-icons'
import MyHeading from '../components/MyHeading'

const HomeScreen = ({ navigation, route }) => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    getHistory()
    // console.log('in')
    // return () => {
    //   console.log('out')
    // }
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
      await insertHistory(data[1].name, data[1].uri, 1, getTime())
      navigation.navigate('Pdf', {
        uri: data[1].uri,
        name: data[1].name,
        page: 1,
      })
    }
    //await getHistory()
  }

  const renderItem = itemData => {
    return (
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate('Pdf', itemData.item)}
      >
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            paddingBottom: 5,
            marginHorizontal: 5,
          }}
        >
          <FontAwesome5
            style={{ marginRight: 10 }}
            name='file-pdf'
            size={24}
            color='black'
          />
          <Text style={{ marginTop: 3 }}>{itemData.item.name}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <MyDockPicker onPress={getPdf} />

      <View style={styles.list}>
        <MyHeading title='HISTORY' />
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          // onRefresh={() => handleRefresh()}
          // refreshing={pull}
        />
      </View>

      <Button
        //icon="camera"
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
  list: {
    flex: 1,
    backgroundColor: 'rgba(152, 156, 153, 0.2)',
    marginBottom: 2,
    borderRadius: 4,
    paddingTop: 3,
  },
  item: {
    padding: 7,
    marginBottom: 2,
  },
})
