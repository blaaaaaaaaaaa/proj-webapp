// Components
import Auth from './components/auth/Auth';
import Delays from './components/delays/Delays';
import Favorite from './components/favorite/Favorite';
import Home from './components/home/Home';
import Messages from './components/messages/Messages';

// Expo - React
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { useState, useEffect } from 'react';
import FlashMessage from "react-native-flash-message";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Models
import authModel from "./models/auth";
import delayModel from "./models/delays";
import messageModel from "./models/messages";
import stationModel from "./models/stations";

// Style
import { Base } from './styles';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Hem": "home",
  "Förseningar": "time",
  "Meddelanden": "newspaper",
  "Favoriter": "star",
  "Logga in": "lock-open"
};

export default function App() {
    const [messages, setMessages] = useState();
    const [stations, setStations] = useState();
    const [delays, setDelays] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        (async () => {
        setIsLoggedIn(await authModel.loggedIn());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setDelays(await delayModel.getDelays());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setDelays(await messageModel.getMessages());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setStations(await stationModel.getStations());
        })();
    }, []);

    return (
    <SafeAreaView style={Base.base}>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size }) => {
                    let iconName = routeIcons[route.name] || "alert";

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    backgroundColor: 'white',
                },
                headerStyle: {
                    backgroundColor: "navy",
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center'
                })}>
                <Tab.Screen name="Hem">
                    {() => <Home />}
                </Tab.Screen>
                <Tab.Screen name="Förseningar">
                    {() => <Delays stations={stations} setStations={setStations} delays={delays} setDelays={setDelays}/>}
                </Tab.Screen>
                <Tab.Screen name="Meddelanden">
                    {() => <Messages messages={messages} setMessages={setMessages} />}
                </Tab.Screen>
                {isLoggedIn ? 
                <Tab.Screen name="Favoriter">
                    {() => <Favorite setIsLoggedIn={setIsLoggedIn} stations={stations} delays={delays}/>}
                </Tab.Screen> :
                <Tab.Screen name="Logga in">
                    {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                </Tab.Screen>}
            </Tab.Navigator>
        </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}
