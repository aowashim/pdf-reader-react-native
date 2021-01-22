import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Dimensions, View, Text } from 'react-native'

import Pdf from 'react-native-pdf'
import MyModal from '../components/MyModal'
import { FontAwesome5 } from '@expo/vector-icons'
import { updateHistory } from '../helpers/db'
import { getTime } from '../helpers/getTime'

export default PdfScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false)
  const pageNo = useRef({
    cur: 1,
    total: 1,
  })

  useEffect(() => {
    return () => {
      const func = async () => {
        await updateHistory(route.params.uri, pageNo.current.cur, getTime())
        navigation.navigate('Home', { changed: Date.now() })
      }
      func()
    }
  }, [])

  const source = {
    uri: `${route.params.uri}`,
    //uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    //cache: true,
  }

  return (
    <View style={styles.container}>
      <MyModal
        visible={visible}
        curPage={`${pageNo.current.cur}/${pageNo.current.total}`}
        onPress={() => setVisible(false)}
        onRequestClose={() => setVisible(false)}
      >
        <View style={{ flexDirection: 'row', margin: 15 }}>
          <FontAwesome5
            style={{ marginRight: 10 }}
            name='file-pdf'
            size={24}
            color='black'
          />
          <Text style={{ marginTop: 4 }}>{route.params.name}</Text>
        </View>
      </MyModal>

      <Pdf
        source={source}
        page={route.params.page}
        onLoadComplete={(numberOfPages, filePath) =>
          (pageNo.current.total = numberOfPages)
        }
        onPageChanged={(page, numberOfPages) => (pageNo.current.cur = page)}
        onError={error => {
          console.log(error)
        }}
        onPageSingleTap={() => setVisible(!visible)}
        style={styles.pdf}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    //backgroundColor: 'black',
  },
})
