// Expo - React
import { Button, Text, TextInput, ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";

// Style
import { Base, Typography } from '../../styles';

export default function AuthFields({auth, setAuth, title, submit, navigation}) {

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!text.match(pattern)) {
            showMessage({
                message: "Ogiltig e-mail",
                description: "En e-mail måste anges i formatet xxxx@xx.xxx",
                type: "warning",
                floating: true
            })
        } else {
            showMessage({
                message: "Godkänd e-mail",
                type: "success",
                floating: true
            });
        }
    }

    function validatePassword(text: string) {

        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/
        // ^                : Start
        // (?=.*\d)         : Digits
        // (?=.*[a-z])      : lower letters
        // (?=.*[A-Z])      : upper letters
        // (?=.*[!\.-\?])   : special characters ("\" för att kunna använda tex punkt)
        // (?=.{4,})        : Length
        // $                : avslutar?
        if (!text.match(pattern)) {
            showMessage({
                message: "Ogiltigt lösenord",
                description: "Lösenordet måste vara minst 4 tecken, innehålla stora och små bokstäver samt siffror och ett specialtecken.",
                type: "warning"
            })
        } else {
            showMessage({
                message: "Godkänt lösenord",
                type: "success"
            });
        }
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Base.form}>E-mail:</Text>
            <TextInput
                style={Base.input}
                onChangeText={(content: string) => {
                    validateEmail(content)
                    setAuth({...auth, email: content})
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={Base.form}>Lösenord:</Text>
            <TextInput 
                style={Base.input}
                onChangeText={(content: string) => {
                    validatePassword(content)
                    setAuth({...auth, password: content})
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button 
                title={title}
                onPress={() => {
                    submit();
                }}
            />
            {title == "Logga in" &&
                <Button 
                    title="Registrera"
                    onPress={() => {
                        navigation.navigate("Register")
                    }}
                />
            }
        </ScrollView>
    );
};
