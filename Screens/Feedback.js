import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { Card, TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

export default function Feedback({ navigation }) {
    const route = useRoute();
    const { selectedStation } = route.params;

    const [pasengerName, setPasengerName] = useState('');
    const [pasengerMobile, setPasengerMobile] = useState('');
    const [trainNo, setTrainNo] = useState('');
    const [pnrNo, setPnrNo] = useState('');
    const [journeyFrom, setJourneyFrom] = useState('');
    const [journeyTo, setJourneyTo] = useState('');
    const [areaRating, setAreaRating] = useState(0);
    const [platformRating, setPlatformRating] = useState(0);
    const [hallRating, setHallRating] = useState(0);
    const [tracksRating, setTracksRating] = useState(0);
    const [bridgeRating, setBridgeRating] = useState(0);
    const [suggestions, setSuggestions] = useState('');

    const hadleSubmit = async () => {
        try {
            let data = {
                pasengerName: pasengerName,
                pasengerMobile: pasengerMobile,
                trainNo: trainNo,
                pnrNo: pnrNo,
                journeyFrom: journeyFrom,
                journeyTo: journeyTo,
                areaRating: areaRating,
                platformRating: platformRating,
                hallRating: hallRating,
                tracksRating: tracksRating,
                bridgeRating: bridgeRating,
                suggestions: suggestions,

            };
            const response = await fetch(
                'https://digitalscr.in/ScrStnAmenities/api/postfeedback',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const result = await response.json();
            console.log("Success:", result);
            if (result == 'success') {
                alert('Feedback Submitted Successfully');
                navigation.navigate('SelectStn');
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (

        <View style={styles.container}>
            <ScrollView>
                <Image
                    style={{
                        resizeMode: 'contain',
                        marginTop: 10,
                        maxHeight: 'auto',
                        maxWidth: '99%',
                        marginHorizontal: 'auto',
                        marginVertical: 'auto',
                        alignSelf: 'center'
                    }}
                    source={require('../images/railmadad.png')}
                />
                <Card style={styles.card}>
                    <Text style={styles.title}>Passenfer Feedback Form</Text>
                    <Text style={styles.title}>{selectedStation.name}</Text>
                    <Text style={styles.title}>Indian Railways On Cleanliness</Text>
                    <Text style={[styles.title, { color: 'blue', fontWeight: 'bold' }]}>Swachh Nharath Mission</Text>
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.title}>Your Valuable advice will hekp us to serve you better. Kindly spare few minutes in rating by giving feedback/suggestions on Cleanliness of {selectedStation.name}.</Text>
                </Card>
                <Card style={styles.card}>
                    <TextInput
                        style={styles.textInput}
                        label="Passenger Name"
                        value={pasengerName}
                        keyboardType="default"
                        onChangeText={pasengerName => setPasengerName(pasengerName)}
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Passenger Mobile Number"
                        value={pasengerMobile}
                        keyboardType="number-pad"
                        onChangeText={pasengerMobile => setPasengerMobile(pasengerMobile)}
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Train No."
                        value={trainNo}
                        keyboardType="number-pad"
                        onChangeText={trainNo => setTrainNo(trainNo)}
                    />
                    <TextInput
                        style={styles.textInput}
                        label="PNR No."
                        value={pnrNo}
                        keyboardType="number-pad"
                        onChangeText={pnrNo => setPnrNo(pnrNo)}
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Journey From"
                        value={journeyFrom}
                        keyboardType="default"
                        onChangeText={journeyFrom => setJourneyFrom(journeyFrom)}
                    />
                    <TextInput
                        style={styles.textInput}
                        label="Journey To"
                        value={journeyTo}
                        keyboardType="default"
                        onChangeText={journeyTo => setJourneyTo(journeyTo)}
                    />
                </Card>
                <Card style={styles.card}>
                    <Text style={styles.heading}>Cleanliness of Circulating Area:</Text>
                    <StarRating
                        style={styles.starRating}
                        rating={areaRating}
                        onChange={setAreaRating}
                    />
                    <Text style={styles.heading}>Cleanliness of Platforms:</Text>
                    <StarRating
                        style={styles.starRating}
                        rating={platformRating}
                        onChange={setPlatformRating}
                    />
                    <Text style={styles.heading}>Cleanliness of Waiting Hall:</Text>
                    <StarRating
                        style={styles.starRating}
                        rating={hallRating}
                        onChange={setHallRating}
                    />
                    <Text style={styles.heading}>Cleanliness of Tracks:</Text>
                    <StarRating
                        style={styles.starRating}
                        rating={tracksRating}
                        onChange={setTracksRating}
                    />
                    <Text style={styles.heading}>Cleanliness of Foot Over Bridge:</Text>
                    <StarRating
                        style={styles.starRating}
                        rating={bridgeRating}
                        onChange={setBridgeRating}
                    />
                </Card>
                <Card>
                    <Text style={styles.heading}>Any other Suggestions to Improve Station Facility....</Text>
                    <TextInput
                        style={styles.suggestions}
                        label="Please Enter Your Suggestions here..."
                        numberOfLines={10}
                        multiline={true}
                        value={suggestions}
                        onChangeText={suggestions => setSuggestions(suggestions)}
                        keyboardType="default"
                    />
                </Card>
                <View
                    style={{
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                        width: '40%',
                        alignSelf: 'center',
                    }}>
                    <Button
                        color="#6A38EB"
                        title="Submit"
                        onPress={hadleSubmit}
                    />

                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textInput: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'blue',
        fontSize: 12,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: 'white',
        marginTop: 5
    },
    title: {
        margin: 2,
        fontSize: 16,
        color: 'black',
        alignSelf: 'center',
    },
    heading: {
        margin: 2,
        fontSize: 16,
        color: 'black',
        alignSelf: 'flex-start',
    },
    suggestions: {
        height: 150,
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        justifyContent: "flex-start",
        borderColor: 'black'
    },
    starRating: {
        alignSelf: 'center'
    }
})