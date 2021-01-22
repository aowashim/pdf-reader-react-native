import * as DocumentPicker from 'expo-document-picker'

export const dockPicker = async () => {
  let sucs = false
  try {
    const res = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false,
    })

    //console.log(res)
    if (res.type === 'success') {
      sucs = true
      return [sucs, { name: res.name, uri: res.uri }]
      //navigation.navigate('Pdf', { uri: res.uri, name: res.name })
    } else {
      return [sucs, res.type]
    }
  } catch (err) {
    return [sucs, err.message]
  }
}
