import React from 'react'
import { View, Text } from 'react-native'

const MyHeading = props => {
  const scheme = 'white'

  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,
        marginHorizontal: 30,
        // backgroundColor:
        //   scheme === 'dark'
        //     ? 'rgba(110, 49, 109, 0.3)'
        //     : 'rgba(110, 49, 109, 0.9)',
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          color:
            scheme === 'dark'
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(11, 11, 36, 0.8)',
          //padding: 5,
        }}
      >
        {props.title}
      </Text>
    </View>
  )
}

export default MyHeading
