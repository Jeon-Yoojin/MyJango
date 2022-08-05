import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Modal, Pressable, TouchableOpacity, Alert , SafeAreaView, View, Text, TextInput, ScrollView, Button, TouchableHighlight } from 'react-native';
import { Colors } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Mailer from 'react-native-mail';
import ModalFriends from './ModalFriends';
import ModalPresentCondition from './present_condition/ModalPresentCondition'


export const sendEmailWithMailer = (
  to = "",
) => {
  Mailer.mail(
    {
      subject: 'My JangGo 친구 추가',
      recipients: [to],
      body: 'My JangGo에서 친구 추가를 받았습니다.',
      isHTML: false,
    },
    (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
            {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
          ],
          { cancelable: true }
        )
      },
  );
};

const Community = () => {

  const child1Ref = useRef();
  const child2Ref = useRef();

  const [color1, setcolor1] = useState("lightgrey");
  const [color2, setcolor2] = useState("lightgray");
  const [color3, setcolor3] = useState("lightgray");
  const [color4, setcolor4] = useState("lightgray");
  const [color5, setcolor5] = useState("lightgray");
  const [color6, setcolor6] = useState("lightgray");
  const [color7, setcolor7] = useState("lightgray");
  const [color8, setcolor8] = useState("lightgray");

  const styles = StyleSheet.create({
    temp : {
      flexDirection: "row"
    },
    temp01 : {
      alignContent:"center", flexDirection: "row"
    },
    temp2 : {
      backgroundColor:Colors.grey300, alignContent:"center", margin: 20, borderRadius: 10
    },
    temp02 : {
      backgroundColor:Colors.grey300, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    temp3 : {
      backgroundColor:Colors.grey200, alignContent:"center", margin: 20, borderRadius: 10
    },
    temp03 : {
      backgroundColor:Colors.grey200, alignContent:"center", flexDirection: "row", borderRadius: 10
    },
    expireddate0 : {
      fontSize: 18
    },
    expireddate1 : {
      backgroundColor:Colors.green200, borderRadius: 10, margin: 10, padding:3
    },
    expireddate01 : {
      backgroundColor:Colors.green200, borderRadius: 10, margin: 10, padding:3, alignContent:"flex-end"
    },
    expireddate2_1 : {
      backgroundColor:color1, borderRadius: 10, margin: 10, fontSize: 18, padding:3
    },
    expireddate2_2 : {
      backgroundColor:color2, borderRadius: 10, margin: 10, fontSize: 18, padding:3
    },
    expireddate2_3 : {
      backgroundColor:color3, borderRadius: 10, margin: 10, fontSize: 18, padding:3
    },
    expireddate2_4 : {
      backgroundColor:color4, borderRadius: 10, margin: 10, fontSize: 18, padding:3
    },
    expireddate2_5 : {
      backgroundColor:color5, borderRadius: 10, margin: 10, fontSize: 18, padding:3
    },
    expireddate2_6 : {
      backgroundColor:color6, borderRadius: 10, margin: 10, fontSize: 18, padding:3
    },
    expireddate2_7 : {
      backgroundColor:color7, borderRadius: 10, margin: 10, fontSize: 18, padding:3
    },
    expireddate2_8 : {
      backgroundColor:color8, borderRadius: 10, margin: 10, fontSize: 18, padding:3
    },
    TitleText: {
      textAlign : "left", fontWeight : 'bold', margin : 20, fontSize: 25
    },
    TitleTextip: {
      textAlign : "center", margin : 2, fontSize: 23
    },
    sharetext: {
      position:"absolute", left:120, margin: 10
    },
    edittext: {
      position:"absolute", left:0, margin: 8
    },
    textInputStyle: {
      width : 210, height : 40, borderWidth: 1, backgroundColor: "white", margin:2
    }
   });
 

  const [modalVisible2, setModalVisible2] = useState(false);

  const share1 = () => {
    Alert.alert("공유","친구에게 재료를 공유했습니다.",
    [{text: "확인", onPress: ()=>{console.log("share")}}]);
    setcolor1("lightgray");
    setcolor2("lightgray");
    setcolor3("lightgray");
    setcolor4("lightgray");
    setcolor5("lightgray");
  }

const share2 = () => {
  Alert.alert("공유","친구에게 재료를 공유했습니다.",
  [{text: "확인", onPress: ()=>{console.log("share")}}]);
  setcolor6("lightgray");
  setcolor7("lightgray");
  setcolor8("lightgray");
}

const action1 = () => {
  setcolor1("skyblue");
};
const action2 = () => {
  setcolor2("skyblue");
};
const action3 = () => {
  setcolor3("skyblue");
};
const action4 = () => {
  setcolor4("skyblue");
};
const action5 = () => {
  setcolor5("skyblue");
};
const action6 = () => {
  setcolor6("skyblue");
};
const action7 = () => {
  setcolor7("skyblue");
};
const action8 = () => {
  setcolor8("skyblue");
};

const save = () => {
  setModalVisible2(!modalVisible2);
  setText1(in1);
  setText2(in2);
  setText3(in3);
  setText4(in4);
  setText5(in5);
};

const [to, setText_e] = useState("");
const [in1, setText01] = useState("감자");
const [in2, setText02] = useState("당근");
const [in3, setText03] = useState("김");
const [in4, setText04] = useState("돼지고기");
const [in5, setText05] = useState("파");
const [inde1, setText1] = useState("감자");
const [inde2, setText2] = useState("당근");
const [inde3, setText3] = useState("김");
const [inde4, setText4] = useState("돼지고기");
const [inde5, setText5] = useState("파");
useEffect(()=>{
  setInterval(()=>{
  setText1;
  });
  setInterval(()=>{
  setText2;
  });
  setInterval(()=>{
    setText3;
  });
  setInterval(()=>{
    setText4;
  });
  setInterval(()=>{
    setText5;
  });   
  setInterval(()=>{
    setcolor1;
  }); 
  setInterval(()=>{
    setcolor2;
  }); 
  setInterval(()=>{
    setcolor3;
  });          
  setInterval(()=>{
    setcolor4;
  }); 
  setInterval(()=>{
    setcolor5;
  }); 
  setInterval(()=>{
    setcolor6;
  }); 
  setInterval(()=>{
    setcolor7;
  }); 
  setInterval(()=>{
    setcolor8;
  }); 
},);


  return (
 <SafeAreaView>
    <View style={styles.temp01}>
      <Text style = {styles.TitleText}>커뮤니티</Text>
      <ModalFriends ref={child1Ref}></ModalFriends>
      <TouchableOpacity onPress={()=>{child1Ref.current.toggleModal();}}>
        <Text style={{fontSize : 17, color:Colors.grey400, position:"absolute", left:150, top:25}}>친구 추가</Text>
      </TouchableOpacity>

    </View>

<View style={styles.temp2}>
 <View style={styles.temp02}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>부족                         </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 15}}>넉넉</Text>
  </View>

  <View style={styles.temp02}> 
  <TouchableHighlight style={styles.expireddate1}>
    <Text style={styles.expireddate0}>{inde1}</Text></TouchableHighlight>
  <TouchableHighlight style={styles.expireddate1}>
    <Text style={styles.expireddate0}>{inde2}</Text></TouchableHighlight>
  <TouchableHighlight style={styles.expireddate1}>
    <Text style={styles.expireddate0}>{inde3}</Text></TouchableHighlight>
  <Text>    </Text>
  <TouchableHighlight style={styles.expireddate01}>
    <Text style={styles.expireddate0}>{inde4}</Text></TouchableHighlight>
  <TouchableHighlight style={styles.expireddate01}>
    <Text style={styles.expireddate0}>{inde5}</Text></TouchableHighlight>
        
  <ModalPresentCondition ref={child2Ref} ></ModalPresentCondition>
  <TouchableOpacity onPress={()=>{child2Ref.current.toggleModal(); 
    child2Ref.current.initToMeData();}} >  
  <Icon name="pencil" size={30} color={Colors.black} style={styles.edittext}/>
  </TouchableOpacity>
</View>
</View>


  <View style={styles.temp01}> 
    <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>친구</Text>
  </View>
<ScrollView>
<View style={styles.temp3}>
  <View style={styles.temp03}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>넉넉</Text>
  </View>

  <View style={styles.temp03}>  
  <Text>  </Text>
  <TouchableHighlight style={styles.expireddate2_1} onPress={action1}>
    <Text style={styles.expireddate0}>감자</Text></TouchableHighlight>
  <TouchableHighlight style={styles.expireddate2_2} onPress={action2}>
    <Text style={styles.expireddate0}>당근</Text></TouchableHighlight>
  <TouchableHighlight style={styles.expireddate2_3} onPress={action3}>
    <Text style={styles.expireddate0}>김</Text></TouchableHighlight>
<Text>    </Text>
  <TouchableHighlight style={styles.expireddate2_4} onPress={action4}>
    <Text style={styles.expireddate0}>돼지고기</Text></TouchableHighlight>
  <TouchableHighlight style={styles.expireddate2_5} onPress={action5}>
    <Text style={styles.expireddate0}>파</Text></TouchableHighlight>
</View>

  <View style={styles.temp03}> 
  <Icon name="account" size={30} color={Colors.black} style={{margin: 5}}/>
  <Text style = {{fontSize: 18, margin: 10}}>냉장고 털이범님</Text>
  <TouchableOpacity onPress = {share1}> 
    <Icon name="share" size={30} color={Colors.black} style={styles.sharetext}/>
  </TouchableOpacity> 
  </View>
</View>

<View style={styles.temp3}>
  <View style={styles.temp03}>  
 <Text style = {{fontSize: 18, fontWeight: 'bold', margin: 20}}>부족                        </Text>
  </View>

  <View style={styles.temp03}>  
  <Text>  </Text>
  <TouchableHighlight style={styles.expireddate2_6} onPress={action6}>
    <Text style={styles.expireddate0}>감자</Text></TouchableHighlight>
  <TouchableHighlight style={styles.expireddate2_7} onPress={action7}>
    <Text style={styles.expireddate0}>당근</Text></TouchableHighlight>
  <TouchableHighlight style={styles.expireddate2_8} onPress={action8}>
    <Text style={styles.expireddate0}>김</Text></TouchableHighlight>
</View>

  <View style={styles.temp03}> 
  <Icon name="account" size={30} color={Colors.black} style={{margin:5}}/>
  <Text style = {{fontSize: 18, margin: 10}}>냉장고 털이범님</Text>
  <TouchableOpacity onPress = {share2}> 
    <Icon name="share" size={30} color={Colors.black} style={styles.sharetext}/>  
  </TouchableOpacity> 
  </View>
</View>
</ScrollView>
</SafeAreaView>
 );
};

export default Community;
