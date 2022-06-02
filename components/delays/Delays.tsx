// Expo - React
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import DelaysList from "./DelaysList";

const Stack = createNativeStackNavigator();

export default function Delays(props) {
    return (
        <Stack.Navigator initialRouteName="Karta över förseningar" screenOptions={{
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerShown: false,
        }}>
            <Stack.Screen name="Karta över förseningar">
                {(screenProps) => <DelaysList 
                {...screenProps}
                stations={props.stations}
                setStations={props.setStations}
                delays={props.delays}
                setDelays={props.setDelays}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
