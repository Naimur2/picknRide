import {
    Center,
    Factory,
    HStack,
    Image,
    Modal,
    Pressable,
    Text,
    VStack,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { CloseIcon } from "../../../../components/Icons/Icons";
import Facebook from "../../../../svgs/Facebook";
import Google from "../../../../svgs/Google";
import Message from "../../../../svgs/Message";
const megaSell = require("../../../../../assets/images/mega-sell.png");

export default function DashModal() {
    const Touchable = Factory(TouchableOpacity);
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <Modal
            isOpen={isVisible}
            onClose={() => setIsVisible(false)}
            _backdrop={{
                bg: "#ffffff50",
                opacity: 0.1,
            }}
            closeOnOverlayClick={false}
            _dark={{
                _backdrop: {
                    bg: "#00000050",
                },
            }}
        >
            <VStack
                bg="#fff"
                w="320px"
                h="460px"
                borderRadius={20}
                overflow={"hidden"}
            >
                <VStack
                    alignItems={"center"}
                    bg="primary.100"
                    w="100%"
                    h="175px"
                >
                    <Image
                        w="245px"
                        resizeMode="contain"
                        source={megaSell}
                        alt="mega-sell"
                    />
                </VStack>
                <VStack justifyContent={"center"} alignItems="center">
                    <Text
                        textAlign={"center"}
                        fontSize={"33px"}
                        color={"primary.100"}
                        mt={4}
                        maxW={250}
                        fontWeight={"600"}
                    >
                        Get Amazing Offer
                    </Text>
                    <Text
                        textAlign={"center"}
                        fontSize={"13px"}
                        color={"light.200"}
                        mt={3}
                        maxW={250}
                        fontWeight={"500"}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magnam nulla magni placeat eos
                    </Text>
                    <Text
                        textAlign={"center"}
                        fontSize={"12px"}
                        color={"gray.400"}
                        maxW={250}
                        fontWeight={"500"}
                        mt={2}
                    >
                        Tap to Share
                    </Text>
                </VStack>
                <HStack
                    py={4}
                    mt="auto"
                    bg="green.100"
                    alignItems="center"
                    justifyContent={"center"}
                    space="5"
                >
                    <Pressable>
                        <Facebook />
                    </Pressable>

                    <Pressable>
                        <Google />
                    </Pressable>
                    <Pressable>
                        <Message />
                    </Pressable>
                </HStack>
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
                            color: "#fff",
                        }}
                    />
                </Center>
            </Touchable>
        </Modal>
    );
}
