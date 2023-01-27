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

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <ThemeConFig>
                        <NavigationContainer>
                            <Main />
                        </NavigationContainer>
                    </ThemeConFig>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
