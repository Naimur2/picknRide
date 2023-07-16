import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { persistor, store } from "@store/store";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./src/Main";
import ThemeConFig from "./src/theme-config/index";
import { StatusBar } from "react-native";

export default function App() {
    const linking = {
        prefixes: ["picknride://", "https://webapi.pickandride.qa"],
        config: {
            screens: {
                RedirectionWebview: "webview",
            },
        },
    };

    return (
        <Provider store={store}>
            <StatusBar hidden />
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <ThemeConFig>
                        <NavigationContainer linking={linking} fallback={<></>}>
                            <Main />
                        </NavigationContainer>
                    </ThemeConFig>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
