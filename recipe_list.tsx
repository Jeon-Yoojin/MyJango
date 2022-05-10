import React from 'react';
import {SafeAreaView, View, Text, Button, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from "react-native-paper";
import {StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { useCallback } from 'react';


export default function Recipe_list(){

  const navigation = useNavigation();
 const goRD = useCallback(()=>navigation.navigate("Recipe_detail"),[]);
  
  return (
      <View style={styles.view}>
        <View style={styles.magniview} >
          <TextInput style={styles.textInputStyle}
            placeholder = "Enter your name"
            onChangeText = {(text: string) => {console.log(text);}}
            onFocus = {() => {console.log("On Focus");}}
            onBlur = {() => {console.log("On Blur");}}
            onEndEditing = {() => {console.log("Edit End!");}}
            keyboardType = "default"/>
          <Icon name="magnify" size={30} color={Colors.grey500} style={{margin:7}}/>
        </View>
        <Text style = {styles.recommendText} >레시피 추천 </Text>
        <View style = {styles.buttonview}>
          <TouchableOpacity style={styles.button}>
            <Text>유통기한</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>즐겨찾기</Text>
          </TouchableOpacity>
        </View>
        
          <ScrollView style={styles.scroll}>
              <View style={styles.infoView}>
                <Image source = {require('./images/004.png')} style={styles.image}>
                </Image>
                <View style={styles.downdowndownview}>
                  <Text style={styles.title}>졸업 좀 하세요 시켜줘야 할 거 아니냐
                  </Text>
                </View>
              </View>

              <View style={styles.infoView}>
                <Image source = {require('./images/004.png')} style={styles.image}>
                </Image>
                <View style={styles.downdowndownview}>
                  <Text style={styles.title}>안녕하세요 저는 오늘 저녁으로 짜장면을 먹었답니다 고추짜장 먹었는데요 명물임 
                  </Text>
                </View>
              </View>

              <View style={styles.infoView}>
                <Image source = {require('./images/004.png')} style={styles.image}>
                </Image>
                <View style={styles.downdowndownview}>
                  <Text style={styles.title}>고추가 진심 킥임 단무지가 없어도 술술 들어가는 마법의 짜장면
                  </Text>
                </View>
              </View>

          </ScrollView>
      </View>
  );
  }
  
  const styles = StyleSheet.create({
      view: {flex: 1, alignItems: 'flex-start'},
      scroll: {flex: 1},
      infoView: {width:400},
      title: {fontSize: 15, fontWeight: "300", flex:1},
      button: {backgroundColor: Colors.red200, margin:5, padding:5},
      buttonview: {flexDirection: "row",paddingLeft:18, margin:5},
      recommendText: {marginTop:15, marginLeft:25, marginBottom:5, fontSize:20, fontWeight:"700"},
      downdowndownview:{margin:10},
      image:{width:380, height:219, margin:5},
      magniview:{width:400, flexDirection: "row", padding:5, justifyContent:'space-evenly'},
      textInputStyle: {color: "green", width : 300, height : 30, borderWidth: 1, backgroundColor: "white", margin:10}
      });