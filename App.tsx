import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./src/context/providers/auth.provider";
import Main from "./src/Main";
import ThemeConFig from "./src/theme-config/index";
import { Provider } from "react-redux";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@store/store";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <ThemeConFig>
                        <AuthProvider>
                            <NavigationContainer>
                                <Main />
                            </NavigationContainer>
                        </AuthProvider>
                    </ThemeConFig>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
