import React, {useContext} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
//import AppContext from '../store/AppContext';

const MyModal = (props) => {
  //const [scheme] = useContext(AppContext);
  const scheme = 'white';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <Pressable
        onPress={props.onPress}
        style={{
          backgroundColor:
            scheme === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(31, 31, 31, 0.1)',
          width: '100%',
          height: '100%',
        }}></Pressable>
      <View
        style={{
          position: 'absolute',
          //bottom: 0,
          top: 0,
          backgroundColor: scheme === 'dark' ? '#2b2b2b' : '#dbd7d7',
          width: '100%',
        }}>
        {props.children}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          //top: 0,
          backgroundColor: scheme === 'dark' ? '#2b2b2b' : '#dbd7d7',
          width: '100%',
          alignItems: 'center',
        }}>
        <Text style={{marginVertical: 15}}>{props.curPage}</Text>
      </View>
    </Modal>
  );
};

export default MyModal;
