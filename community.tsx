import React from 'react';
import {SafeAreaView, View, Text, Button, TextInput, ScrollView, Image, Dimensions} from 'react-native';
import {Colors} from "react-native-paper";
import {StyleSheet} from "react-native";


const style = StyleSheet.create({
  mainViewStyle: {flex: 1, backgroundColor: "red", justifyContent:
 "center"},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp01 : {backgroundColor:Colors.red200, alignContent:"center", flexDirection: "row"},
 temp02 : {backgroundColor:Colors.indigo200, alignContent:"center", flexDirection: "row"},
 temp03 : {backgroundColor:Colors.yellow400, alignContent:"center", flexDirection: "row"},
 expireddate : {borderWidth:1, borderRadius: 10, margin: 10, fontSize: 18, padding:3},

cameraview : { width:300, height:300},
  TitleText: {textAlign : "left", fontWeight : 'bold', margin : 20, fontSize: 25},
  textInputStyle: {color: "green", width : 210, height : 50, borderWidth: 1, backgroundColor: "white", margin:2}
 })

const App = () => {
 return (
 <SafeAreaView>
    <View style={style.temp01}>
      <Text style = {style.TitleText} >커뮤니티</Text>
      <Text style = {{fontSize : 17, position:"absolute", right:12, top:25}}>친구 추가</Text>
    </View>
 

<View>
 <View style={style.temp02}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>넉넉</Text>
  </View>

  <View style={style.temp02}>  
  <Text>  </Text>
  <Text style={style.expireddate}>감자</Text>
  <Text style={style.expireddate}>당근</Text>
  <Text style={style.expireddate}>김</Text>
  <Text>    </Text>
  <Text style={style.expireddate}>돼지고기</Text>
  <Text style={style.expireddate}>파</Text>
  </View>
</View>

  <View style={style.temp02}>  
  
  </View>



  <View style={style.temp03}> 
    <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>친구</Text>
  </View>

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

  <Text style = {{fontSize: 18, margin: 3}}>냉장고 털이범님</Text>  
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

  <Text style = {{fontSize: 18, margin: 3}}>냉장고 털이범님</Text>  
  </View>
</View>

 </SafeAreaView>
 );
};
export default App;
