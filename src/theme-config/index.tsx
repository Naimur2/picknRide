import {
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
    useFonts,
} from "@expo-google-fonts/montserrat";

import * as SplashScreen from "expo-splash-screen";

import { NativeBaseProvider, StatusBar } from "native-base";
import React from "react";
import theme from "./config";

SplashScreen.preventAutoHideAsync();

export default function ThemeConFig({
    children,
}: {
    children: React.ReactNode;
}) {
    let [fontsLoaded] = useFonts({
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black,
        Montserrat_100Thin_Italic,
        Montserrat_200ExtraLight_Italic,
        Montserrat_300Light_Italic,
        Montserrat_400Regular_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_700Bold_Italic,
        Montserrat_800ExtraBold_Italic,
        Montserrat_900Black_Italic,
    });

    const config = {
        dependencies: {
            // For Expo projects (Bare or managed workflow)
            "linear-gradient": require("expo-linear-gradient").LinearGradient,
            // For non expo projects
            // 'linear-gradient': require('react-native-linear-gradient').default,
        },
    };

    const onLayoutRootView = React.useCallback(async () => {
        if (fontsLoaded) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    if (fontsLoaded) {
        onLayoutRootView();
    }

    return (
        <NativeBaseProvider theme={theme}>
            <StatusBar backgroundColor={"#fff"} />
            {children}
        </NativeBaseProvider>
    );
}
