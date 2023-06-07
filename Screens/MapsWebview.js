import React from 'react'
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';


export default function MapsWebview() {
  this.loading = true;
   const route = useRoute();
   const {geturl} = route.params;
   this.loading = false;
  //  console.log(geturl);
  return (
    <View style={styles.container}>
      <Spinner
        visible={this.loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <WebView
        source={{uri: geturl}} // Set the URL of the website you want to load
        style={styles.webview}
      />
      {/* <WebView
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
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webview: {
      flex: 1,
    },
  });
  