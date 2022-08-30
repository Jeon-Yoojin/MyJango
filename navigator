import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../login/screens/SignInScreen';
import SignUpScreen from '../login/screens/SignUpScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false,
        }}>
         <Stack.Screen name="SIGNIN" component={SignInScreen}/>
         <Stack.Screen name="SIGNUP" component={SignUpScreen}/>
        </Stack.Navigator>
    );

};

export default AuthStackNavigator;
