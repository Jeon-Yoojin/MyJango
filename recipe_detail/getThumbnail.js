import React, { useState } from 'react';
import { Text, View } from 'react-native';
import YouTube from 'react-native-youtube';

const GetThumbnail = ()=>{
    const YOUTUBE_API_KEY = {YOUTUBE_API_KEY};
  async function _getThumbnail(query) {
    const optionParams = {
      q: query,
      part: "snippet",
      key: YOUTUBE_API_KEY,
      type: "video",
      maxResults: 10,
      regionCode: "KR",
      videoDuration: "short"
    };
    optionParams.q = encodeURI(optionParams.q);
  
    var url = "https://www.googleapis.com/youtube/v3/search?";
    for (var option in optionParams) {
      url += option + "=" + optionParams[option] + "&";
    }
    console.log(url);
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    };
    let res = await fetch(url, options);
    let resOk = res && res.ok;
    if (resOk) {
      console.log("resOK");
      const resData = await res.json();
      const videoID = resData['items'][0]['id']['videoId'];
      console.log(videoID);
      return(videoID);
    }
    else {
      console.log("resOK false condition");
    }
  }

  const vID = _getThumbnail('마라 마파두부');
  console.log('vID is ', vID);

  return (
    <View style={{margin:15}}>
      <YouTube
        videoId='HDI96vqOHG4'
        apiKey={YOUTUBE_API_KEY}
        play={false}
        fullscreen={false}
        loop={false}
        onReady={(e) => console.log('onReady')}
        onChangeState={(e) => console.log('onChangeState:', e.state)}
        onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
        onError={(e) => console.log('onError: ', e.error)}
        style={{ width: 160, height: 90 }}
      />
    </View>
  );
};

export default GetThumbnail;