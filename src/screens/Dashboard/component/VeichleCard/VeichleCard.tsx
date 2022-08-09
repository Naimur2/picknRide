import React, { Component } from "react";
import { Center, HStack, Image, VStack, Text } from "native-base";
import { scale } from "react-native-size-matters";

export interface IVeichleCardProps {
    id?: string | number;
    image: any;
    title: string;
    distance: number;
    availableNumber: number;
}

function VCard({ image, title, distance, availableNumber }: IVeichleCardProps) {
    return (
        <VStack
            bg={"#fff"}
            shadow="lg"
            mt={4}
            alignItems="center"
            py="4"
            borderRadius={24}
        >
            <Image
                source={image}
                alt={"cucle"}
                height={scale(180) + "px"}
                width={scale(180) + "px"}
                resizeMode="contain"
            />

            <HStack
                w="full"
                mt={5}
                justifyContent={"space-between"}
                px={5}
                pb={2}
            >
                <VStack>
                    <Text
                        color={"gray.100"}
                        fontSize={13}
                        fontWeight={500}
                        maxW={["140px", "160px", "180px", "190px"]}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text color={"primary.200"} fontWeight={700} fontSize={17}>
                        {availableNumber} available
                    </Text>
                </VStack>

                <Center
                    p={"8px"}
                    w={"128px"}
                    bg={"primary.100"}
                    borderRadius={24}
                >
                    <Text fontSize={13} fontWeight={500} color="#fff">
                        Distance {distance}
                    </Text>
                </Center>
            </HStack>
        </VStack>
    );
}

export default class VeichleCard extends Component {
    render() {
        return <VCard {...this.props} />;
    }
}
