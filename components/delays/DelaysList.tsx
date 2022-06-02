// Expo - React
import * as Location from "expo-location";

import { useState, useEffect } from 'react';
import { Pressable, Text, View, ScrollView, StyleSheet} from 'react-native';
import MapView, { Marker } from "react-native-maps";

// Models
import delayModel from "../../models/delays";
import stationModel from "../../models/stations";

// Style
import { Base, Typography } from "../../styles";

export default function DelaysList({delays, setDelays, stations, setStations})
{
    const [errorMessage, setErrorMessage] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [currentStation, setCurrentStation] = useState([]);
    const [trainView, setTrainView] = useState(false);

    useEffect(() => {
        (async () => {
            setDelays(await delayModel.getDelays());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setStations(await stationModel.getStations());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setErrorMessage("Permission denied.");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude, 
                    longitude: currentLocation.coords.longitude
                }}
                title="Din plats"
                pinColor="blue"
            />);
        })();
    }, []);

    function createListOfDelay() {
        const delayObject = [];

        for (let i = 0; i < delays.length; i++) {
            const delay = delays[i].FromLocation;

            if (delay !== undefined) {
                const newTime = delays[i].EstimatedTimeAtLocation;
                const location = delay[0].LocationName;
                const train = delays[i].AdvertisedTrainIdent;

                for (let j = 0; j < stations.length; j++) {
                    const stat = stations[j];

                    if (stat.LocationSignature === location) {
                        const station = stat.AdvertisedLocationName;
                        const station_pin = stat.Geometry.WGS84.split(' ');
                        const longitude = parseFloat(station_pin[1].replace('(', ''));
                        const latitude = parseFloat(station_pin[2].replace(')', ''));

                        delayObject.push({acronym: location, station: station, 
                        latitude: latitude, longitude: longitude, train: train, estimated: newTime});
                    }
                }
            }
        }
        return delayObject;
    }

    const listObject = createListOfDelay();
    const delayList = listObject.map((station, index) => {
        return <Marker 
        key={index}
        coordinate={{latitude: station.latitude, longitude: station.longitude}}
        title={station.station}
        description={`Förväntade förseningar`}
        pinColor={'red'}
        onPress={() => {
            setTrainView(true);
            setCurrentStation([station.acronym, station.station]);
        }}/>
    });

    function TrainList() {
        const acro = currentStation[0];
        var allTrains = [];

        for (let i = 0; i < listObject.length; i++) {
            if (listObject[i].acronym === acro) {
                allTrains.push([listObject[i].train, listObject[i].estimated]);
            }
        }

        const newObject = allTrains.map((station, index) => {
            const newDate = station[1].split('T');
            var time = newDate[1].split('.');
            time = time[0];

            return <Text key={index} style={Typography.info2}>
                    Tåg: {station[0]} - Avgår: {time}.
                </Text>
        })
        return newObject;
    }
    
    function TrainView() {
        let trainObject;

        if (trainView) {
            trainObject = <View style={Base.info}>
                            <ScrollView>
                                <Text style={Typography.info}>
                                    {currentStation[1]}
                                </Text>
                                <TrainList />
                                <Pressable style={Base.info} 
                                onPress={() => {
                                    setTrainView(!trainView);
                                }}>
                                    <Text style={Base.button}>Stäng</Text>
                                </Pressable>
                            </ScrollView>
                        </View>
        } else {
            trainObject = <View></View>;
        }
        return trainObject;
    }
    return (
        <View style={Base.base}>
            <MapView
            style={styles.map}
            initialRegion={{
                latitude: 62.0,
                longitude: 15.0,
                latitudeDelta: 17.0,
                longitudeDelta: 7.0,
            }}>
            {delayList}
            {locationMarker}
            </MapView>
            <TrainView />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
