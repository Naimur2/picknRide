import {
    Button,
    HStack,
    Image,
    Modal,
    Text,
    View,
    VStack,
    Pressable,
} from "native-base";
import React from "react";
import Facebook from "./../../svgs/Facebook";
import Google from "./../../svgs/Google";
import Message from "./../../svgs/Message";
const megaSell = require("../../../assets/images/mega-sell.png");
const google = require("../../../assets/images/google.png");
const facebook = require("../../../assets/images/facebook.png");

export default function Dashboard() {
    const [isVisible, setIsVisible] = React.useState(true);

    return (
        <View>
            <Button>Dashboard</Button>
            <Modal
                isOpen={isVisible}
                onClose={() => setIsVisible(false)}
                _backdrop={{
                    bg: "#fcc",
                    opacity: 0.4,
                }}
                closeOnOverlayClick={false}
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Magnam nulla magni placeat eos
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
            </Modal>
        </View>
    );
}
