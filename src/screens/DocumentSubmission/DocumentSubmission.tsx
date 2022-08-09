import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useColorMode, Avatar } from "native-base";
import Toggler from "../../svgs/Toggler";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import TopSection from "../../components/TopSection/TopSection";

export default function DocumentSubmission() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
            },

            headerRight: () => (
                <Avatar
                    source={{
                        uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    }}
                    borderWidth={3}
                    borderColor="white"
                    mt="4"
                >
                    SS
                    <Avatar.Badge bg="green.500" />
                </Avatar>
            ),
        });
    }, [navigation]);
    return (
        <Scroller bg="#fff">
            <ImageBg type={colorMode} alignItems={"center"}>
                <TopSection
                    title="Document Submission"
                    subtitle="Please submit documents below to unlock Car rental option"
                />
            </ImageBg>
        </Scroller>
    );
}
