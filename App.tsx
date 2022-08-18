import React from "react";
import Main from "./src/Main";
import ThemeConFig from "./src/theme-config/index";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/providers/auth.provider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AuthProvider>
                    <ThemeConFig>
                        <Main />
                    </ThemeConFig>
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
