import { useNavigation } from "@react-navigation/native";
import { HStack, Text, useColorMode, VStack } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../../components/Card/Card";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import Scroller from "../../components/Scroller/Scroller";
import { TOP_PADDING } from "../../helper/final";
import VerifyStatusCard from "./components/VerifyStatusCard/VerifyStatusCard";

export interface INotificationsList {
    _id?: string;
    title: string;
    validDate: Date;
    status: string;
}

const varificationList: INotificationsList[] = [
    {
        _id: 1,
        title: "Qatar",
        validDate: new Date(),
        status: "approved",
    },
    {
        _id: 2,
        title: "UAE",
        validDate: new Date(),
        status: "pending",
    },
    {
        _id: 3,
        title: "Saudi",
        validDate: new Date(),
        status: "rejected",
    },
    {
        _id: 4,
        title: "Dubai",
        validDate: new Date(),
        status: "expired",
    },
];

export default function VarificationStatus() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [varifyStatusList, setVarifyStatusList] =
        React.useState(varificationList);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <HeaderTitle title="Varification Status" />,
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
            <VStack
                space={6}
                mt={TOP_PADDING + insets.top + "px"}
                px="6"
                pb={8}
                h="full"
            >
                {varifyStatusList?.map((item) => (
                    <VerifyStatusCard
                        key={item._id}
                        status={item.status}
                        title={item.title}
                        validDate={item.validDate}
                    />
                ))}
            </VStack>
        </Scroller>
    );
}
