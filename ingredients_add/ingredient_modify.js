import React, { createRef, useEffect, useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Colors } from "react-native-paper";
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SQLite from 'react-native-sqlite-storage';
import PeriodDropDown from './PeriodDropDown';
import Modal from "react-native-modal";

var db = SQLite.openDatabase({ name: 'recipe.db' });

const Ingredients_modify = ({ route, navigation }) => {
    const {name} = route.params;
    viewIng(name);

    const [quantity, setQuantity] = useState(1);
    const quantityUp = useCallback(() => setQuantity((quantity) => { return quantity + 1 }), []);
    const quantityDown = useCallback(() => setQuantity((quantity) => {
        if (quantity >= 2) quantity = quantity - 1;
        return quantity
    }), []);

    const inputRef = createRef();
    const [text, setText] = useState('');

    const [alarmCycle, setAlarmCycle] = useState(0);

    const [min, setMin] = useState(0);
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

    const [detailInfo, setDetailInfo] = useState('');

    const Cancel = () => {
        setModalVisible(!isModalVisible);
        setAlarmCycle(0);
        setMin(0);
        setDbBookmark(0);
      }

    const Save = () => {
        if(selectedValue!=undefined){
            setModalVisible(!isModalVisible);
        }
        modifyAlarm();
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


    function viewIng(name) {
        useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM ingredients',
                [],
                (tx, results) => {
                    var temp = [];

                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                        if (results.rows.item(i).name == name) {
                            console.log("matched with    ", name);

                            if (results.rows.item(i).category == 'fridge') {
                                updateFridge(Colors.grey400);
                                updateFreezer(Colors.white);
                                updateRoom(Colors.white);
                                setCategory('fridge');
                            }
                            else if (results.rows.item(i).category == 'freezer') {
                                updateFridge(Colors.white);
                                updateFreezer(Colors.grey400);
                                updateRoom(Colors.white);
                                setCategory('freezer');
                            }
                            else if (results.rows.item(i).category == 'room') {
                                updateFridge(Colors.white);
                                updateFreezer(Colors.white);
                                updateRoom(Colors.grey400);
                                setCategory('room');
                            }
                            setQuantity(results.rows.item(i).qty);
                            setDbBookmark(results.rows.item(i).bookmark);
                            if (results.rows.item(i).bookmark == 1) {
                                like = true;
                                updateStar("star");
                            }
                            setDetailInfo(results.rows.item(i).info);
                            setAlarmCycle(results.rows.item(i).noti_int);
                            setMin(results.rows.item(i).noti_qty)
                            if (results.rows.item(i).noti_int > 0) {
                                alarm = true;
                                updateAlarm("bell-badge");
                            }
                            setLastDate(results.rows.item(i).expiration);
                            setText(results.rows.item(i).name);

                        }
                    }

                    console.log(temp);
                }

            );
        });
    },[]);
    }

    const updateData = () => {
        console.log('변경할 info', detailInfo)
        db.transaction((tx)=> {
            tx.executeSql(
                'UPDATE ingredients SET qty=?, expiration=?, category=?, info=?, bookmark=?, noti_int=?, noti_qty=? where name=?',
                [quantity, lastDate, category, detailInfo, DbBookmark, alarmCycle, min, text],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);

                    if (results.rowsAffected > 0) {
                        Alert.alert('재료 정보 수정이 완료되었습니다.');
                    } else Alert.alert('재료 정보를 수정하지 못했습니다.');

                }
            );
        });

    }

    return (
        <SafeAreaView>
            <View style={styles.addAndModify}>
            <Text style={styles.TitleText}>추가 및 수정 </Text>
                
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

                <TouchableOpacity style={{ position: "absolute", right: 12, top: 25 }} onPress={updateData}>
                    <Text style={{ fontSize: 15 }}>완료</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.alarmAndLike}>
                <TouchableOpacity onPress={() => { setModalVisible(true); modifyAlarm; }}>
                    <Icon name={alarmImage} size={30} color={Colors.grey500} style={{ margin: 5 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={modifyLike}>
                    <Icon name={starImage} size={30} color={Colors.yellow400} style={{ margin: 5 }} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.detail}>
                    <Text style={styles.TitleText}>이름</Text>
                    <Text style={styles.TitleText}>{text}</Text>
                </View>

                <View style={styles.detail}>
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

                <View style={styles.detail}>
                    <Text style={styles.TitleText}>수량                 </Text>
                    <TouchableOpacity onPress={quantityDown}>
                        <Text style={styles.TitleText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>{quantity}</Text>
                    <TouchableOpacity onPress={quantityUp}>
                        <Text style={styles.TitleText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.detail}>
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

                <View style={styles.detail}>
                    <Text style={styles.TitleText}>상세정보</Text>
                    <TextInput style={[styles.textInputStyle, { flex: 1, height: 300, flexShrink: 1, }]} multiline={true}
                        value={detailInfo}
                        onChangeText={setDetailInfo}
                        onEndEditing={() => console.log("onEndEditing     " + text)}
                        inputRef={inputRef}>
                    </TextInput>
                </View>

            </ScrollView>
        </SafeAreaView>
    );

};


const styles = StyleSheet.create({
    addAndModify: { 
      backgroundColor: 'white', alignContent: "center", flexDirection: "row", justifyContent: "center" 
    },
    alarmAndLike: { 
      backgroundColor: 'white', alignItems: 'flex-end', flexDirection: "row-reverse", padding: 5 
    },
    detail: { 
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
      color: "black", width: 210, backgroundColor: "white", margin: 10, fontSize: 18, borderRadius: 5 
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

export default Ingredients_modify;
