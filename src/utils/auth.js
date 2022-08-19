import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';

export const singIn = (email, password) => {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(()=>{
        ToastAndroid.show('로그인 성공', ToastAndroid.SHORT);
    })
    .catch(err => {
        console.log(err);
    });
};

export const signUp = (email, password) => {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
        ToastAndroid.show('회원 가입 성공', ToastAndroid.SHORT);
    })
    .catch(err => {
        console.log(err);
    });
};

export const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
      });
  };