import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const Loading = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size='large' color='#00ff00' />
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text>{props.txt}</Text>
      </View>
    </View>
  )
}

export default Loading
