import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';

import * as ImagePicker from 'expo-image-picker';

const ImgPicker = props => {

  const takeImageHandler = () => {
    ImagePicker.launchCameraAsync()
    // .then(result => console.log("Resultado de la selección de imagen", result))
    // .catch(err => console.log("Error al seleccionar la imagen", err))
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image}/>
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  imagePicker:{
    alignItems: 'center'
  },
  imagePreview:{
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc'
  },
  image:{
    width: '100%',
    height: '100%'
  },
});

export default ImgPicker;