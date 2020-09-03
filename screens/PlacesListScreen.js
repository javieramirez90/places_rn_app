import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

import * as placesActions from '../store/places-actions';

const PlacesListScreen =  props => {

  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: "All places",
    headerRight: () => {
    return <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    }
  };
}

const styles = StyleSheet.create({

});

export default PlacesListScreen;