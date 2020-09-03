import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import vars from ''

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
  return async dispatch => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${vars}`)

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(title, newPath, 'No real address yet', 15.6, 12.3);
      dispatch({ type: ADD_PLACE, placeData: {id: dbResult.insertId, title, image: newPath } });
    } catch(err) {
      console.log(err);
      throw err;
    }
  }
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array })
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
};
