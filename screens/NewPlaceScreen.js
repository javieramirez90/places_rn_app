import React from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const NewPlaceScreen =  props => {
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput}/>
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle:  'Add Place'
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 2
  },
});

export default NewPlaceScreen;