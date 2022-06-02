// Components
import AuthFields from "./AuthFields";

// Expo - React
import { useState } from "react";
import { showMessage } from "react-native-flash-message";

// Interfaces
import Auth from "../../interfaces/auth";

// Models
import AuthModel from "../../models/auth";

export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);

            if (result.type === "success") {
                setIsLoggedIn(true);
                showMessage({
                    message: "Inloggning lyckades",
                    description: "Du är nu inloggad",
                    type: "success"
                });
            } else {
                showMessage({
                    message: "Inloggningen misslyckades",
                    description: "Det gick inte att logga in",
                    type: "danger"
                })
            }
        } else {
            showMessage({
                message: "Något saknas",
                description: "E-post eller lösenord saknas",
                type: "warning"
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    )
};
