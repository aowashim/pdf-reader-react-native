import React, { useState } from 'react'
import { StyleSheet, Pressable, Keyboard, ToastAndroid } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Loading from '../components/Loading'
import { uploadUrl } from '../helpers/server'

const UploadScreen = () => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleUpload = async () => {
    if (url !== '') {
      setIsLoading(true)
      const data = await uploadUrl(url)
      if (data[0]) {
        ToastAndroid.show(data[1], ToastAndroid.LONG)
        setUrl('')
      } else {
        ToastAndroid.show(data[1], ToastAndroid.LONG)
      }
      setIsLoading(false)
    } else {
      ToastAndroid.show('Please enter an url.', ToastAndroid.LONG)
    }
  }

  return isLoading ? (
    <Loading txt='Uploading...' />
  ) : (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <TextInput
        style={styles.txtIn}
        placeholder='Enter pdf url...'
        label='Url'
        value={url}
        onBlur={() => Keyboard.dismiss()}
        onChangeText={text => setUrl(text)}
      />
      <Button
        icon='cloud-upload'
        style={{ backgroundColor: 'rgba(6, 84, 117, 0.9)' }}
        mode='contained'
        onPress={handleUpload}
      >
        Upload
      </Button>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  txtIn: {
    marginBottom: 20,
  },
})

export default UploadScreen
