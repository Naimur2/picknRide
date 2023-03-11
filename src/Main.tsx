import LoadingView from "@components/LoadingView/LoadingView";
import config from "@config";
import { useNavigation } from "@react-navigation/native";
import { useGetNearestCarsApiQuery } from "@store/api/v2/carApi/carApiSlice";
import { selectToken } from "@store/features/auth/authSlice";
import { IAuthState } from "@store/features/auth/authSlice.types";
import {
    selectCurrentRegion,
    setCurrentLocation,
} from "@store/features/user-location/userLocationSlice";
import { selectAuth, selectLoading } from "@store/store";
import * as TaskManager from "expo-task-manager";
import { Modal, VStack, useColorMode } from "native-base";
import React from "react";
import { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import AuthRoute from "./routes/auth.routes";
import DrawerRoute from "./routes/drawer.routes";
import { setCurrentSpeed } from "@store/features/cars/carsSlice";
import {
    MFCountry,
    MFEnvironment,
} from "@screens/MyFatooraScreens/types/enums.myfatoora";
import { MFSettings, MFTheme } from "myfatoorah-reactnative";
import dayjs from "dayjs";
import { setTemperature } from "@store/features/ui/uiSlice";
import HomeRoutes from "@navigation/home.routes";
import WModal from "./layouts/Modal";

export default function Main() {
    const loading = useSelector(selectLoading);
    const token = useSelector(selectToken);

    console.log("token", token);

    const dispatch = useDispatch();
    const currentRegion = useSelector(selectCurrentRegion) as Region;

    const locationData = useGetNearestCarsApiQuery(
        {
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
            pageNumber: 1,
            pageSize: 10,
        },
        { skip: !currentRegion.latitude || !currentRegion.longitude }
    );

    React.useEffect(() => {
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
    }, []);

    const getWeather = async (lat: number, lng: number) => {
        try {
            console.log("getWeather: ", lat, lng);
            const url = `${config.WEATHER_API}?key=${config.WEATHER_API_KEY}&q=${lat},${lng}`;
            const response = await fetch(url);
            const data = await response.json();
            const currentDay = dayjs(Date.now()).format("dddd");
            const condtion = data.current.condition.text;
            const icon = "https:" + data.current.condition.icon;
            const temp = data.current.temp_c;
            dispatch(setTemperature({ currentDay, condtion, icon, temp }));
        } catch (error) {
            console.log(error);
        }
    };

    TaskManager.defineTask(config.LOCATION_TASK_NAME, ({ data, error }) => {
        if (error) {
            // Error occurred - check `error.message` for more details.
            return;
        }
        if (data) {
            const { locations } = data;
            console.log("locations: ", locations);

            dispatch(
                setCurrentLocation({
                    latitude: locations[0].coords.latitude,
                    longitude: locations[0].coords.longitude,
                })
            );

            const speed = locations[0].coords.speed;
            const toKmPerHour: number = speed * 3.6;

            console.log("speed: ", toKmPerHour);
            getWeather(
                locations[0].coords.latitude,
                locations[0].coords.longitude
            );

            dispatch(setCurrentSpeed(toKmPerHour.toFixed(2)));

            // getNearestLocation({
            //     latitude: locations[0].coords.latitude,
            //     longitude: locations[0].coords.longitude,
            //     pageSize: 10,
            //     pageNumber: 1,
            // });

            // do something with the locations captured in the background
        }
    });

    return (
        <>
            <Modal
                isOpen={loading && !locationData.isLoading}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <LoadingView />
            </Modal>

            <HomeRoutes />
            <WModal />
        </>
    );
}
