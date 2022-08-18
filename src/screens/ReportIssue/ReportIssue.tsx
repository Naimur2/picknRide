import { useNavigation } from "@react-navigation/native";
import { HStack, useColorMode, VStack, Text, Input } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import ImageBg from "../../components/ImageBg/ImageBg";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import TopSelection from "./components/TopSelection/TopSelection";
import Card from "../../components/Card/Card";
import { UploadIcon } from "../../components/Icons/Icons";
import GradientBtn from "../../components/GradientBtn/GradientBtn";
import ImagePickerSheet from "../../components/ImagePickerSheet/ImagePickerSheet";
import CModal from "../../components/CModal/CModal";
import ReportContent from "./components/ReportContent/ReportContent";

export interface ISelection {
    _id: string;
    icon: string;
    title: string;
}

const selections: ISelection[] = [
    {
        _id: 1,
        title: "Veichle",
        icon: "veichle",
    },
    {
        _id: 2,
        title: "Lock",
        icon: "lock",
    },
    {
        _id: 3,
        title: "Mobile App",
        icon: "mobileApp",
    },
    {
        _id: 4,
        title: "Other",
        icon: "search",
    },
];

export default function ReportIssue() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Report An Issue" />,
            headerTitleAlign: "center",
            headerLeft: null,
        });
    }, [navigation]);

    return (
        <Scroller
            contentStyle={{
                flexGrow: 1,
            }}
            bg="light.300"
            _dark={{
                bg: "dark.100",
            }}
        >
            <ReportContent selections={selections} />
        </Scroller>
    );
}
