import { Factory, Text, useColorMode, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { scale } from "react-native-size-matters";
import Approved from "@assets/svgs/Approved";
import Expired from "@assets/svgs/Expired";
import Locked from "@assets/svgs/Locked";
import Pending from "@assets/svgs/Pending";
import Rejected from "@assets/svgs/Rejected";
import Unlocked from "@assets/svgs/Unlocked";

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
        unlocked: {
            icon: <Unlocked />,
            text: "Your ride has been unlocked",
            title: "Unlocked",
        },
        locked: {
            icon: <Locked />,
            text: "Your ride has been locked",
            title: "Locked",
        },
    };

    const { colorMode } = useColorMode();
    const UModal = Factory(Modal);

    return (
        <UModal
            isVisible={isVisible}
            backdropColor={colorMode === "dark" ? "#000" : "#fff"}
            propagateSwipe={true}
            onSwipeComplete={setIsVisible}
            swipeDirection={["left", "right"]}
            onBackdropPress={setIsVisible}
            onDismiss={setIsVisible}
            shouldRasterizeIOS
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
                mx={"auto"}
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

            {/* <Touchable onPress={() => setIsVisible(false)}>
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
            </Touchable> */}
        </UModal>
    );
}
