import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import config from "@config";
import { persistor, store } from "@store/store";
import {
    MFCountry,
    MFEnvironment,
    MFSettings,
    MFTheme,
} from "myfatoorah-reactnative";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./src/Main";
import ThemeConFig from "./src/theme-config/index";

export default function App() {
    useEffect(() => {
        let token = config.MYFTOKEN;
        let theme = new MFTheme("blue", "gray", "Payment", "Cancel");
        MFSettings.sharedInstance.setTheme(theme);
        MFSettings.sharedInstance.configure(
            token,
            MFCountry.QATAR,
            MFEnvironment.TEST
        );
    }, []);

    return (
        <Provider store={store}>
            <StatusBar hidden />
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
