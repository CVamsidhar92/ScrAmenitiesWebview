import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Button, Linking, BackHandler, Alert } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import Spinner from 'react-native-loading-spinner-overlay';

import { useIsFocused } from '@react-navigation/native';

export default function SelectStn({ navigation }) {
  const [stationsList, setStationsList] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');

  const [latestVersion, setLatestVersion] = useState('');
  const [appVersion, setAppVersion] = useState('');
  const [forceUpdateAlertShown, setForceUpdateAlertShown] = useState(false);


  // const [myversion,setmyversion] = useState('1.2');

  // const never forget to change this while releasing app , increment 1 every tiime 
  var myversion = '1.5';
  var isvisible = useIsFocused();
  console.log(isvisible)
  useEffect(() => {
    const getupdates = async () => {

      try {
        console.log(' i am called ')
        var data = { name: myversion };

        const response = await fetch('https://digitalscr.in/ScrStnAmenities/api/appversionamenities', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result1 = await response.json();
        console.log(result1);
        if (myversion !== result1[0]['appversion']) {
          // Check if force update alert has been shown before

          // console.log(result);
          if ('false' !== 'true') {
            // Show force update alert
            console.log('i m insede of alert')
            Alert.alert(
              'Please Update',
              `You must update the app to the latest version to continue using. Latest version is ${result1[0]['appversion']} and your verison is ${myversion}`,
              [
                {
                  text: 'Update',
                  onPress: () => {
                    BackHandler.exitApp();
                    Linking.openURL(result1[0]['update_url']);
                    // Exit app

                  },
                },
              ],
              { cancelable: false }
            );
          }

        }
        else {
          // AsyncStorage.setItem('forceUpdateAlertShown', 'false');
        }

      } catch (error) {
        console.error("Error" + error);
        // alert("something went wrong");
      }

    }

    getupdates();
  },[]);

  useEffect(() => {
    getStationName();
  }, []);

  const getStationName = async () => {
      this.loading=true;
    const response = await fetch(
      'https://digitalscr.in/ScrStnAmenities/api/getstation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    let result = await response.json();
    this.loading=false;
    console.log(result);
    result.map(el => {
      el.name = el.station_name;
      el.title = el.station_name;
    });
    setStationsList(result);
  };

  return (
    <View style={styles.container}>
      <InternetConnectionAlert>
        <Spinner
          visible={this.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.logoContainer}>
          <Image source={require('../images/azadi.png')} style={styles.logo} />
          <Image
            source={require('../images/loginLogo.png')}
            style={styles.logo}
          />
          <Image source={require('../images/g20.jpg')} style={styles.logo} />
        </View>
        <View>
          <View style={{marginTop: '10%'}}>
            <Text
              style={{
                fontSize: 28,
                color: 'blue',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              South Central Railway
            </Text>
            <Text
              style={{
                fontSize: 24,
                color: 'blue',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Station Amenities App
            </Text>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'red',
              textAlign: 'center',
              marginTop: 5,
            }}>
            Please Enter Station Name
          </Text>
          <View style={{margin: 10}}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              onSelectItem={setSelectedStation}
              dataSet={stationsList}
              paddingVertical={true}
              suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
              color="black"
            />
          </View>

          {selectedStation ? (
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                width: '40%',
                alignSelf: 'center',
              }}>
              <Button
                title="Submit"
                color="#6A38EB"
                onPress={() =>
                  navigation.navigate('Home', {
                    selectedStation: selectedStation,
                  })
                }
              />
            </View>
          ) : null}
        </View>
        <Image
          style={{
            resizeMode: 'contain',
            marginTop: '50%',
            bottom: 0,
            maxHeight: 'auto',
            maxWidth: '100%',
            marginHorizontal: 'auto',
            marginVertical: 'auto',
          }}
          source={require('../images/railnilayam.png')}
        />
      </InternetConnectionAlert>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
  },
  logoContainer: {
    top: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 'auto',
  },
  logo: {
    width: 80,
    height: 80,
    marginHorizontal: '8%',
    overflow: 'hidden',
    resizeMode: 'center',
    borderRadius: 150 / 2,
    overflow: 'hidden',
    resizeMode: 'center',
  },
});
