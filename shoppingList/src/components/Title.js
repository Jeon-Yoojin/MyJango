import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Title = () => {

  let today = new Date();

  var weekNumOfMonth = function(date){
    var WEEK_KOR = ["첫째주", "둘째주", "셋째주", "넷째주", "다섯째주"];
    var THURSDAY_NUM = 4;
    var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var firstDayOfWeek = firstDate.getDay();

    var firstThursday = 1 + THURSDAY_NUM - firstDayOfWeek;
    if(firstThursday <= 0){
      firstThursday = firstThursday + 7;
    }
    var untilDateOfFirstWeek = firstThursday-7+3;	
    var weekNum = Math.ceil((date.getDate()-untilDateOfFirstWeek) / 7) - 1;

    if(weekNum < 0){
      var lastDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 0);
       var result = Util.Date.weekNumOfMonth(lastDateOfMonth);
       return result;
    }

    return [(date.getMonth()+1)+'월 ', WEEK_KOR[weekNum] ];


  }


  return (
    <View>
      <TouchableOpacity style={styles.menuIcon}>
        <Icons name="menu" size={30} color={'#000000'}></Icons>
      </TouchableOpacity>
  
          <Text style={[styles.add, {left:14, top:-15}]}>__________________________________________</Text>
          <Text style={[styles.title, {left:14}]}>장보기 List</Text>
          <Text style={[styles.seventeen, {left:14, top:10}]}>{weekNumOfMonth(today)}</Text>

          </View>
          )
};

const styles = StyleSheet.create({
  add: {
    fontSize:17, color:'#545454'
  },
  menuIcon: {
    position:'relative', left:150, margin:5
  },
  title: {
    fontSize:22, position:"relative", fontWeight:'bold', color:'#121214'
  },
  seventeen: {
    fontSize:17, color:'#121214', position:"relative", 
  }
});

export default Title;
