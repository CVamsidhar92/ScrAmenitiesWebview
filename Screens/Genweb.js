import React from 'react';
import {Linking} from 'react-native';
import {WebView} from 'react-native-webview';
export default function Genweb() {
 
  return (
    <WebView
      source={{uri: geturl}}
      scrollEnabled={true}
      scalesPageToFit={false}
      onMessage={event => {
        const {data} = event.nativeEvent;
        var getj = JSON.parse(data);
        Linking.openURL(
          'google.navigation:q=' + getj.lat + '+' + getj.lang + '&mode=w',
        );
      }}
    />
  );
}
