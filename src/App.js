import 'react-native-gesture-handler';
import React from "react"
import {View, Text} from "react-native"
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import firestore,{firebase} from '@react-native-firebase/firestore';

firebase.initializeApp({
   appId: 'myjango-da9a3',
   apiKey: 'AIzaSyCN-tD1-DY8irEB7UKvn0n4g06r4shKVvI',
   projectId: '359921450232',
   databaseURL: '',
   storageBucket: '',
   messagingSenderId: '',
   clientId: '',
 });


const App = () => {
 return (
 <NavigationContainer>
    <AuthStackNavigator/>
 </NavigationContainer>
 );
};

export default App;
