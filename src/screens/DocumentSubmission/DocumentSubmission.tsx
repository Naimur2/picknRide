import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
    Avatar,
    Factory,
    FormControl,
    HStack,
    Input,
    Pressable,
    Text,
    useColorMode,
    VStack,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { ChevronDownFill, Plus, Tick } from "../../components/Icons/Icons";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import TopSection from "../../components/TopSection/TopSection";
import Form from "./components/Form/Form";
import YesNo from "./components/YesNo/YesNo";

export default function DocumentSubmission() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();
    const Touchable = Factory(TouchableOpacity);
    let [service, setService] = React.useState("yes");

    const [hasIntlLicense, setHasIntlLicense] = React.useState(false);

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
        <ImageBg type={colorMode}>
            <Scroller
                bg="#fff"
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
                <Form />
            </Scroller>
        </ImageBg>
    );
}
