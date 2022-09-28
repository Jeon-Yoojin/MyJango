import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const InButton = (Props) => {
  const { color, setSelect } = Props

  const lack = Props.elements[1].filter(item=>item.type==="lack")
  const enough = Props.elements[1].filter(item=>item.type==="enough")

  const user = Props.elements[0]

  const Button = (Props) => {
    const [color, setcolor] = useState("lightgray");

    const styles = StyleSheet.create({
      btnPress: {
        backgroundColor: "skyblue", borderRadius: 10, margin: 10, fontSize: 18, padding: 3
      },
      btnNormal: {
        backgroundColor: color, borderRadius: 10, margin: 10, fontSize: 18, padding: 3
      }
    });

    //const [isPress, setIsPress] = useState(false);
    const touchProps = {

      style: Props.data.selected ? styles.btnPress : styles.btnNormal,
      onPress: () => {
        //setIsPress(!isPress)
        Props.setSelect(Props.data)
      },

    };


    return (
      <TouchableOpacity {...touchProps} underlayColor='skyblue'>
        <Text style={{ fontSize: 18 }}>{Props.text}</Text>
      </TouchableOpacity>
    )
  };

  return (
    <>
    <View style={styles.ingHalf}>
        {
          lack.map((item, index) => {
            return (
              <Button key={index} data={item} text={item.ingredient} style={{ backgroundColor: color }} setSelect={setSelect} />
            )
          })
        }
      </View>

      <View style={styles.ingHalf}>
        {
          enough.map((item, index) => {
            return (
              <Button key={index} data={item} text={item.ingredient} style={{ backgroundColor: color }} setSelect={setSelect} />
            )
          })
        }
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  ing: {
    flexDirection: 'row', alignContent: 'space-between'
  },
  ingHalf: {
    borderRadius: 10, flexWrap: 'wrap', flexDirection: 'row', flex: 1
  },
})

export default InButton;