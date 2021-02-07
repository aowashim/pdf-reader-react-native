import React from 'react'
import { StyleSheet, View, Pressable, FlatList } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Text } from 'react-native-paper'
import { insertHistory } from '../helpers/db'
import { getTime } from '../helpers/getTime'

const MyFlatList = props => {
  const getName = data => {
    if (data?.name) {
      return data.name
    } else {
      return data.uri.split('/').pop()
    }
  }

  const insert = async data => {
    await insertHistory(getName(data), data.uri, getTime())
  }

  const renderItem = itemData => {
    return (
      <Pressable
        style={styles.item}
        onPress={() => {
          if (props.scr === 'all') {
            insert(itemData.item)
            //console.log(itemData.item)
            props.navigation.navigate('Pdf', {
              uri: itemData.item.uri,
              name: getName(itemData.item),
              page: 1,
            })
          } else {
            props.navigation.navigate('Pdf', itemData.item)
          }
          //console.log(itemData.item)
        }}
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
          <Text style={{ marginTop: 3 }}>{getName(itemData.item)}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.list}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
      />
    </View>
  )
}

export default MyFlatList

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'rgba(152, 156, 153, 0.2)',
    marginBottom: 2,
    borderRadius: 4,
    paddingTop: 8,
  },
  item: {
    padding: 2,
    marginBottom: 15,
  },
})
