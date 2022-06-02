// Expo - React
import { useState } from "react";
import { Button, Pressable, ScrollView, Text, TextInput, View } from "react-native";

// Models
import StationModel from "../../models/stations";

// Style
import { Base, Typography } from "../../styles";

export default function AddFavorite({stations, setFavoriteStation, navigation}) {
    const [searchStat, setSearchStat] = useState([]);
    const [selectStat, setSelectStat] = useState([]);

    function showStation(content: string) {
        var searchList: any = [];

        if (content === "") {
            setSearchStat([]);
            return;
        }
        for (let i = 0; i < stations.length; i++) {
            const acronym = stations[i].LocationSignature;
            const station = stations[i].AdvertisedLocationName;

            if (station.startsWith(content)) {
                searchList.push({station: station, acronym: acronym});
            }
        }
        setSearchStat(searchList);
    }

    async function addStation() {
        await StationModel.addFavoriteStation(selectStat.acronym);
        setFavoriteStation(await StationModel.getFavoriteStation());
        navigation.navigate("Sparade favoriter", {reload: true});
    }

    const favoriteList = searchStat.map((station, index) => {
        return (<Pressable 
                style={Typography.header4}
                key={index}
                onPress={() => {
                    setSelectStat(station);
                }}>
            <Text>{station.station}</Text>
            </Pressable>)
    })

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Sök station:</Text>
                <TextInput style={Base.input}
                    onChangeText={(content: string) => {
                        showStation(content);
                    }}/>
            <ScrollView>
                <View style={Base.button2}>
                <Button
                title="Lägg till favorit"
                    onPress={async () => {
                        addStation();
                    }}></Button>
                {favoriteList}
                </View>
            </ScrollView>
        </View>
    );
};
