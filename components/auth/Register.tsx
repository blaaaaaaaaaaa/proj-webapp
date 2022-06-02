// Components
import AuthFields from "./AuthFields";

// Expo - React
import { useState } from "react";
import { showMessage } from "react-native-flash-message";

// interfaces
import Auth from "../../interfaces/auth";

// Models
import AuthModel from "../../models/auth";

export default function Register({ navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);
            navigation.navigate("Login");
        } else {
            showMessage({
                message: "Något saknas",
                description: "E-mail eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    );
};
