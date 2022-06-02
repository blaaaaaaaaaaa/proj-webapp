// Components
import MessageList from './MessageList';

// Expo - React
import { StatusBar } from 'expo-status-bar';
import { Text, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Style
import { Base, Typography} from "../../styles";

export default function Messages({ messages, setMessages }) {

    return (
        <SafeAreaView style={Base.base}>
            <ScrollView>
                <Text style={Typography.header3}>Trafikmeddelanden</Text>
                <MessageList messages={messages} setMessages={setMessages} />
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}
