import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, useColorMode } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import TopSection from "../../components/TopSection/TopSection";
import colors from "../../theme-config/colors";
import DocumentForm from "./components/DocumentForm/DocumentForm";

export default function DocumentSubmission() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const parmas = useRoute().params;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: {
                alignItems: "center",
                backgroundColor:
                    colorMode === "dark"
                        ? colors.primary[100]
                        : colors.green[200],
            },
            headerShadowVisible: false,
            headerRight: () => (
                <Avatar
                    source={{
                        uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    }}
                    borderWidth={3}
                    borderColor="white"
                    size={scale(35) + "px"}
                >
                    SS
                    <Avatar.Badge bg="green.500" />
                </Avatar>
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
                    title="Document Submission"
                    subtitle="Please submit documents below to unlock Car rental option"
                />
                <DocumentForm routeParams={parmas} />
            </Scroller>
        </ImageBg>
    );
}
