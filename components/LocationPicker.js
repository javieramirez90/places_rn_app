import React, { useState, useEffect } from 'react';
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import MapPreview from './MapPreview'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const LocationPicker = props => {
  const [isFetching, setIsFetching] =  useState(false);
  const [pickedLocation, setPicketLocation] = useState(null);

  const mapPickedLocation = props.navigation.getParam('pickedLocation');

  const { onLocationPicked } = props;

  useEffect(() => {
    if(mapPickedLocation) {
      setPicketLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if(result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Ok' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    setIsFetching(isFetching => !isFetching);
    const hasPermission = await verifyPermissions();
    if(!hasPermission) {
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
      setIsFetching(isFetching => !isFetching);
      setPicketLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch(err) {
      console.log(err);
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map',
        [{ text: 'Ok' }]
      );
    }
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map')
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview location={pickedLocation} onPress={pickOnMapHandler}>
        { isFetching ?
            <ActivityIndicator size='large' color={Colors.primary}/>
          :
            <Text>No location chosen yet!</Text>
        }
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;