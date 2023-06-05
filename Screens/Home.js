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

export default function Home({ navigation }) {
  const route = useRoute();
  const { selectedStation } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState([]);
  const [locationsList, setLocationsList] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const data = [
    {
      id: '001',
      title: 'ATVMs',
      value: 'ATVMs',
      image: require('../images/atvms.jpeg'),
      url:'https://www.google.com/maps/d/edit?mid=1lPOYwxtlcVHBaEcvQ5iGd-xiLK3L01I&usp=sharing'    
    },
{
  id: '002',
    title: 'Booking Counter',
      value: 'Booking Counter',
        image: require('../images/booking.jpeg'),
        url:'https://www.google.com/maps/d/edit?mid=1_FjMBWgQQw_WE1Uqnczs2xTQIGFZO1c&usp=sharing'
    },
{
  id: '003',
    title: 'PRS Counter',
      value: 'PRS Counter',
        image: require('../images/prs.jpeg'),
        url:'https://www.google.com/maps/d/edit?mid=158-IQSsQd33ncfcH5rD3G_suKwheXU4&usp=sharing'
    },
{
  id: '004',
    title: 'Parcel Office',
      value: 'Parcel Office',
        image: require('../images/pr.jpg'),
        url:'https://www.google.com/maps/d/edit?mid=1cYXIjM8DWdVgEMuSXiKgVp7MacX8F9Q&usp=sharing'
    },
{
  id: '005',
    title: 'Waiting Hall',
      value: 'Waiting Hall',
        image: require('../images/wh.jpg'),
        url:'https://www.google.com/maps/d/edit?mid=1vt9RK7JKb7n98f6AB1LigZGVTMGnRtQ&usp=sharing'
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
        url:'https://www.google.com/maps/d/edit?mid=1H6zbnArI3i407iRkAFTGJnGmP66N1xE&usp=sharing'
    },
{
  id: '008',
    title: 'Out Gates',
      value: 'Out Gates',
        image: require('../images/outgate.jpg'),
        url:'https://www.google.com/maps/d/edit?mid=1whPq1L2DNEBXGshbIWNITbBap5ER9Xs&usp=sharing'
    },
{
  id: '009',
    title: 'Stair Case',
      value: 'Stair Case',
        image: require('../images/str.jpeg'),
        url:'https://www.google.com/maps/d/edit?mid=1TBMck2mdbRkJM6N4nEHMqofkmbHTGo0&usp=sharing'
    },
{
  id: '010',
    title: 'Escalator',
      value: 'Escalator',
        image: require('../images/esc.jpeg'),
        url:'https://www.google.com/maps/d/edit?mid=1yRBX1kmR574Ure9YgNej1mXDXzMM55Q&usp=sharing'
    },
{
  id: '011',
    title: 'Lift',
      value: 'Lift',
        image: require('../images/lift.jpeg'),
        url:'https://www.google.com/maps/d/edit?mid=1OF74XYpg8Eb6rJeontjiX6dRPio8S0A&usp=sharing'
    },
{
  id: '012',
    title: 'Cloak Rooms',
      value: 'Cloak Rooms',
        image: require('../images/cr.jpeg'),
        url:'https://www.google.com/maps/d/edit?mid=1k2ZE680MA-pBNricCOAIyHmxYQOSgYQ&usp=sharing'
    },
{
  id: '013',
    title: 'Drinking Water',
      value: 'Drinking Water',
        image: require('../images/dw.jpeg'),
        url:'https://www.google.com/maps/d/edit?mid=1qtXSLY9sF-dmP1nyXOh-VJAG4DyhTSU&usp=sharing'
    },
{
  id: '014',
    title: 'Catering Stall',
      value: 'Catering',
        image: require('../images/catg.jpeg'),
        url: 'https://www.google.com/maps/d/edit?mid=1JmQ8yRBj55_fBMo901kS1KhhoZrvFX4&usp=sharing'
    },
{
  id: '015',
    title: 'Medical',
      value: 'Medical',
        image: require('../images/medical.jpeg'),
        url:'https://www.google.com/maps/d/edit?mid=1BUmL34Y7EbSK25V4r4QW_3qT73PNl2M&usp=sharing'
    },
{
  id: '016',
    title: 'Retiring Room',
      value: 'Retiring Room',
        image: require('../images/rr.jpg'),
        url:'https://www.google.com/maps/d/edit?mid=1fGRdw7px7MNqaQchnaGFV9mzOE5c7Ws&usp=sharing'
    },
{
  id: '017',
    title: 'Bus Stop',
      value: 'Bus Stop',
        image: require('../images/bus.jpg'),
          url: 'https://www.google.com/maps/d/edit?mid=1e92_74dZpk_QnXZHjLZufRwX_EUuiQs&usp=sharing'

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
    const result = await response.json();
    console.log(result);
    setSelectedAmenity(result);
    navigation.navigate('MapsWebView', { geturl: item.url });
    // if (result.length > 0) {
    //     navigation.navigate('Feedback', {
    //       selectedStation: selectedStation,
    //     });
    //   // setLocationsList([...new Set(result.map(item => item.location_name))]);
    //   // console.log(locationsList);
    //   // setModalVisible(true);
    // }
    if (item.value == 'Feedback') {
      navigation.navigate('Feedback', {
        selectedStation: selectedStation,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const showAmenitiesList = location => {
  console.log(location);
  toggleModal();
  navigation.navigate('AmenitiesList', {
    list: selectedAmenity.filter(el => {
      return el.location_name == location;
    }),
  });
};


function MapsWebView(url) {
  console.log('im called')
  navigation.navigate('MapsWebView', { geturl: url });
}
return (
  <View style={sty.container}>
    <Text
      style={{
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'blue'
      }}>
      {'Welcome To ' + selectedStation.name}
    </Text>
    <ScrollView>
      <View style={sty.itemContainer}>
        {data.map(item => (
          <View style={sty.item} key={item.id}>
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
              <View style={{ flex: 1 }}>
                {selectedAmenity[0].amenity_type == 'ATVMS' ? (
                  <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 18 }}> Automatic Ticket Vending Machine</Text>
                ) : null}
                {selectedAmenity[0].amenity_type == 'PRS Counter' ? (
                  <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 18 }}> Passenger Reservation System</Text>
                ) : null}
                {selectedAmenity[0].amenity_type != 'ATVMS' && selectedAmenity[0].amenity_type != 'PRS Counter' ? (
                  <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 18 }}> {selectedAmenity[0].amenity_type}</Text>)
                  : null}


                {locationsList.map((item, index) => (
                  <Button
                    key={index}
                    style={{ marginTop: 10 }}
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
