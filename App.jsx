import React from "react";
import Main from "./src/Main";
import ThemeConFig from "./src/theme-config/index";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/providers/auth.provider";

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <ThemeConFig>
                    <Main />
                </ThemeConFig>
            </AuthProvider>
        </NavigationContainer>
    );
}
