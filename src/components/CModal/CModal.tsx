import { Center, Factory, Modal, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { CloseIcon } from "../Icons/Icons";

export default function CModal({
    isOpen,
    onClose,
    children,
    modalStyle,
    ...rest
}: {
    isOpen: boolean;
    onClose: (isVisible: boolean) => void;
    children: React.ReactNode;
    modalStyle?: any;
}) {
    const Touchable = Factory(TouchableOpacity);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
            {...modalStyle}
        >
            <VStack
                bg="#fff"
                w={["320px", "320px", "420px", "520px", "620px"]}
                borderRadius={20}
                overflow={"hidden"}
                shadow="lg"
                alignItems={"center"}
                justifyContent={"center"}
                p="4"
                {...rest}
            >
                {children}
            </VStack>

            <Touchable onPress={onClose}>
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
