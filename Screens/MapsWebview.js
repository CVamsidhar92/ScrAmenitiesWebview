import React from 'react'
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';


export default function MapsWebview() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.google.com/maps/d/edit?mid=1WWRZut_VjVSzDN1V9YkIHy2mRX3seQg&usp=sharing' }} // Set the URL of the website you want to load
        style={styles.webview}
      />
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
  