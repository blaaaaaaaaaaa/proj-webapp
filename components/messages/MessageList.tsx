// Expo - React
import { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

// Models
import DelayModel from '../../models/delays'
import MessageModel from '../../models/messages'

// Style
import { Base, Typography} from "../../styles";

export default function MessageList({ setDelays }) {
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        setMessages(await MessageModel.getMessages());
    };

    useEffect(() => {
        getMessages();
    }, []);

    const delays = async () => {
        setDelays(await DelayModel.getDelays());
    };

    useEffect(() => {
        delays();
    }, []);

    const listOfMessages = messages.map((message, index) => {
        return (<View key={index} style={Base.base}>
            <Text style={Typography.header4}> {message.Header}</Text>
            <Text style={Typography.header5}>Beskrivning: {message.ReasonCode[0].Description}</Text>
            <Text style={Typography.normal2}>{message.ExternalDescription}</Text>
            <Text style={Typography.breakingpoint}>----------------</Text>
        </View>
        );
    });

    return (
        <ScrollView>
            {listOfMessages}
        </ScrollView>
    );
}
