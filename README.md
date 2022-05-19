설치할거

npm i react-native-vector-icons react-native-paper

npm i color

npm i -D @types/color

npm i -D @types/react-native-vector-icons

npx react-native link react-native-vector-icons

npm install @react-navigation/native @react-navigation/native-stack

npm install react-native-screens react-native-safe-area-context

npm install --save react-native-mail

react-native link react-native-mail


불러올때

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

import Mailer from 'react-native-mail';
