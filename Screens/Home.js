import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Linking
}
  from 'react-native';
import { Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';


export default function Home({ navigation }) {
  const route = useRoute();
  const { selectedStation } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
const [mapView,setMapView] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const data = [
    {
      id: '001',
      title: 'ATVMs',
      value: 'ATVMs',
      image: require('../images/atvms.jpeg'),
    },
    {
      id: '002',
      title: 'Booking Counter',
      value: 'Booking Counter',
      image: require('../images/booking.jpeg'),
    },
    {
      id: '003',
      title: 'PRS Counter',
      value: 'PRS Counter',
      image: require('../images/prs.jpeg'),
    },
    {
      id: '004',
      title: 'Parcel Office',
      value: 'Parcel Office',
      image: require('../images/pr.jpg'),
    },
    {
      id: '005',
      title: 'Waiting Hall',
      value: 'Waiting Hall',
      image: require('../images/wh.jpg'),
    },
    {
      id: '006',
      title: 'Divyangjan Facility',
      value: 'Divyangjan Facility',
      image: require('../images/dv.jpg'),
    },
    {
      id: '007',
      title: 'Parking',
      value: 'Parking',
      image: require('../images/parking.jpg'),
    },
    {
      id: '008',
      title: 'Out Gates',
      value: 'Out Gates',
      image: require('../images/outgate.jpg'),
    },
    {
      id: '009',
      title: 'Stair Case',
      value: 'Stair Case',
      image: require('../images/str.jpeg'),
    },
    {
      id: '010',
      title: 'Escalator',
      value: 'Escalator',
      image: require('../images/esc.jpeg'),
    },
    {
      id: '011',
      title: 'Lift',
      value: 'Lift',
      image: require('../images/lift.jpeg'),
    },
    {
      id: '012',
      title: 'Cloak Rooms',
      value: 'Cloak Rooms',
      image: require('../images/cr.jpeg'),
    },
    {
      id: '013',
      title: 'Drinking Water',
      value: 'Drinking Water',
      image: require('../images/dw.jpeg'),
    },
    {
      id: '014',
      title: 'Catering Stall',
      value: 'Catering',
      image: require('../images/catg.jpeg'),
    },
    {
      id: '015',
      title: 'Medical',
      value: 'Medical',
      image: require('../images/medical.jpeg'),
    },
    {
      id: '016',
      title: 'Retiring Room',
      value: 'Retiring Room',
      image: require('../images/rr.jpg'),
    },
    {
      id: '017',
      title: 'Bus Stop',
      value: 'Bus Stop',
      image: require('../images/bus.jpg'),
    },
    {
      id: '018',
      title: 'Feedback',
      value: 'Feedback',
      image: require('../images/feed.jpg'),
    },
  ];

  const selectAmenity = async item => {
    try {
      this.loading = true;
      const response = await fetch(
        
        'https://digitalscr.in/ScrStnAmenities/api/getstalldetails',
        {
          method: 'POST',
          body: JSON.stringify({
            stnName: selectedStation.name,
            amenityType: item.value,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
       const response2 = await fetch(
        
         'https://digitalscr.in/ScrStnAmenities/api/getmapurl',
         {
           method: 'POST',
           body: JSON.stringify({
             station: selectedStation.name,
             amenityType: item.value,
           }),
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
           },
         },
       );
       const result = await response2.json();

      const result1 = await response.json();
      this.loading = false;
      //  console.log(result);
      setSelectedAmenity(result1);
      if (result1.length > 0 ) {
        setLocationsList(result1);
        // console.log(locationsList);

        navigation.navigate('AmenitiesList',{list:result1, geturl:result[0]['url']});
        // setModalVisible(true);
        console.log(result);
      }
      else if (item.value == 'Feedback') {
        navigation.navigate('Feedback', {
          selectedStation: selectedStation,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showAmenitiesList = () => {
    // console.log(location);
    // toggleModal();
    navigation.navigate('AmenitiesList', {
      list: selectedAmenity
    });
  };

  return (
    <View style={sty.container}>
      <Spinner
        visible={this.loading}
        textContent={'Loading...'}
        textStyle={sty.spinnerTextStyle}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          alignSelf: 'center',
          color: 'blue',
        }}>
        {'Welcome To ' + selectedStation.name}
      </Text>
      <ScrollView>
        <View style={sty.itemContainer}>
          {data.map((item, index) => (
            <View style={sty.item} key={index}>
              <TouchableOpacity
                style={sty.item}
                onPress={() => selectAmenity(item)}>
                <Image
                  source={item.image}
                  style={sty.img1}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <Text style={sty.title}>{item.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView>
        <View>
          {selectedAmenity.length > 0 ? (
            <ScrollView>
              <Modal isVisible={isModalVisible}>
                <View style={{flex: 1}}>
                  {selectedAmenity[0].amenity_type == 'ATVMS' ? (
                    <Text
                      style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {' '}
                      Automatic Ticket Vending Machine
                    </Text>
                  ) : null}
                  {selectedAmenity[0].amenity_type == 'PRS Counter' ? (
                    <Text
                      style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {' '}
                      Passenger Reservation System
                    </Text>
                  ) : null}
                  {selectedAmenity[0].amenity_type != 'ATVMS' &&
                  selectedAmenity[0].amenity_type != 'PRS Counter' ? (
                    <Text
                      style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {' '}
                      {selectedAmenity[0].amenity_type}
                    </Text>
                  ) : null}

                  {locationsList.map((item, index) => (
                    <Button
                      key={index}
                      style={{marginTop: 10}}
                      mode="contained"
                      onPress={() => showAmenitiesList(item)}>
                      {item}
                    </Button>
                  ))}
                </View>

                <Button
                  mode="contained"
                  buttonColor="red"
                  onPress={() => setModalVisible(!isModalVisible)}>
                  Close
                </Button>
              </Modal>
            </ScrollView>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const sty = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  itemContainer: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
  },
  item: {
    flex: 1,
    minWidth: 100,
    maxWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    height: 100,
    shadowOpacity: 0.5,
    borderRadius: 10,
    elevation: 2,
    color: 'black',
    width: '100%',
    margin: 5,
  },

  img: {
    width: undefined,
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 20,
  },
  img1: {
    width: undefined,
    height: '70%',
    aspectRatio: 2,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  container: {
    marginTop: 15,
    width: '98%',
  },

  title: {
    marginTop: -3,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});
