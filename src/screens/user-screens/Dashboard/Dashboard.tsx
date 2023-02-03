import Toggler from "@assets/svgs/Toggler";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import TopSection from "@components/TopSection/TopSection";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import useLocationPermissions from "@hooks/useLocationPermissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { IAuthState } from "@store/features/auth/authSlice.types";
import { setCurrentLocation } from "@store/features/user-location/userLocationSlice";
import { selectAuth } from "@store/store";
import colors from "@theme/colors";
import * as Location from "expo-location";
import { Factory, useColorMode, Center, ScrollView } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch, useSelector } from "react-redux";
import DashModal from "./DashModal/DashModal";
import VeichleCards from "./VeichleCards/VeichleCards";

export default function Dashboard() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const auth: IAuthState = useSelector(selectAuth);

    const dispatch = useDispatch();

    console.log("colorMode", colorMode);

    const Touchable = Factory(TouchableOpacity);
    const [isModalVisible, setIsModalVisible] = React.useState(true);
    const {
        hasBackGroundPermissions,
        hasForeGroundPermissions,
        checkPermissions,
    } = useLocationPermissions();

    React.useLayoutEffect(() => {
        const navigationOptions: NativeStackNavigationOptions = {
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

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
        >
            <ImageBg type={colorMode} flexGrow={1}>
                <Center pb={10}>
                    <TopSection
                        title={`Good Evening ${auth?.f_name}!`}
                        subtitle="Select your ride"
                    />

                    <VeichleCards />
                    <DashModal
                        isOpen={isModalVisible}
                        onClose={() => {
                            setIsModalVisibleHandler(false);
                        }}
                    />
                </Center>
            </ImageBg>
        </ScrollView>
    );
}
