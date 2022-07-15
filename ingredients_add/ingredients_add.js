import React, { createRef, useEffect, useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Colors } from "react-native-paper";
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DelayInput from 'react-native-debounce-input';
import SQLite from 'react-native-sqlite-storage';
import PeriodDropDown from './PeriodDropDown';
import Modal from "react-native-modal";

var db = SQLite.openDatabase({ name: 'recipe.db' });

const Ingredients_add = ({ route, navigation }) => {
  const { name } = route.params ? route.params : '';
  const { qty } = route.params ? route.params : 1;

  const [quantity, setQuantity] = useState(qty ? qty : 1);
  const quantityUp = useCallback(() => setQuantity((quantity) => { return quantity + 1 }), []);
  const quantityDown = useCallback(() => setQuantity((quantity) => {
    if (quantity >= 2) quantity = quantity - 1;
    return quantity
  }), []);

  const inputRef = createRef();
  const [text, setText] = useState(name ? name : '');
  const allClear = () => {
    setText('');
    inputRef.current.clear();
  };
  function qtyClear(){
    useEffect(()=>{setQuantity(1);},[])
  };

  const [alarmCycle, setAlarmCycle] = useState(0);

  const [min, setMin] = useState(1);
  const minUp = useCallback(()=>setMin((min) => {return min+1}), []);
  const minDown = useCallback(()=>setMin((min) => { 
    if(min >= 2 ) min = min-1;
    return min}), []);

  const [category, setCategory] = useState('');
  const selectCategory = useCallback((cg) => setCategory((category) => { category = cg; return category; }), []);

  const [showCalendar, setShowCalendar] = useState(false);
  const changeShowCalendar = useCallback(() => setShowCalendar((showCalendar) => { return !showCalendar }), []);

  const [lastDate, setLastDate] = useState('          ');
  const selectLastDate = useCallback((sld) => setLastDate((lastDate) => { lastDate = sld; return lastDate; }), []);

  const [isModalVisible, setModalVisible] = useState(false);
  const Cancel = () => {
    setModalVisible(!isModalVisible);
    setAlarmCycle(0);
    setMin(1);
    setDbBookmark(0);
  }
  const Save = () => {
    if(selectedValue!=undefined){
      setModalVisible(!isModalVisible);
    }
  };

  const [selectedValue, setSelectedValue] = useState();
  const setSelectValue = (selectvalue)=>{
    setSelectedValue(selectvalue);
    setAlarmCycle(selectvalue);
  }

  let like = false;
  const [DbBookmark, setDbBookmark] = useState(0);
  const [starImage, updateStar] = useState(like ? "star" : "star-outline");
  const modifyLike = useCallback(() => {
    if (like) {
      like = false;
      updateStar("star-outline");
      setDbBookmark(0);
    }
    else {
      like = true;
      updateStar("star");
      setDbBookmark(1);
    }
  }, []);

  let alarm = false;
  const [alarmImage, updateAlarm] = useState(alarm ? "bell-badge" : "bell-badge-outline");
  const modifyAlarm = useCallback(() => {
    if (alarm) {
      alarm = false;
      updateAlarm("bell-badge-outline");
      //나중에 알람 취소하는 무언가
    }
    else {
      alarm = true;
      updateAlarm("bell-badge");
    }
  }, []);

  let fridge = false;
  const [fridgeSelect, updateFridge] = useState(fridge ? Colors.grey400 : Colors.white);
  const modifyFridge = useCallback(() => {
    if (fridge) {
      fridge = false;
      updateFridge(Colors.white);
      selectCategory(' ');
    }
    else {
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
    if (freezer) {
      freezer = false;
      updateFreezer(Colors.white);
      selectCategory(' ');
    }
    else {
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
    if (room) {
      room = false;
      updateRoom(Colors.white);
      selectCategory(' ');
    }
    else {
      room = true;
      fridge = false;
      freezer = false;
      updateRoom(Colors.grey400);
      updateFridge(Colors.white);
      updateFreezer(Colors.white);
      selectCategory('room');
    }
  }, []);


  const insertData = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'CREATE TABLE if not exists ingredients (id INTEGER, name	TEXT NOT NULL, qty INTEGER, expiration TEXT, category INTEGER, bookmark INTEGER, notify INTEGER)',
        [],
        (tx, results) => {
        }
      );

    })

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO ingredients (name, qty, expiration, category, bookmark, notify) VALUES (?,?,?,?,?,?)',
        [text, quantity, lastDate, category, DbBookmark, alarmCycle],
        (tx, results) => {
          console.log('Results', results.rowsAffected);

          if (results.rowsAffected > 0) {
            console.log('변경완료')
            Alert.alert('재료 추가가 완료되었습니다.');
            navigation.pop();
          } else Alert.alert('재료를 추가하지 못했습니다.');


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

  return (
    <SafeAreaView>

      <View style={styles.temp01}>
        <Text style={styles.TitleText} >추가 및 수정 </Text>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>알림 설정</Text>
            <Text style={styles.explaination}>재고가 몇 개 미만 일때 며칠마다 알림을 받을지 설정합니다.</Text>
            <Text style={[styles.seventeen, {left:22, top:165}]}>재고 개수</Text>

            <View style={styles.grey}>
              <TouchableOpacity onPress={minDown}>
                <Text style={styles.min}>-</Text>
              </TouchableOpacity>
              <Text style={styles.min}>{min}</Text>
              <TouchableOpacity onPress={minUp}>
                <Text style={styles.min}>+</Text>
              </TouchableOpacity>
            </View>
     
            <Text style={[styles.seventeen, {left:22, top:165}]}>기간</Text>
            <View style={styles.dropdownview}>
              <PeriodDropDown setSelectValue={setSelectValue}></PeriodDropDown>
            </View>
      
            <View style={styles.addcan}>
              <TouchableOpacity style={styles.red} onPress={Save}>
                <Text style={styles.white}>저장하기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelO} onPress={Cancel}>
                <Text style={styles.fourteen}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={{ position: "absolute", right: 12, top: 25 }} onPress={insertData}>
          <Text style={{ fontSize: 15 }}>저장</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.temp02}>
        <TouchableOpacity onPress={() => { setModalVisible(true); modifyAlarm; }}>
          <Icon name={alarmImage} size={30} color={Colors.grey500} style={{ margin: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={modifyLike}>
          <Icon name={starImage} size={30} color={Colors.yellow400} style={{ margin: 5 }} />
        </TouchableOpacity>
      </View>

      <ScrollView>

        <View style={styles.temp03}>
          <Text style={styles.TitleText}>이름</Text>
          <DelayInput style={styles.textInputStyle}
            value={text}
            onChangeText={setText}
            inputRef={inputRef}>
          </DelayInput>
          <TouchableOpacity style={{ position: "absolute", right: 25, top: 21 }} onPress={allClear}>
            <Icon name="close-circle" size={30} color={Colors.grey500} />
          </TouchableOpacity>

        </View>

        <View style={styles.temp03}>
          <Text style={styles.TitleText}>보관         </Text>
          <TouchableOpacity style={{ backgroundColor: fridgeSelect }} onPress={modifyFridge}>
            <Text style={styles.TitleText}>냉장</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: freezerSelect }} onPress={modifyFreezer}>
            <Text style={styles.TitleText}>냉동</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: roomSelect }} onPress={modifyRoom}>
            <Text style={styles.TitleText}>실온</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.temp03}>
          <Text style={styles.TitleText}>수량                 </Text>
          <TouchableOpacity style={{ position: "absolute", right: 25, top: 21 }} onPress={qtyClear()}>
            <Icon name="close-circle" size={30} color={Colors.grey500} />
          </TouchableOpacity>
          <TouchableOpacity onPress={quantityDown}>
            <Text style={styles.TitleText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.TitleText}>{quantity}</Text>

          <TouchableOpacity onPress={quantityUp}>
            <Text style={styles.TitleText}>+</Text>
          </TouchableOpacity>

        </View>



        <View style={styles.temp03}>
          <Text style={styles.TitleText}>유통기한</Text>
          <View>




            <View style={styles.expireddate}>
              <Text style={{ fontSize: 20 }}>{lastDate}</Text>
              <TouchableOpacity onPress={changeShowCalendar}>
                <Icon name="calendar-range" size={30} color={Colors.grey500} />
              </TouchableOpacity>

            </View>

            <View>
              {showCalendar && <Calendar
                minDate={Date()}
                onDayPress={(day) => { selectLastDate(day.dateString) }}
              />}
            </View>

          </View>




        </View>


        <View style={styles.temp03}>
          <Text style={styles.TitleText} onPress={() => { console.log("current DBbookmark is  ", DbBookmark, "  current AlarmCycle is   ", alarmCycle, "current Min is", min) }}>이미지</Text>
          <View style={styles.cameraview}>
            <Icon name="camera" size={30} color={Colors.grey500} style={{ position: "absolute", left: 140, top: 120 }} onPress={() => { navigation.navigate('TESSERACT') }} />
          </View>
        </View>
      </ScrollView>


    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  temp01: { 
    backgroundColor: 'white', alignContent: "center", flexDirection: "row", justifyContent: "center" 
  },
  temp02: { 
    backgroundColor: 'white', alignItems: 'flex-end', flexDirection: "row-reverse", padding: 5 
  },
  temp03: { 
    backgroundColor: 'white', alignContent: "center", flexDirection: "row" 
  },
  expireddate: { 
    flexDirection: 'row', justifyContent: 'space-between', padding: 3, marginTop: 15, width: 260 
  },
  cameraview: { 
    width: 300, height: 300, backgroundColor: 'white' 
  },
  TitleText: { 
    textAlign: "center", fontWeight: 'bold', margin: 20, fontSize: 20 
  },
  textInputStyle: { 
    width: 210, height: 50, backgroundColor: "white", margin: 10 
  },
  modalView: {
    height:'75%', backgroundColor:'white'
  },
  modalTitle: {
    fontSize:22, position:"relative", fontWeight:'bold', color:'#121214', left:22, top:100
  },
  explaination: {
    fontSize:17, position:"relative", left:37, top:135, width:278, color:'#545454'
  },
  grey: {
   paddingHorizontal:50, paddingVertical:6, position:"relative", left:111, top:130, marginVertical:6, width:230, height:38, borderRadius:10, backgroundColor: '#FCFCFC', flexDirection:"row", justifyContent:"space-between" 
  },
  dropdownview: {
    position:'relative', left:111, top:130, width:217
  },
  min: {
    fontSize:17, color:'#545454'
  },
  seventeen: {
    fontSize:17, color:'#121214', position:'relative'
  },
  fourteen: {
    fontSize:14, color:'#121214', textAlign:"center"
  },
  cancelO: {
    width:50, height:38,borderRadius:5, backgroundColor: '#EFEFEF', paddingTop:8, marginLeft:20
  },
  addcan: {
    flexDirection:'row',marginLeft:178, marginTop:20, position:'relative', left:20, top:150,
  },
  red: {
    width:71, height:38, borderRadius:5, position:'relative', backgroundColor: '#FF5454', padding:8
  },
  white: {
    color:'white', fontSize:14, textAlign:"center"
  }
});


export default Ingredients_add;
