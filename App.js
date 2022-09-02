import React, { useState, useEffect, useCallback } from "react"
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {requestUserPermission, NotificationListener} from "./src/FCM/pushnotification_helper";
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import StackNavigator from './src/navigation/StackNavigator';
import { IdProvider } from './IdProvider';


const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [myId, setMyId] = useState('');
  const modifyMyId = useCallback((t) => { setMyId(t); }, []);
  const [myNickname, setMyNickname] = useState('');
  const modifyMyNickname = useCallback((t) => { setMyNickname(t); }, []);

  const member = firestore().collection('member');

  const onAuthStateChanged = async user => {
    try {
      setCurrentUser(user);
      setIsLoading(false);
      modifyMyId(user.email);
      await getMyNickname(user.email);

    } catch (error) {
      console.log('error : ', error);
    }
  };

  const getMyNickname = async (id) => {
    member.doc(id).onSnapshot(documentSnapshot => {
      modifyMyNickname(documentSnapshot.data().nickname);
    });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber;
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <IdProvider myId={myId} myNickname={myNickname}>
      <NavigationContainer>
        {currentUser ? <StackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </IdProvider>
  );
};

export default App;