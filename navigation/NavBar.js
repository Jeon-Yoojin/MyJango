import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../main/Main';
import ManagePage from '../ingredients_mg/ManagePage';
import Recipe_list from '../recipe_list/recipe_list';
import Community from '../community/Community';

//이미지 경로
const ChatFillPath = require('../android/app/src/main/assets/images/chat-fill.png');
const FridgeFillPath = require('../android/app/src/main/assets/images/fridge-fill.png');
const HomeFillPath = require('../android/app/src/main/assets/images/home-fill.png');
const LightbulbFillPath = require('../android/app/src/main/assets/images/lightbulb-fill.png');

const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height

function MainScreen() {
    return (
      <View style={{ flex: 1}}>
        <Main></Main>
      </View>
    );
  }

  function OtherScreen() {
    return (
      <View style={{ flex: 1}}>
        <Text>OtherScreen</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#FF615B',
          headerShown:false,
          tabBarStyle:{height:75},
        }}
      >
        <Tab.Screen
          name="홈"
          component={Main}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image style={styles.Img} source={HomeFillPath} tintColor={color} />
            ),
            tabBarLabelStyle:{
                fontSize: 13.5
            }
          }}
        />
        <Tab.Screen
          name="재료 관리"
          component={ManagePage}
          options={{
            tabBarIcon: ({ color, size }) => (
                <Image style={styles.Img} source={FridgeFillPath} tintColor={color}/>
            ),
            tabBarLabelStyle:{
                fontSize: 13.5
            }
          }}
        />
        <Tab.Screen
          name="레시피 추천"
          component={Recipe_list}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image style={styles.Img} source={LightbulbFillPath} tintColor={color} />
            ),
            tabBarLabelStyle:{
                fontSize: 13.5
            }
          }}
        />
        <Tab.Screen
          name="커뮤니티"
          component={Community}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image style={styles.Img} source={ChatFillPath} tintColor={color} />
            ),
            tabBarLabelStyle:{
                fontSize: 13.5
            }
          }}
        />
      </Tab.Navigator>
    );
  }

const NavBar = (props)=>{

    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    navbar:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingLeft: 20,
        paddingRight: 33,
        paddingTop: 15,
        width: fullWidth,

        borderTopColor:'rgba(0,0,0,0.05)',
        borderTopWidth:1.5,
    },
    navbarElement:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    Img:{
        height: 30,
        width: 25,
        marginHorizontal: 15
    },
    text:{
        color: '#C6C6C6',
        fontWeight: '700',
        marginVertical: 10
    }
})
export default NavBar;
