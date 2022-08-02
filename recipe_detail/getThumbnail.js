import React, { useState } from 'react';
import { Text, View } from 'react-native';
import YouTube from 'react-native-youtube';

const GetThumbnail = (props)=>{
    const YOUTUBE_API_KEY = 'AIzaSyCZXGI-wPmE6TFf4UWHhBL60BaDdrMS8qU';
  
    console.log('videoId:', props.vId);
  //const vID = _getThumbnail('마라 마파두부');

  return (
    <View style={{margin:5}}>
      <YouTube
        videoId= {props.vId}
        apiKey={YOUTUBE_API_KEY}
        play={false}
        fullscreen={false}
        loop={false}
        onReady={(e) => console.log('onReady')}
        onChangeState={(e) => console.log('onChangeState:', e.state)}
        onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
        onError={(e) => console.log('onError: ', e.error)}
        style={{ width: 208, height: 117}}
      />
    </View>
  );
};

export default GetThumbnail;