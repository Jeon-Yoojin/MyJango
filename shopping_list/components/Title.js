import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Title = () => {

  let today = new Date();

  var weekNumOfMonth = function(date){
    var WEEK_KOR = ["첫째 주", "둘째 주", "셋째 주", "넷째 주", "다섯째 주"];
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
      <View  style={styles.menuIcon}>
      <TouchableOpacity>
        <Icons name="menu" size={30} color={'#000000'}></Icons>
      </TouchableOpacity>

      </View>

  
          <Text style={styles.add}>_____________________________________________</Text>
          <Text style={styles.title}>장보기 List</Text>
          <Text style={styles.seventeen}>{weekNumOfMonth(today)} 리스트</Text>

          </View>
          )
};

const styles = StyleSheet.create({
  add: {
    fontSize:17, color:'#545454', marginBottom:10
  },
  menuIcon: {
    alignItems:'center',marginBottom:-10, margin:5

  },
  title: {
    fontSize:22, fontWeight:'bold', color:'#121214'
  },
  seventeen: {
    fontSize:17, color:'#121214', marginBottom:10
  }
});

export default Title;
