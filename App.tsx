import { NavigationContainer } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Text } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./src/context/providers/auth.provider";
import Main from "./src/Main";
import ThemeConFig from "./src/theme-config/index";

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeConFig>
                <NavigationContainer>
                    <AuthProvider>
                        <Main />
                    </AuthProvider>
                </NavigationContainer>
            </ThemeConFig>
        </SafeAreaProvider>
    );
}
