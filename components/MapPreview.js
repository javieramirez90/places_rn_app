import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';

import vars from '../env'

const MapPreview = props => {
  let imagePreviewUrl;
  if(props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}&key=${vars.googleApiKey}`;
  }
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.mapPreview}>
      {props.location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> : props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mapPreview:  {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
})

export default MapPreview;