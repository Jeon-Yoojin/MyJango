import React, {createRef, useEffect} from 'react';
import DelayInput from 'react-native-debounce-input'; 
import {SafeAreaView, View, Text, TouchableOpacity, Modal, TextInput, Button, Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from "react-native-paper";
import {StyleSheet} from "react-native";
import { useState, useCallback, useMemo } from 'react';
import { Calendar } from 'react-native-calendars';
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({ name: 'recipe.db', createFromLocation: '~/recipe.db', });

const style = StyleSheet.create({
  mainViewStyle: {flex: 1, backgroundColor: "cyan", justifyContent:
 "center"},
 view: {flex: 1, alignItems: 'center', backgroundColor: Colors.amber100},
 scrollview: {flex: 1, backgroundColor: Colors.indigo200},
 infoView: {borderWidth: 1, width:400},
 temp01 : {backgroundColor:Colors.indigo200, alignContent:"center", flexDirection: "row", justifyContent:"center"},
 temp02 : {backgroundColor:Colors.red200, alignItems: 'flex-end', flexDirection: "row-reverse", padding:5},
 temp03 : {alignContent:"center", flexDirection: "row"},
 expireddate : {flexDirection: 'row', justifyContent: 'space-between', padding:3, marginTop: 15, width:260},
 

cameraview : { width:300, height:300, backgroundColor:Colors.amber200},
  TitleText: {textAlign : "center", fontWeight : 'bold', margin : 20, fontSize: 20},
  textInputStyle: {color: "green", width : 210, height : 50, borderWidth: 1, backgroundColor: "white", margin:10},
  ModaltextInputStyle: {width : 50, height : 50, borderWidth: 1, backgroundColor: "white", margin:10}
 })




const Ingredients_add = () => {

  const [quantity, setQuantity] = useState(1);
  const quantityUp = useCallback(()=>setQuantity((quantity) => {return quantity+1}), []);
  const quantityDown = useCallback(()=>setQuantity((quantity) => { 
    if(quantity >= 2 ) quantity = quantity-1;
    return quantity}), []);
    
    const inputRef = createRef();

    const [text, setText] = useState('');
    const allClear = () => {
      setText('');
      inputRef.current.clear();
    };

    const [alarmCycle, setAlarmCycle] = useState(0);
    const [min, setMin] = useState('');
  
const [category,setCategory] = useState('');
const selectCategory = useCallback((cg)=>setCategory((category) => {category = cg; return category;}),[]);

const[showCalendar1,setShowCalendar1] = useState(false);
const changeShowCalendar1 = useCallback(()=>setShowCalendar1((showCalendar1) => {return !showCalendar1}),[]);

const[showCalendar2,setShowCalendar2] = useState(false);
const changeShowCalendar2 = useCallback(()=>setShowCalendar2((showCalendar2) => {return !showCalendar2}),[]);

const [startDate, setStartDate] = useState('          ');
const selectStartDate = useCallback((ssd)=>setStartDate((startDate) => {startDate = ssd; return startDate;}),[]);

const [lastDate, setLastDate] = useState('          ');
const selectLastDate = useCallback((sld)=>setLastDate((lastDate) => {lastDate = sld; return lastDate;}),[]);

const [modalVisible, setModalVisible] = useState(false);
const Confirm = () => {
  setModalVisible(!modalVisible);
};
const Cancel = () => {
  setModalVisible(!modalVisible);
}

let like = false;
  const [DbBookmark, setDbBookmark] = useState(0);
  const [starImage, updateStar] = useState(like ? "star" : "star-outline");
  const modifyLike = useCallback(() => {
    if(like){
    like = false;
    updateStar("star-outline");
    setDbBookmark(0);
    }
    else{
    like = true;
    updateStar("star");
    setDbBookmark(1);
    console.log("DBLike is ",DbBookmark);
    }
    }, []);

let alarm = false;
  const [alarmImage, updateAlarm] = useState(alarm ? "bell-badge" : "bell-badge-outline");
  const modifyAlarm = useCallback(() => {
    if(alarm){
    alarm = false;
    updateAlarm("bell-badge-outline");
    //나중에 알람 취소하는 무언가
    }
    else{
    alarm = true;
    updateAlarm("bell-badge");
    }
    }, []);

    /*function DeleteIngredient(name){
      let db = SQLite.openDatabase({ name: 'recipe.db' });
      db.transaction((tx) => {
          tx.executeSql(
              'DELETE FROM ingredients where name=?',
              [name],
              (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                      Alert.alert(
                          '완료',
                          '성공적으로 삭제되었습니다',
                          [
                              {
                                  text: 'Ok',
                              },
                          ],
                          { cancelable: false }
                      );
                  }
              }
          );
      });
  }*/
  

   const insertData = () => {
 
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO ingredients (name, qty, expiration, category, bookmark, notify) VALUES (?,?,?,?,?,?)',
          [text, quantity, lastDate, category ,DbBookmark, alarmCycle],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
           
            if (results.rowsAffected > 0) {
              Alert.alert('Data Inserted Successfully....');
            } else Alert.alert('Failed....');


          }
        );
      });

      viewIng();
  
      setCategory('');
      setQuantity(1);
      setStartDate('          ');
      setLastDate('          ');            
      allClear; 
      setDbBookmark(0);
      setShowCalendar1(false);
      setShowCalendar2(false);
      setAlarmCycle(0);
      like = false;
      updateStar("star-outline");
    }

    const viewIng = () => {
 
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM ingredients',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            console.log(temp);
          }
        );
      });
   
    }



 return (
 <SafeAreaView>
  
    <View style={style.temp01}>
      <Text style = {style.TitleText} >추가 및 수정 </Text>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onShow={()=>console.log("onShow")}
>
<View>
  <Text style = {{fontSize: 23, fontWeight: 'bold', margin: 20}}>알림 설정</Text>
  </View>
  <View style={{flexDirection:'row'}}>
    <Text style={{fontSize:20, textAlignVertical:"center"}}>재고가 </Text>
    <TextInput style={style.ModaltextInputStyle}
        onChangeText={(yourMin)=>setMin(yourMin)}
      />
    <Text style={{fontSize:20, textAlignVertical:"center"}}>개 미만일 경우,    </Text>

  </View>
  <View style={{flexDirection:'row'}}>
    
  <TextInput style={style.ModaltextInputStyle}
     onChangeText={(period)=>setAlarmCycle(period)}
   />
    <Text style={{fontSize:20, textAlignVertical:"center"}}>일 마다 알림 설정 </Text>

  </View>
  <Button title="확인" onPress={Confirm}></Button>
  <Button title="취소" onPress={Cancel}></Button>



</Modal>
      <TouchableOpacity style = {{position:"absolute", right:12, top:25}}>
        <Text style = {{fontSize : 17}} onPress={insertData}>저장</Text>
      </TouchableOpacity>
         
    </View>
 
 <View style={style.temp02}> 
    <TouchableOpacity onPress={()=>{setModalVisible(true); modifyAlarm;}}>
      <Icon name={alarmImage} size={30} color={Colors.grey500} style={{margin:5}}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={modifyLike}>
      <Icon name={starImage} size={30} color={Colors.yellow400} style={{margin:5}}/> 
    </TouchableOpacity>
  </View>

  <ScrollView>
 
  <View style={style.temp03}> 
    <Text style={style.TitleText}>이름</Text> 
    <DelayInput style={style.textInputStyle}
        value={text}
        onChangeText={setText}
        onEndEditing={()=>console.log("onEndEditing     " +text)}
        inputRef={inputRef}
      />
    <TouchableOpacity style = {{position:"absolute", right:25, top:21}} onPress = {allClear}> 
      <Icon name="close-circle" size={30} color={Colors.grey500} />  
    </TouchableOpacity>
  
  </View>
 
  <View style={style.temp03}> 
    <Text style={style.TitleText}>보관         </Text> 
    <TouchableOpacity onPress={()=>{selectCategory('fridge')}}>
      <Text style={style.TitleText}>냉장</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{selectCategory('freezer')}}>
      <Text style={style.TitleText}>냉동</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{selectCategory('room')}}>
      <Text style={style.TitleText}>실온</Text>
    </TouchableOpacity>
    
  </View>

  <View style={style.temp03}> 
    <Text style={style.TitleText}>수량                 </Text> 
    <TouchableOpacity onPress={quantityDown}>
      <Text style={style.TitleText}>-</Text>
    </TouchableOpacity>
    
    <Text style={style.TitleText}>{quantity}</Text>
    
    <TouchableOpacity onPress={quantityUp}>
      <Text style={style.TitleText}>+</Text>
    </TouchableOpacity>
    
  </View>

 
 
  <View style={style.temp03}> 
    <Text style={style.TitleText}>유통기한</Text> 
    <View>
      <View style={style.expireddate}>
      
        <Text style = {{fontSize:20}}>{startDate}</Text>
        <TouchableOpacity onPress={changeShowCalendar1}>
          <Icon name="calendar-range" size={30} color={Colors.grey500}/>
        </TouchableOpacity>
        

          
      </View>

      <View>
       {showCalendar1 && <Calendar
        minDate={Date()}
        onDayPress={(day) => {selectStartDate(day.dateString)}}
        />}
      </View>

      <View style={style.expireddate}>
        <Text style = {{fontSize:20}}>{lastDate}</Text>
        <TouchableOpacity onPress={changeShowCalendar2}>
          <Icon name="calendar-range" size={30} color={Colors.grey500}/>
        </TouchableOpacity>
          
      </View>

      <View>
       {showCalendar2 && <Calendar
        minDate={startDate}
        onDayPress={(day) => {selectLastDate(day.dateString)}}
        />}
      </View>

    </View>
    
    
    
  
  </View>


 <View style={style.temp03}> 
    <Text style={style.TitleText} onPress={()=>{console.log("current DBbookmark is  ",DbBookmark,"  current AlarmCycle is   ",alarmCycle)}}>이미지</Text> 
    <View style={style.cameraview}> 
      <Icon name="camera" size={30} color={Colors.grey500}  style = {{position:"absolute", left:140, top:120}} />  
    </View>
 </View>

 </ScrollView>


 </SafeAreaView>
 );

};
export default Ingredients_add;
