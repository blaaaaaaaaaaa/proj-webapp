// Assets
import railway from '../../assets/images/railway.jpg';

// Expo - React
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ScrollView } from 'react-native';

// Style
import { Base, Typography } from "../../styles";

export default function Home() {

    return (
        <ScrollView>
            <View style={Base.base}>
                <Text style={Typography.header}>Tågtrafiken och förseningar</Text>
                <Image source={railway} style={Typography.image} />
                <Text style={Typography.normal}>Tyvärr uppstår det ibland förseningar och för att underlätta i vardagen när det sker så kan du här se de olika förseningarna som finns samt logga in och spara dina favoriter för framtida bruk.</Text>
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}
