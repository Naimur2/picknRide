import { useNavigation } from "@react-navigation/native";
import { Factory, Text, useColorMode } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { NavigationStackOptions } from "react-navigation-stack";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import TopSection from "@components/TopSection/TopSection";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import useAuth from "@hooks/useAuth";
import Toggler from "@assets/svgs/Toggler";
import colors from "@theme/colors";
import DashModal from "./DashModal/DashModal";
import VeichleCards from "./VeichleCards/VeichleCards";

export default function Dashboard() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const Touchable = Factory(TouchableOpacity);

    const auth = useAuth();
    const user = auth?.user;

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
                    image={user?.avatar}
                    uname={user?.name?.slice(0, 1)}
                    avatarStyle={{
                        size: scale(35) + "px",
                    }}
                />
            ),
            headerShadowVisible: false,
        };
        navigation.setOptions(navigationOptions);
    }, [navigation, colorMode]);

    // const getPermission = async () => {
    //     const forePermission =
    //         await Location.requestForegroundPermissionsAsync();
    //     const backPermission =
    //         await Location.requestBackgroundPermissionsAsync();

    //     return (
    //         forePermission.status === "granted" &&
    //         backPermission.status === "granted"
    //     );
    // };

    // React.useEffect(() => {
    //     auth.setLoading(true);
    //     let clear = true;
    //     const getUserLocation = async () => {
    //         try {
    //             // const hasPermission = await getPermission();

    //             // if (!hasPermission) {
    //             //     auth.setError("Permission denied");
    //             //     auth.setLoading(false);
    //             //     return;
    //             // }

    //             const current = await Location.getCurrentPositionAsync({
    //                 accuracy: Location.Accuracy.Highest,
    //             });

    //             const locationCurr: ILatLng = {
    //                 latitude: current.coords.latitude,
    //                 longitude: current.coords.longitude,
    //             };

    //             auth.setCurrentLocation(locationCurr);
    //             auth.setLoading(false);
    //             auth.setError(null);
    //         } catch (err) {
    //             auth.setLoading(false);
    //             auth.setError("Could not get location");
    //         }
    //     };
    //     getUserLocation();

    //     if (clear) {
    //         return () => (clear = false);
    //     }
    // }, []);

    // if (auth.isLoading) {
    //     return (
    //         <ImageBg
    //             type={colorMode}
    //             flex={1}
    //             alignItems="center"
    //             justifyContent={"center"}
    //         >
    //             <Spinner color="blue" size={"lg"} />
    //         </ImageBg>
    //     );
    // }

    if (auth?.error) {
        return (
            <ImageBg
                type={colorMode}
                flex={1}
                alignItems="center"
                justifyContent={"center"}
            >
                <Text fontWeight={700}>{auth?.error}</Text>
            </ImageBg>
        );
    }

    return (
        <ImageBg type={colorMode}>
            <Scroller
                h="full"
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
                <DashModal />
            </Scroller>
        </ImageBg>
    );
}
