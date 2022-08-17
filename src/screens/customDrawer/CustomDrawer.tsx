import { LinearGradient } from "expo-linear-gradient";
import { Button, Factory, HStack, Text, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import Balance from "../../components/Balance/Balance";
import { Instagram, Whatsapp } from "../../components/Icons/Icons";
import Scroller from "../../components/Scroller/Scroller";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import DrawerBtn from "./components/DraweBtn/DrawerBtn";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

interface IDrawerMenuItem {
    title: string;
    onPress: () => void;
}

export default function CustomDrawer() {
    const Lg = Factory(LinearGradient);
    const navigation = useNavigation();
    const { user } = useAuth();

    const drawermenu: IDrawerMenuItem[] = [
        {
            title: "Account",
            onPress: () => {},
        },
        {
            title: "Pricing",
            onPress: () => {},
        },
        {
            title: "Ride History",
            onPress: () => navigation.navigate("RideHistory"),
        },
        {
            title: "Wallet",
            onPress: () => {},
        },
        {
            title: "Cars",
            onPress: () => navigation.navigate("Cars"),
        },
        {
            title: "Notifications",
            onPress: () => {},
        },
        {
            title: "Settings",
            onPress: () => navigation.navigate("Settings"),
        },
        {
            title: "Report An Issue",
            onPress: () => {},
        },
        {
            title: "Special Rate",
            onPress: () => {},
        },
        {
            title: "Feedback",
            onPress: () => {},
        },
    ];

    return (
        <Scroller flexGrow={1} borderRightRadius={30}>
            <Lg
                colors={["#52BF04", "#52BE04", "#038C0C"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                flex="1"
                py="4"
                px={7}
            >
                <HStack
                    mt={4}
                    alignItems="center"
                    justifyContent={"space-between"}
                >
                    <UserAvatar
                        image={user?.image}
                        uname={user?.name?.slice(0, 1)}
                    />
                    <Balance balance={50} currency={"QAR"} />
                </HStack>
                <VStack mt={10}>
                    <Text color={"#fff"} fontSize={scale(13)} fontWeight={600}>
                        Welcome Back
                    </Text>

                    <Text
                        lineHeight={45}
                        color={"#fff"}
                        fontSize={scale(35)}
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
    );
}
