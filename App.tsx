import React from 'react';
import {SafeAreaView, View, Text, Button, TextInput, ScrollView, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from "react-native-paper";
import {StyleSheet} from "react-native";


const style = StyleSheet.create({
  mainViewStyle: {flex: 1, backgroundColor: "cyan", justifyContent:
 "center"},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp01 : {backgroundColor:Colors.indigo200, alignContent:"center", flexDirection: "row", justifyContent:"center"},
 temp02 : {backgroundColor:Colors.red200, alignItems: 'flex-end', flexDirection: "row-reverse", padding:5},
 temp03 : {backgroundColor:Colors.yellow400, alignContent:"center", flexDirection: "row"},
 expireddate : {borderWidth:1},

cameraview : { width:300, height:300},
  TitleText: {textAlign : "center", fontWeight : 'bold', margin : 20, fontSize: 20},
  textInputStyle: {color: "green", width : 210, height : 50, borderWidth: 1, backgroundColor: "white", margin:10}
 })

const App = () => {
 return (
 <SafeAreaView>
    <View style={style.temp01}>
      <Text style = {style.TitleText} >추가 및 수정 </Text>
      <Text style = {{fontSize : 17, position:"absolute", right:12, top:25}}>저장</Text>   
    </View>
 
 <View style={style.temp02}> 
    <Icon name="bell-badge" size={30} color={Colors.grey500} style={{margin:5}}/>
    <Icon name="star" size={30} color={Colors.yellow400} style={{margin:5}}/> 
      
  </View>

  <View style={style.temp03}> 
    <Text style={style.TitleText}>이름</Text> 
    <TextInput style={style.textInputStyle}
      placeholder = "Enter your name"
      onChangeText = {(text: string) => {console.log(text);}}
      onFocus = {() => {console.log("On Focus");}}
      onBlur = {() => {console.log("On Blur");}}
      onEndEditing = {() => {console.log("Edit End!");}}
      keyboardType = "default"/>
    <View style = {{position:"absolute", right:25, top:27}}> 
      <Icon name="camera" size={30} color={Colors.grey500} />  
    </View>
  
  </View>
 
  <View style={style.temp03}> 
    <Text style={style.TitleText}>수량                 </Text> 
    <Text style={style.TitleText}>-</Text>
    <Text style={style.TitleText}>1</Text>
    <Text style={style.TitleText}>+</Text>
  </View>

 
 
  <View style={style.temp03}> 
    <Text style={style.TitleText}>유통기한</Text> 
    <View>
      <View style={style.expireddate}>
        <Text>2022.05.03</Text>
        <Icon name="camera" size={30} color={Colors.grey500}/>  
      </View>
      <View style={style.expireddate} >
        <Text>2022.05.04</Text>
        <Icon name="camera" size={30} color={Colors.grey500}/>  
      </View>

    </View>
    
    
    
  
  </View>


 <View style={style.temp03}> 
    <Text style={style.TitleText}>이미지</Text> 
    <View style={style.cameraview}> 
      <Icon name="camera" size={30} color={Colors.grey500}  style = {{position:"absolute", left:140, top:120}} />  
    </View>
 </View>

 </SafeAreaView>
 );
};
export default App;
///////////////////////////////////////////////////////////////////////////////////////////////////////





// 근데 나 이거 그 뭐야 map으로 써야하는 거 아님? 오.... 좀 큰일났는데.......
/*export default function App(){
  
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
          <View style={styles.button}>
            <Text>유통기한</Text>
          </View>
          <View style={styles.button}>
            <Text>즐겨찾기</Text>
          </View>
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
      });*/