import { Center, Factory, Modal, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { CloseIcon } from "../../../../components/Icons/Icons";
import Approved from "../../../../svgs/Approved";
import Expired from "../../../../svgs/Expired";
import Pending from "../../../../svgs/Pending";
import Rejected from "../../../../svgs/Rejected";
const megaSell = require("../../../../../assets/images/mega-sell.png");

export default function WarningModal({
    isVisible,
    setIsVisible,
    variant,
    ...rest
}: {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    variant: "approved" | "pending" | "rejected" | "expired";
}) {
    const Touchable = Factory(TouchableOpacity);

    const variants = {
        approved: {
            icon: <Approved />,
            text: "Submitted documents has been approved",
            title: "Approved",
        },
        pending: {
            icon: <Pending />,
            text: "Documents has been submitted waiting for verification.",
            title: "Approved",
        },
        rejected: {
            icon: <Rejected />,
            text: "Your documents has been expired please submit again.",
            title: "Rejected",
        },
        expired: {
            icon: <Expired />,
            text: "Your documents has been rejected please submit again.",
            title: "Expired",
        },
    };

    return (
        <Modal
            isOpen={isVisible}
            onClose={() => setIsVisible(false)}
            _backdrop={{
                bg: "#ffffff",
                opacity: 0.8,
            }}
            _dark={{
                _backdrop: {
                    bg: "#000000",
                    opacity: 0.8,
                },
            }}
            {...rest}
        >
            <VStack
                bg="#fff"
                w="320px"
                h="320px"
                borderRadius={20}
                overflow={"hidden"}
                shadow="lg"
                alignItems={"center"}
                justifyContent={"center"}
            >
                <VStack space="2" justifyContent={"center"} alignItems="center">
                    {variants?.[variant]?.icon || variants["pending"].icon}
                    <Text mt={2} fontSize={20} fontWeight={600} color="#000">
                        {variants?.[variant]?.title ||
                            variants["pending"].title}
                    </Text>
                    <Text
                        textAlign={"center"}
                        fontSize={scale(13)}
                        color={"light.100"}
                        maxW={250}
                        fontWeight={"500"}
                    >
                        {variants?.[variant]?.text || variants["pending"].text}
                    </Text>
                </VStack>
            </VStack>

            <Touchable onPress={() => setIsVisible(false)}>
                <Center
                    _dark={{ bg: "#fff" }}
                    mt={20}
                    h="9"
                    w="9"
                    bg="#000"
                    borderRadius={50}
                >
                    <CloseIcon
                        color="#fff"
                        _dark={{
                            color: "#000",
                        }}
                    />
                </Center>
            </Touchable>
        </Modal>
    );
}
