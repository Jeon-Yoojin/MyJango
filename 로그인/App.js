import 'react-native-gesture-handler';
import React, {useState, useEffect} from "react"
import {View, Text} from "react-native"
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './navigators/AuthStackNavigator';
import firestore,{firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { HomeScreen } from './screens';

!firebase.apps.length ? firebase.initializeApp({
   appId: 'myjango-da9a3',
   apiKey: 'AIzaSyCN-tD1-DY8irEB7UKvn0n4g06r4shKVvI',
   projectId: '359921450232',
   databaseURL: '',
   storageBucket: '',
   messagingSenderId: '',
   clientId: '',
 }) : firebase.app()

 const App = () => {
   const [currentUser, setCurrentUser] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
 
   const onAuthStateChanged = async user => {
     await setCurrentUser(user);
     setIsLoading(false);
   };
 
   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber;
   }, []);
 
   if (isLoading) {
     return null;
   }
 
   return (
     <NavigationContainer>
       {currentUser ? <HomeScreen /> : <AuthStackNavigator />}
     </NavigationContainer>
   );
 };
 
 export default App;
