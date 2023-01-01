import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Factory, HStack, Text, VStack } from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import Balance from "@components/Balance/Balance";
import { Instagram, Whatsapp } from "@components/Icons/Icons";
import Scroller from "@components/Scroller/Scroller";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import useAuth from "../../hooks/useAuth";
import { logout } from "@store/features/auth/authSlice";
import DrawerBtn from "./components/DraweBtn/DrawerBtn";
import { useDispatch } from "react-redux";

interface IDrawerMenuItem {
    title: string;
    onPress: () => void;
}

export default function CustomDrawer() {
    const Lg = Factory(LinearGradient);
    const navigation = useNavigation();
    const { user } = useAuth();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

    const { height } = useWindowDimensions();

    const drawermenu: IDrawerMenuItem[] = [
        {
            title: "Home",
            onPress: () => navigation.navigate("Dashboard"),
        },
        {
            title: "Account",
            onPress: () => navigation.navigate("Account"),
        },
        {
            title: "Pricing",
            onPress: () => navigation.navigate("Pricing"),
        },
        {
            title: "Ride History",
            onPress: () => navigation.navigate("RideHistory"),
        },
        {
            title: "Wallet",
            onPress: () => navigation.navigate("Wallet"),
        },
        {
            title: "Cars",
            onPress: () => navigation.navigate("Cars"),
        },

        {
            title: "Settings",
            onPress: () => navigation.navigate("Settings"),
        },

        // {
        //     title: "Special Rate",
        //     onPress: () => {},
        // },
        // {
        //     title: "Feedback",
        //     onPress: () => {},
        // },
    ];

    return (
        <>
            <Scroller flexGrow={1}>
                <Lg
                    colors={["#52BF04", "#52BE04", "#038C0C"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    flex="1"
                    py="4"
                    px={7}
                    height={height}
                >
                    <HStack
                        mt={4 + insets.top + "px"}
                        alignItems="center"
                        justifyContent={"space-between"}
                    >
                        <UserAvatar
                            image={user?.avatar}
                            uname={user?.name?.slice(0, 1)}
                        />
                        <Balance balance={50} currency={"QAR"} />
                    </HStack>
                    <VStack mt={10}>
                        <Text
                            color={"#fff"}
                            fontSize={scale(13)}
                            fontWeight={600}
                        >
                            Welcome Back
                        </Text>
                        <Text
                            lineHeight={45}
                            color={"#fff"}
                            fontSize={scale(34)}
                            fontWeight={700}
                        >
                            Alex Doe
                        </Text>
                    </VStack>
                    <VStack mt={3}>
                        {drawermenu.map((item, index) => (
                            <DrawerBtn
                                title={item.title}
                                onPress={item.onPress}
                                key={index}
                            />
                        ))}
                    </VStack>
                    <VStack mt={4}>
                        <Button
                            variant={"outline"}
                            _text={{
                                color: "#fff",
                                fontSize: scale(13),
                                fontWeight: 700,
                                textTransform: "uppercase",
                            }}
                            borderWidth={3}
                            borderRadius={16}
                            borderColor={"#fff"}
                            onPress={() => dispatch(logout())}
                        >
                            SIGN OUT
                        </Button>
                    </VStack>
                    <HStack space={4} mt={6} mb={4}>
                        <Whatsapp color={"#fff"} />
                        <Instagram color={"#fff"} />
                    </HStack>
                </Lg>
            </Scroller>
        </>
    );
}
