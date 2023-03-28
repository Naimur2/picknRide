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

import { Center, NativeBaseProvider, StatusBar, VStack } from "native-base";
import React from "react";
import theme from "./config";
import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";
import loader from "@assets/lottie/splash.json";
import {
    MFCountry,
    MFEnvironment,
} from "@screens/MyFatooraScreens/types/enums.myfatoora";
import { MFSettings, MFTheme } from "myfatoorah-reactnative";
import SplashLoader from "@layouts/SplashScreen";

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

    const [showSplash, setShowSplash] = React.useState(true);

    React.useEffect(() => {
        const fontsChecker = async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
                const timer = setTimeout(() => {
                    setShowSplash(false);
                }, 10000);
                return () => {
                    clearTimeout(timer);
                };
            }
        };
        fontsChecker();
    }, [fontsLoaded]);

    React.useEffect(() => {
        if (!showSplash && fontsLoaded) {
            let token =
                "rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL";
            let directPaymentToken =
                "Tfwjij9tbcHVD95LUQfsOtbfcEEkw1hkDGvUbWPs9CscSxZOttanv3olA6U6f84tBCXX93GpEqkaP_wfxEyNawiqZRb3Bmflyt5Iq5wUoMfWgyHwrAe1jcpvJP6xRq3FOeH5y9yXuiDaAILALa0hrgJH5Jom4wukj6msz20F96Dg7qBFoxO6tB62SRCnvBHe3R-cKTlyLxFBd23iU9czobEAnbgNXRy0PmqWNohXWaqjtLZKiYY-Z2ncleraDSG5uHJsC5hJBmeIoVaV4fh5Ks5zVEnumLmUKKQQt8EssDxXOPk4r3r1x8Q7tvpswBaDyvafevRSltSCa9w7eg6zxBcb8sAGWgfH4PDvw7gfusqowCRnjf7OD45iOegk2iYSrSeDGDZMpgtIAzYVpQDXb_xTmg95eTKOrfS9Ovk69O7YU-wuH4cfdbuDPTQEIxlariyyq_T8caf1Qpd_XKuOaasKTcAPEVUPiAzMtkrts1QnIdTy1DYZqJpRKJ8xtAr5GG60IwQh2U_-u7EryEGYxU_CUkZkmTauw2WhZka4M0TiB3abGUJGnhDDOZQW2p0cltVROqZmUz5qGG_LVGleHU3-DgA46TtK8lph_F9PdKre5xqXe6c5IYVTk4e7yXd6irMNx4D4g1LxuD8HL4sYQkegF2xHbbN8sFy4VSLErkb9770-0af9LT29kzkva5fERMV90w";
            let userToken =
                "QWhiUTMVXOZExwtgskX-g-Ee8LjDRjD3mgjAGF9P_4a4F7A1wZTcI0SLoe9qFgapxz4jO6S5op0oCtTtOzpVtoff3oszs6EVUopdaPWPJKzblxQKXLREqX2ksl1S435XhYEho96YmL3yqlg1p1Vk2Z8p4BkqukfZofmALTf8_5PzlyLUR0e34smdWyE7e-X25f3_Zbt_TVDSvgzh6Eb7iXxphKLbkYtwNgUOwlmxhIt-msHf54BUDUXLm-sro8i9ogoXgzYy78kOIEZz5iexob8xWYtbja_xSRR1tvgP83GrSBwHLB0E8nXjj197wHnxBhMPqzaA5iyT92oibbXqhR1HgTaw0i4gKDRO2QwawG0iYVR8xccSeoZxHbfY63gGGdvS1v6mj3qGb3QQ0s_t2VtuSlo6t4BPUrFVMZmW2j0e7Qg1Gh2xCP_r2PuiAoFJU_2XmjmelK0WzpS9pdvonyIswE699z_TmFkOHZ3qBnWGnWYN5HQ6RtsQnTv7mPReB54nCJW4l3TaKptFUzn_gjp9Jh599vLmzscPLU3Er2zsd0hh8K_XWHDAw9peHacmbqqzxtOTd8XcTZ1-mwpZexGUbxc1nNybicmI44QBRdl9D4MPfObDvkfIzn0nTXluJXnrXNJ8gVNKEizL2PNWyyoT4oVhZjhWEWgof2z04DoMGWBv";
            let theme = new MFTheme("blue", "gray", "Payment", "Cancel");
            MFSettings.sharedInstance.setTheme(theme);
            // MFSettings.sharedInstance.configure(MFEnvironment.TEST, token);
            MFSettings.sharedInstance.configure(
                token,
                MFCountry.QATAR,
                MFEnvironment.TEST
            );
        }
    }, [showSplash, fontsLoaded]);

    return (
        <NativeBaseProvider theme={theme}>
            <StatusBar backgroundColor={"#fff"} />
            {!fontsLoaded || showSplash ? <SplashLoader /> : children}
        </NativeBaseProvider>
    );
}
