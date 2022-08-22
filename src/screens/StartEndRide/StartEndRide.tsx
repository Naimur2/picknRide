import { useNavigation } from "@react-navigation/native";
import {
    HStack,
    useColorMode,
    VStack,
    Center,
    Pressable,
    Text,
} from "native-base";
import React from "react";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import TopSection from "../../components/TopSection/TopSection";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import useAuth from "../../hooks/useAuth";
import Toggler from "../../svgs/Toggler";
import DashModal from "./component/DashModal/DashModal";
import VeichleCards from "./component/VeichleCards/VeichleCards";
import UploadImg from "./components/UploadImg/UploadImg";
import GradientBtn from "../../components/GradientBtn/GradientBtn";
import CheckBox from "../../components/CheckBox/CheckBox";

export default function StartEndRide() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const { user } = useAuth();
    const [isChecked, setIsChecked] = React.useState(false);

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
            },
            headerLeft: () => (
                <Toggler
                    mx={4}
                    onPress={() => navigation.openDrawer()}
                    _dark={{
                        color: "#000",
                    }}
                />
            ),
            headerRight: () => (
                <UserAvatar
                    image={user?.avatar}
                    uname={user?.name?.slice(0, 1)}
                />
            ),
        });
    }, [navigation]);

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
                    title="Upload photos
                    to end ride."
                    subtitle="Please upload 4 photos to end ride"
                />

                <VStack mt={8} px={6} space={4} w="full">
                    <HStack mt={4} justifyContent="space-between">
                        <UploadImg />
                        <UploadImg />
                    </HStack>
                    <HStack mt={4} justifyContent="space-between">
                        <UploadImg />
                        <UploadImg />
                    </HStack>

                    <Center>
                        <HStack space="2" mt={12}>
                            <Pressable
                                onPress={() => setIsChecked((prev) => !prev)}
                            >
                                <CheckBox isChecked={isChecked} />
                            </Pressable>
                            <Text
                                _dark={{
                                    color: "#fff",
                                }}
                            >
                                Agree terms and condition
                            </Text>
                        </HStack>
                        <GradientBtn mt="5" mb={8} title="START RIDE" />
                    </Center>
                </VStack>
            </Scroller>
        </ImageBg>
    );
}
