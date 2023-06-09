import React, {useState} from 'react';
import {View, Linking, Platform, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Button, Card, Text, List} from 'react-native-paper';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';


export default function AmenitiesList({navigation}) {
  const route = useRoute();
  const {list, geturl} = route.params;
// console.log(geturl);
  const [itemsList, setItemsList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  function goto(longitude, latitude, accuracy) {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = `google.navigation:q=${longitude},${latitude}&accuracy=${accuracy} + '&mode=w' + '&dir_action=navigate`
    Linking.openURL(url);
  }
  const getItemsList = async() => {
     this.loading = true;
    const response = await fetch(
      'https://digitalscr.in/ScrStnAmenities/api/getItemsList',
      {
        method: 'POST',
        body: JSON.stringify({
          amenityType: item.value,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await response.json();
     this.loading = false;
    // console.log(result);
    setItemsList(result);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView>
      <View style={{marginTop: 20}}>
        <Spinner
          visible={this.loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
        <Button
          icon="map"
          style={{margin: 20}}
          mode="contained"
          onPress={() =>
            navigation.navigate('MapsWebView', {
              geturl: geturl,
            })
          }>
          Click Here to View Map
        </Button>
        {list.map((item, index) => (
          <View key={index}>
            <Card style={{margin: 10}}>
              <Card.Content>
                <Text
                  style={{
                    color: 'green',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                  variant="titleLarge">
                  {item.location_name}
                </Text>
                <Text
                  style={{
                    color: 'blue',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                  variant="bodyMedium">
                  {item.location_details}
                </Text>
                <Text variant="bodyMedium">{item.stall_name}</Text>
                <Text variant="bodyMedium">{item.amenity_type}</Text>
                {item.service_type != null ? (
                  <Text variant="bodyMedium">Type: {item.service_type}</Text>
                ) : null}
                {item.tarrif != null ? (
                  <Text variant="bodyMedium">Tarrif: {item.tarrif}</Text>
                ) : null}
              </Card.Content>
              <Card.Actions>
                {item.amenity_type == 'Catering' ? (
                  <Button onPress={() => getItemsList(item.id)}>
                    Items List
                  </Button>
                ) : null}
                {/* <Button onPress={() => goto(item.latitude, item.longitude, item.accuracy)}>
                Directions
              </Button> */}
              </Card.Actions>
            </Card>
          </View>
        ))}

        <View>
          {itemsList.length > 0 ? (
            <Modal isVisible={isModalVisible} style={{background: 'white'}}>
              <View style={{flex: 1}}>
                <Card>
                  <Card.Title title="Catering Menu" />
                  <Card.Content>
                    <ScrollView>
                      {itemsList.map((item, index) => (
                        <List.Item
                          key={index}
                          title={item.item_name}
                          right={() => <Text>Rs.{item.amount}</Text>}
                        />
                      ))}
                    </ScrollView>
                  </Card.Content>
                </Card>
              </View>

              <Button
                mode="contained"
                buttonColor="red"
                onPress={() => setModalVisible(!isModalVisible)}>
                Close
              </Button>
            </Modal>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}
