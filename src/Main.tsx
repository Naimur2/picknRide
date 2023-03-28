import LoadingView from "@components/LoadingView/LoadingView";
import config from "@config";
import HomeRoutes from "@navigation/home.routes";
import { useGetNearestCarsApiQuery } from "@store/api/v2/carApi/carApiSlice";
import { selectToken } from "@store/features/auth/authSlice";
import { setCurrentSpeed } from "@store/features/cars/carsSlice";
import { setTemperature } from "@store/features/ui/uiSlice";
import {
    selectCurrentRegion,
    setCurrentLocation,
} from "@store/features/user-location/userLocationSlice";
import { selectLoading } from "@store/store";
import dayjs from "dayjs";
import * as TaskManager from "expo-task-manager";
import { Modal } from "native-base";
import React from "react";
import { Region } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
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
