import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, Text, View, Image } from 'react-native';
import recipeDetail from './src/recipe_detail/recipe_detail';

function App() {
  return (
    <View>
      <Text>{recipeDetail('마라 마파두부')}</Text>
    </View>
  );
};

export default App;