import Toggler from "@assets/svgs/Toggler";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import TopSection from "@components/TopSection/TopSection";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import colors from "@theme/colors";
import * as Location from "expo-location";
import { Factory, useColorMode } from "native-base";
import React from "react";
import { Alert, TouchableOpacity, Platform } from "react-native";
import { scale } from "react-native-size-matters";
import { NavigationStackOptions } from "react-navigation-stack";
import DashModal from "./DashModal/DashModal";
import VeichleCards from "./VeichleCards/VeichleCards";
import useLocationPermissions from "../../../hooks/useLocationPermissions";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "@store/features/user-location/userLocationSlice";

export default function Dashboard() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();

    const dispatch = useDispatch();

    const Touchable = Factory(TouchableOpacity);
    const [isModalVisible, setIsModalVisible] = React.useState(true);
    const {
        hasBackGroundPermissions,
        hasForeGroundPermissions,
        checkPermissions,
    } = useLocationPermissions();

    React.useEffect(() => {
        const navigationOptions: NavigationStackOptions = {
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
                backgroundColor:
                    colorMode === "dark"
                        ? colors.primary[100]
                        : colors.green[200],
            },
            headerLeft: () => (
                <Touchable onPress={() => navigation.openDrawer()}>
                    <Toggler
                        mx={4}
                        _dark={{
                            color: "#000",
                        }}
                        py={2}
                        px={4}
                    />
                </Touchable>
            ),
            headerRight: () => (
                <UserAvatar
                    avatarStyle={{
                        size: scale(35) + "px",
                    }}
                />
            ),
            headerShadowVisible: false,
        };
        navigation.setOptions(navigationOptions);
    }, [navigation, colorMode]);

    const setIsModalVisibleHandler = (value: boolean) => {
        setIsModalVisible(value);
        AsyncStorage.setItem("isModalVisible", value.toString());
    };

    React.useEffect(() => {
        AsyncStorage.getItem("isModalVisible").then((value) => {
            if (value) {
                setIsModalVisibleHandler(value === "true");
            }
        });
    }, []);

    React.useEffect(() => {
        if (!hasForeGroundPermissions || !hasBackGroundPermissions) {
            checkPermissions();
        } else {
            (async () => {
                const {
                    coords: { latitude, longitude },
                } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.BestForNavigation,
                });
                dispatch(setCurrentLocation({ latitude, longitude }));
            })();
        }
    }, []);

    React.useEffect(() => {}, []);

    return (
        <ImageBg type={colorMode}>
            <Scroller
                contentStyle={{
                    alignItems: "center",
                    flexGrow: 1,
                }}
            >
                <TopSection
                    title="Good Evening Alexis"
                    subtitle="Select your ride"
                />

                <VeichleCards />
                <DashModal
                    isOpen={isModalVisible}
                    onClose={() => {
                        setIsModalVisibleHandler(false);
                    }}
                />
            </Scroller>
        </ImageBg>
    );
}
