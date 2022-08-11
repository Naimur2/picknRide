import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, Factory, useColorMode } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import TopSection from "../../components/TopSection/TopSection";
import DocumentForm from "./components/DocumentForm/DocumentForm";

export default function DocumentSubmission() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const Touchable = Factory(TouchableOpacity);
    let [service, setService] = React.useState("yes");
    const parmas = useRoute().params;

    const [hasIntlLicense, setHasIntlLicense] = React.useState(false);

    React.useLayoutEffect(() => {
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
