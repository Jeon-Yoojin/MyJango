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


const[showCalendar,setShowCalendar] = useState(false);
const changeShowCalendar = useCallback(()=>setShowCalendar((showCalendar) => {return !showCalendar}),[]);

const [lastDate, setLastDate] = useState('          ');
const selectLastDate = useCallback((sld)=>setLastDate((lastDate) => {lastDate = sld; return lastDate;}),[]);

const [modalVisible, setModalVisible] = useState(false);
const Confirm = () => {
  if(alarmCycle>0 && min>0){
    setModalVisible(!modalVisible);
    alarm = true;
    updateAlarm("bell-badge");
  }
  else {
    setModalVisible(!modalVisible);
    alarm = false;
    updateAlarm("bell-badge-outline");
  } 
  
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

    let fridge = false;
    const [fridgeSelect, updateFridge] = useState(fridge ? Colors.grey400 : Colors.white);
    const modifyFridge = useCallback(() => {
      if(fridge){
      fridge = false;
      updateFridge(Colors.white);
      selectCategory(' ');
      }
      else{
      fridge = true;
      freezer = false;
      room = false;
      updateFridge(Colors.grey400);
      updateFreezer(Colors.white);
      updateRoom(Colors.white);
      selectCategory('fridge');
      }
      }, []);

      let freezer = false;
    const [freezerSelect, updateFreezer] = useState(freezer ? Colors.grey400 : Colors.white);
    const modifyFreezer = useCallback(() => {
      if(freezer){
      freezer = false;
      updateFreezer(Colors.white);
      selectCategory(' ');
      }
      else{
      freezer = true;
      fridge = false;
      room = false;
      updateFreezer(Colors.grey400);
      updateFridge(Colors.white);
      updateRoom(Colors.white);
      selectCategory('freezer');
      }
      }, []);

      let room = false;
      const [roomSelect, updateRoom] = useState(room ? Colors.grey400 : Colors.white);
      const modifyRoom = useCallback(() => {
        if(room){
        room = false;
        updateRoom(Colors.white);
        selectCategory(' ');
        }
        else{
        room = true;
        fridge = false;
        freezer = false;
        updateRoom(Colors.grey400);
        updateFridge(Colors.white);
        updateFreezer(Colors.white);
        selectCategory('room');
        }
        }, []);

    function DeleteIngredient(name){
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
  }


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

      setCategory('');
      room = false;
      fridge = false;
      freezer = false;
      updateRoom(Colors.white);
      updateFridge(Colors.white);
      updateFreezer(Colors.white);
      setQuantity(1);
      setLastDate('          ');            
      allClear;
      setDbBookmark(0);
      setShowCalendar(false);
      setAlarmCycle(0);
      like = false;
      updateStar("star-outline");
      alarm = false;
      updateAlarm("bell-badge-outline");
    }


    const viewIng = () => {
 
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM ingredients WHERE name=?',
          [text],
          (tx, results) => {
            var temp = [];
           
            for (let i = 0; i < results.rows.length; ++i) {
               temp.push(results.rows.item(i));

                 if(results.rows.item(i).category=='fridge') {
                   updateFridge(Colors.grey400);
                   updateFreezer(Colors.white);
                   updateRoom(Colors.white);
                   setCategory('fridge');
                 }
                else if(results.rows.item(i).category=='freezer') {
                  updateFridge(Colors.white);
                  updateFreezer(Colors.grey400);
                  updateRoom(Colors.white);
                  setCategory('freezer');
                }
                else if(results.rows.item(i).category=='room') {
                  updateFridge(Colors.white);
                  updateFreezer(Colors.white);
                  updateRoom(Colors.grey400);
                  setCategory('room');
                }
                 setQuantity(results.rows.item(i).qty);
                 setDbBookmark(results.rows.item(i).bookmark);
                 if(results.rows.item(i).bookmark==1) {
                  like = true;
                  updateStar("star");
                 }
                 setAlarmCycle(results.rows.item(i).notify);
                 if(results.rows.item(i).notify>0){
                  alarm = true;
                  updateAlarm("bell-badge");
                 }
                 setLastDate(results.rows.item(i).expiration);
                
                
            }

          }
          
        );
      });
   
    }

   
    const updateData = () => {
 
      db.transaction(function (tx) {
        tx.executeSql(
          'UPDATE ingredients SET qty=?, expiration=?, category=?, bookmark=?, notify=? where name=?',
          [quantity, lastDate, category ,DbBookmark, alarmCycle, text],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
           
            if (results.rowsAffected > 0) {
              Alert.alert('Data Updated Successfully....');
            } else Alert.alert('Failed....');


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
      <TouchableOpacity style = {{position:"absolute", right:50, top:25}}  onPress={insertData}>
        <Text style = {{fontSize : 15}}>저장</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {{position:"absolute", right:12, top:25}}  onPress={updateData}>
        <Text style = {{fontSize : 15}}>수정</Text>
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
    <Text style={style.TitleText} onPress={()=>{console.log("current text is   ",text)}}>이름</Text> 
    <DelayInput style={style.textInputStyle}
        value={text}
        onChangeText={setText}
        onEndEditing={()=>console.log("onEndEditing     " +text)}
        inputRef={inputRef}>
        </DelayInput>
    <TouchableOpacity style = {{position:"absolute", right:25, top:21}} onPress = {allClear}> 
      <Icon name="close-circle" size={30} color={Colors.grey500} />  
    </TouchableOpacity>
  
  </View>
 
  <View style={style.temp03}> 
    <Text style={style.TitleText} onPress={()=>{console.log("current category is    ",category);}}>보관         </Text> 
    <TouchableOpacity style={{backgroundColor: fridgeSelect}} onPress={modifyFridge}>
      <Text style={style.TitleText}>냉장</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{backgroundColor: freezerSelect}} onPress={modifyFreezer}>
      <Text style={style.TitleText}>냉동</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{backgroundColor: roomSelect}} onPress={modifyRoom}>
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
        <Text style = {{fontSize:20}}>{lastDate}</Text>
        <TouchableOpacity onPress={changeShowCalendar}>
          <Icon name="calendar-range" size={30} color={Colors.grey500}/>
        </TouchableOpacity>
          
      </View>

      <View>
       {showCalendar && <Calendar
        minDate={Date()}
        onDayPress={(day) => {selectLastDate(day.dateString)}}
        />}
      </View>

    </View>
    
    
    
  
  </View>


 <View style={style.temp03}> 
    <Text style={style.TitleText} onPress={()=>{console.log("current DBbookmark is  ",DbBookmark,"  current AlarmCycle is   ",alarmCycle)}}>이미지</Text> 
    <View style={style.cameraview}> 
      <Icon name="camera" size={30} color={Colors.grey500}  style = {{position:"absolute", left:140, top:120}} onPress={viewIng}/>
    </View>
 </View>

 </ScrollView>


 </SafeAreaView>
 );

};
export default Ingredients_add;
