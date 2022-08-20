import React from "react";
import { Pressable, Image, HStack, Box, VStack } from "native-base";
import car from "../../../../../assets/images/car-small.png";
import cycle from "../../../../../assets/images/cycle-small.png";
import scooter from "../../../../../assets/images/veichle.png";

const images = {
    car,
    cycle,
    scooter,
};

export default function VeichleSelector({
    type,
    onPress,
    isActive,
}: {
    type: "scooter" | "cycle" | "car";
    isActive: boolean;
    onPress: () => void;
}) {
    return (
        <VStack alignItems={"center"} space="1.5">
            <Pressable
                bg={isActive ? "primary.100" : "#CAE5B7"}
                borderWidth={3}
                borderColor="#fff"
                p="3"
                borderRadius={50}
                onPress={onPress}
            >
                <Image
                    w="18px"
                    h="18px"
                    resizeMode="contain"
                    source={images[type] || scooter}
                    alt="cycle"
                    tintColor={"#fff"}
                />
            </Pressable>
            {isActive ? (
                <Box bg="primary.100" h="4px" w="8" borderRadius={4} />
            ) : null}
        </VStack>
    );
}
