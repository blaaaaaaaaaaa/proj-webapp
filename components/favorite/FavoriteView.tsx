// Expo - React
import { useState, useEffect } from "react";
import { Button, ScrollView, Text, View } from "react-native";

// Models
import Auth from "../../models/auth";

// Style
import { Base, Typography } from "../../styles";

export default function FavoriteView({setIsLoggedIn, stations, delays, favoriteStation, navigation}) {
    const [validFavorite, setValidFavorite] = useState(false);

    useEffect(() => {
        if (favoriteStation.length > 0) {
            setValidFavorite(true);
        }
    }, [])

    async function logOut() {
        Auth.logout();
            setIsLoggedIn(false);
    }

    function ViewFavorite() {
        let a;
        let b;
        let cList = [];
        let dLength;

        for (let i = 0; i < favoriteStation.length; i++) {
            a = favoriteStation[i].artefact;
            for (let j = 0; j < stations.length; j++) {
                if (stations[j].LocationSignature === a) {
                    b = stations[j].AdvertisedLocationName;
                    cList.push([
                    <Text key={j} style={Typography.header4}>
                        {b}
                    </Text>
                    ])
                    dLength = cList.length;
                }
            }
            if (dLength === cList.length) {
                cList.push([<Text key={i} style={Typography.normal}>Här finns det inga förseningar!</Text>])
            }
            for (let y = 0; y < delays.length; y++) {
                if (delays[y].FromLocation !== undefined && delays[y].FromLocation[0].LocationName === a) {
                    const trainNumber = delays[y].AdvertisedTrainIdent;
                    const firstTime = delays[y].AdvertisedTimeAtLocation;
                    const newTime = delays[y].EstimatedTimeAtLocation;
                    const aTime = firstTime.split('T');
                    const bTime = newTime.split('T');
                    var xTime = aTime[1].split('.');
                    var yTime = bTime[1].split('.');
                    xTime = xTime[0];
                    yTime = yTime[0];

                    cList.push([
                    <Text key={y} style={Typography.info3}>
                        Tågnummer: {trainNumber}
                    </Text>,
                    <Text key={y+100} style={Typography.info3}>
                        Ursprunglig avgångstid: {xTime}
                    </Text>,
                    <Text key={y+1000} style={Typography.info3}>
                        Ny avgångstid: {yTime}
                    </Text>,
                    <Text key={y+10000} style={Typography.info3}>
                        -------
                    </Text>]
                    );
                }
            }
        }
        if (favoriteStation.length === 0) {
            cList.push([<Text key={"a"} style={Typography.normal}>Det finns inga favoriter än!</Text>])
        }
        return cList;
    }
    return (
        <View style={Base.base}>
            <View style={Typography.header}>
                <ScrollView>
                    <ViewFavorite />
                </ScrollView>
                <View style={Base.button2}>
                    <Button
                        title="Lägg till favorit"
                        onPress={async () => {
                            navigation.navigate('Lägg till favorit');
                        }}>
                    </Button>
                </View>
                <View style={Base.button3}>
                    <Button
                        title="Logga ut"
                        onPress={async () => {
                            await logOut();
                        }}>
                    </Button>
                </View>
            </View>
        </View>
    );
};
