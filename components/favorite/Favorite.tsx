// Components
import AddFavorite from "./AddFavorite";
import FavoriteView from "./FavoriteView";

// Expo - React
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Models
import StationModel from "../../models/stations";

const Stack = createNativeStackNavigator();

export default function Favorite(props) {
    const [favoriteStation, setFavoriteStation] = useState([]);

    useEffect(() => {
        (async () => {
            setFavoriteStation(await StationModel.getFavoriteStation());
        })();
    }, []);

    return (
        <Stack.Navigator initialRouteName="Sparade favoriter" screenOptions={{
            headerStyle: {
            backgroundColor: "lightblue",
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Sparade favoriter">
                {(screenProps) => <FavoriteView
                {...screenProps}
                setIsLoggedIn={props.setIsLoggedIn}
                stations={props.stations}
                setStations={props.setStations}
                delays={props.delays}
                setDelays={props.setDelays}
                favoriteStation={favoriteStation}
                />}
            </Stack.Screen>
            <Stack.Screen name="Lägg till favorit">
                {(screenProps) => <AddFavorite
                {...screenProps}
                setIsLoggedIn={props.setIsLoggedIn}
                stations={props.stations}
                setStations={props.setStations}
                delays={props.delays}
                setDelays={props.setDelays}
                favoriteStation={favoriteStation}
                setFavoriteStation={setFavoriteStation}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
