import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import ProgressCircle from 'react-native-progress/Circle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TesseractOcr, {
  LANG_KOREAN,
  useEventListener,
} from 'react-native-tesseract-ocr';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function Tesseract({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState([]);
  const [wordsForLine, setWordsForLine] = useState([]);
  useEventListener('onProgressChange', (p) => {
    setProgress(p.percent / 100);
  });

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const tesseractOptions = {};
      const recognizedText = await TesseractOcr.recognize(
        path,
        LANG_KOREAN,
        tesseractOptions,
      );
      setText(recognizedText.split("\n"));
    } catch (err) {
      console.error(err);
      setText('');
    }

    setIsLoading(false);
    setProgress(0);
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  function addNewIngredient(name, qty){
    navigation.navigate('INGREDIENTS_ADD', {
      name: name,
      qty: qty
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>영수증 인식</Text>
      {!(imgSrc)&&(
      <View style={{display:'flex', flex: 1}}>
      <View style={styles.guide_container}>
      <Text style={styles.guide}>정확한 인식을 위해서{'\n'}✅ 이미지가 흐릿하지 않은지 확인해주세요!{'\n'}✅ 이미지의 수평을 맞춰 주세요!</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity disabled={isLoading}
          onPress={() => {
            recognizeFromCamera();
          }}
          style={[styles.icon, {backgroundColor: 'rgb(225, 97, 95)'}]}>
          <View style={styles.antdesign}>
          <AntDesign name="camera" color='white' size={40}></AntDesign>
          </View>
        </TouchableOpacity>
        <Text style={{fontSize:16}}>카메라{'\n'}</Text>
        <TouchableOpacity disabled={isLoading}
          onPress={() => {
            recognizeFromPicker();
          }}
          style={[styles.icon, {backgroundColor: '#CACACA'}]}>
          <View style={styles.antdesign}>
          <AntDesign name="picture" color='white' size={40}></AntDesign>
          </View>
        </TouchableOpacity>
        <Text style={{fontSize:16}}>갤러리</Text>
        </View>
      </View>
      )}
      {imgSrc && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imgSrc} />
          {isLoading ? (
            <ProgressCircle showsText progress={progress} />
          ) : (
            <ScrollView>
                {text.map((t, index) => {
                  return (t?
                    <View key={index} style={{flexDirection:'row', flex:1, justifyContent:'space-between'}}>
                      <Text style={{margin:10}} key={index}>{t}</Text>
                      <Button disabled={isLoading} title="추가" color={'#BCBCBC'}
                        onPress={() => {
                          console.log('clicked button');
                          words = t.split(" ")
                          if(words){
                          ingd_name = words[0]
                          console.log('name은', words[0])

                          ingd_qty = words[words.length - 2]
                          console.log('수량은', words[words.length - 2])

                          addNewIngredient(ingd_name, ingd_qty);
                          }
                        }
                        } /></View> : <Text>Loading...</Text>)
                })
                }
              
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
  },
  options: {
    display:'flex',
    flex:1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 50
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WITH / 2.5,
  },
  title: {
    marginTop: 20,
    marginLeft: 18,
    marginRight: 14,
    justifyContent:'flex-start',
    fontFamily: 'Noto Sans',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 40,
    letterSpacing: -0.03,
    color: '#121214'
  },
  guide_container:{
    justifyContent:'center',
    alignItems:'center',
    marginTop: 60,
  },
  guide: {
    fontSize:17,
    color:'#808080',
    alignContent:'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  icon:{
    width: 130,
    height: 95,
    borderRadius: 10,
    
  },
  antdesign:{
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  }
});

export default Tesseract;
