import car from "@assets/images/car-small.png";
import cycle from "@assets/images/cycle-small.png";
import scooter from "@assets/images/veichle.png";
import { Box, Image, Pressable, VStack } from "native-base";
import React from "react";
import { TCarType } from "@store/features/cars/carsSlice.types";

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
    type: TCarType;
    isActive: boolean;
    onPress: () => void;
}) {
    return (
        <VStack alignItems={"center"} space="1.5">
            <Pressable
                bg={isActive ? "primary.100" : "#CAE5B7"}
                borderWidth={3}
                borderColor="#fff"
                p="8px"
                borderRadius={50}
                onPress={onPress}
            >
                <Image
                    w="14px"
                    h="14px"
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
