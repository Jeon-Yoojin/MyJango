import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useIdContext } from '../../IdProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { signOut } from '../login/utils/auth';

const CustomDrawer = props => {
    const user_name = useIdContext();

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}
            >
                
                <View style={{flexDirection: 'row', marginHorizontal: 3, borderBottomColor: 'grey', borderBottomWidth: 0.3, marginVertical: 10}}>
                <Ionicons name='person-circle' size={70} style={{color: '#C4C4C4', margin: 5}}/>
                <View style={{justifyContent: 'center'}}>
                <Text
                    style={{
                        fontSize: 20,
                        marginBottom: 5,
                        color: '#1A1A1A'
                    }}>
                    {user_name.myNickname}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        marginBottom: 5,
                        color: '#1A1A1A'
                    }}>
                    {user_name.myId}
                </Text>
                </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, backgroundColor: '#FF5454' }}>
                <TouchableOpacity onPress={signOut}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Ionicons name="exit-outline" size={22} style={{ color: 'white' }} />
                        <Text
                            style={{
                                fontSize: 18,
                                color: 'white',
                                marginLeft: 5,
                            }}>
                            로그아웃
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;