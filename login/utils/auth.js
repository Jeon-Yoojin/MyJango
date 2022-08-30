import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';


export const singIn = (email, password) => {
    
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(()=>{
        ToastAndroid.show('로그인 성공', ToastAndroid.SHORT);

    })
    .catch(err => {
        console.log(err);
        ToastAndroid.show('로그인 실패', ToastAndroid.SHORT);
    });

};

export const signUp = (email, password, nickname) => {

    const member = firestore().collection('member');

    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
        ToastAndroid.show('회원 가입 성공', ToastAndroid.SHORT);
    })
    .catch(err => {
        console.log(err);
    });

    member.doc(email).set({
        id: email,
        nickname: nickname,
        password: password
      })
      .then(() => {
        console.log('added!');
      });

};

export const signOut = () => {
    auth().signOut()
      .then(() => {
        ToastAndroid.show('로그아웃', ToastAndroid.SHORT);
      });
  };
