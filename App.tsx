import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./src/context/providers/auth.provider";
import Main from "./src/Main";
import ThemeConFig from "./src/theme-config/index";
// import "react-native-reanimated";
// import "react-native-gesture-handler";

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeConFig>
                <AuthProvider>
                    <NavigationContainer>
                        <Main />
                    </NavigationContainer>
                </AuthProvider>
            </ThemeConFig>
        </SafeAreaProvider>
    );
}
