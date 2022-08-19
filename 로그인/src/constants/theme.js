import {Dimensions} from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: '#FF5454',
    secondary: '#000020',

    success: '#00C851',
    error: '#ff4444',

    black: '#171717',
    white: '#FFFFFF',
    gray: '#545454',
    lightgray:'#FCFCFC',
    background: '#f4f4f4',
    border: 'F5F5F7',
};

export const SIZES = {
    base: 10,
    width,
    height,
};
