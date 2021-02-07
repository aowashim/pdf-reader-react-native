import React from 'react'
import { View } from 'react-native'

import { Button } from 'react-native-paper'

const MyDockPicker = props => {
  return (
    <View style={{ marginVertical: 20 }}>
      <Button
        icon='folder-open'
        mode='contained'
        style={{
          marginHorizontal: 40,
          backgroundColor: 'rgba(6, 84, 117, 0.9)',
        }}
        onPress={props.onPress}
      >
        Open
      </Button>
    </View>
  )
}

export default MyDockPicker
