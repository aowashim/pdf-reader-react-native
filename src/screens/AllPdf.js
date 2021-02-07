import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MyFlatList from '../components/MyFlatList'
import { getAllUrl } from '../helpers/server'
import Loading from '../components/Loading'

const AllPdf = ({ navigation }) => {
  const [allUrl, setAllUrl] = useState([])
  const [pull, setPull] = useState(false)

  useEffect(() => {
    getUrl()
  }, [])

  const getUrl = async () => {
    const data = await getAllUrl()
    //console.log(data[1])
    setAllUrl(data[1])
  }

  const handleRefresh = async () => {
    setPull(true)
    await getUrl()
    setPull(false)
  }

  return allUrl.length ? (
    <View style={styles.container}>
      <MyFlatList
        data={allUrl}
        navigation={navigation}
        scr='all'
        onRefresh={() => handleRefresh()}
        refreshing={pull}
      />
    </View>
  ) : (
    <Loading txt='Loading resources...' />
  )
}

export default AllPdf

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  wait: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
