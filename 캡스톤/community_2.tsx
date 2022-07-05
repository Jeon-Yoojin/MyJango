
import React from 'react';
import {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, ScrollView, Button} from 'react-native';
import {Colors} from "react-native-paper";
import {StyleSheet, Modal, Pressable} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const style = StyleSheet.create({
 mainViewStyle: {flex: 1, backgroundColor: "red", justifyContent: "center"},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp : {flexDirection: "row"},
 temp01 : {alignContent:"center", flexDirection: "row"},
 temp02 : {backgroundColor:Colors.grey300, alignContent:"center", flexDirection: "row"},
 temp03 : {backgroundColor:Colors.grey200, alignContent:"center", flexDirection: "row"},
 expireddate1 : {backgroundColor:Colors.green200, borderWidth:1, borderRadius: 10, margin: 10, fontSize: 18, padding:3},
 expireddate : {backgroundColor:Colors.grey300, borderWidth:1, borderRadius: 10, margin: 10, fontSize: 18, padding:3},

  TitleText: {textAlign : "left", fontWeight : 'bold', margin : 20, fontSize: 25},
  TitleTextip: {textAlign : "center", margin : 2, fontSize: 23},
  textInputStyle: {width : 210, height : 50, borderWidth: 1, backgroundColor: "white", margin:2}
 })

const App = () => {
const [modalVisible, setModalVisible] = useState(false);
  return (
 <SafeAreaView>
    <View style={style.temp01}>
      <Text style = {style.TitleText} >커뮤니티</Text>
     <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onShow={()=>console.log("onShow")}
>
  <View style={style.temp}>
  <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>친구 추가</Text>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>이름     </Text>
    <TextInput style = {style.textInputStyle}
    placeholder = "            "
    keyboardType = "default"></TextInput>
  </View>
  <View style={style.temp}>
    <Text style={style.TitleTextip}>이메일 </Text>
    <TextInput style = {style.textInputStyle}
    placeholder = "            "
    keyboardType = "default"></TextInput>
  </View>
  <Button title="저장" onPress={() => setModalVisible(!modalVisible)}></Button>
</Modal>
<Pressable
        onPress={() => setModalVisible(true)}>
      <Text style={{fontSize : 17, color:Colors.grey400, position:"absolute", left:150, top:25}}>친구 추가</Text>
      </Pressable>

    </View>


<View>
 <View style={style.temp02}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>넉넉</Text>
  </View>

  <View style={style.temp02}>  
  <Text>  </Text>
  <Text style={style.expireddate1}>감자</Text>
  <Text style={style.expireddate1}>당근</Text>
  <Text style={style.expireddate1}>김</Text>
  <Text>    </Text>
  <Text style={style.expireddate1}>돼지고기</Text>
  <Text style={style.expireddate1}>파</Text>
  </View>
 <View style={style.temp02}>
  <Icon name="pencil" size={30} color={Colors.black} style={{margin:5, position:"absolute", left:150, top:25}}/>
 </View>
</View>

  <View style={style.temp02}>  
  
  </View>



  <View style={style.temp03}> 
    <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>친구</Text>
  </View>
<ScrollView>
<View>
  <View style={style.temp03}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>넉넉</Text>
  </View>

  <View style={style.temp03}>  
  <Text>  </Text>
  <Text style={style.expireddate}>감자</Text>
  <Text style={style.expireddate}>당근</Text>
  <Text style={style.expireddate}>김</Text>
  <Text>    </Text>
  <Text style={style.expireddate}>돼지고기</Text>
  <Text style={style.expireddate}>파</Text>
  </View>

  <View style={style.temp03}> 
  <Icon name="user" size={30} color={Colors.black} style={{margin:5}}/>
  <Text style = {{fontSize: 18, margin: 3}}>냉장고 털이범님</Text>  
  <Icon name="share" size={30} color={Colors.black} style={{margin:5}}/>
  <Icon name="share-2" size={30} color={Colors.black} style={{margin:5}}/>
</View>
</View>

<View>
  <View style={style.temp03}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
  </View>

  <View style={style.temp03}>  
  <Text>  </Text>
  <Text style={style.expireddate}>감자</Text>
  <Text style={style.expireddate}>당근</Text>
  <Text style={style.expireddate}>김</Text>
  </View>

  <View style={style.temp03}> 
  <Icon name="account" size={30} color={Colors.black} style={{margin:5}}/>
  <Text style = {{fontSize: 18, margin: 3}}>냉장고 털이범님</Text>  
  <Icon name="share" size={30} color={Colors.black} style={{margin:5}}/>
  <Icon name="share-variant" size={30} color={Colors.black} style={{margin:5}}/>

</View>
</View>
</ScrollView>
 </SafeAreaView>
 );
};
export default App;
