import { Box, Image, Pressable, VStack } from "native-base";
import React from "react";
import car from "../../../../../assets/images/car-small.png";
import cycle from "../../../../../assets/images/cycle-small.png";
import scooter from "../../../../../assets/images/veichle.png";

const images = {
    car,
    cycle,
    scooter,
};

function ViichleCircle({
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
                p="2.5"
                borderRadius={50}
                onPress={onPress}
            >
                <Image
                    w="16px"
                    h="16px"
                    resizeMode="contain"
                    source={images[type] || scooter}
                    alt="cycle"
                    tintColor={"#fff"}
                />
            </Pressable>
            {isActive ? (
                <Box bg="primary.100" h="4px" w="6" borderRadius={4} />
            ) : null}
        </VStack>
    );
}

export default React.memo(ViichleCircle);
