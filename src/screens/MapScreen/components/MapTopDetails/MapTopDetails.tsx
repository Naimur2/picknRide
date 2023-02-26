import { Box, HStack, Image, Text, VStack } from "native-base";
import React from "react";

import VeichleSelector from "@components/VeichleSelector/VeichleSelector";
import { selectTemperature } from "@store/features/ui/uiSlice";
import { useSelector } from "react-redux";

const MapTopDetails = ({ ...rest }) => {
    const weather = useSelector(selectTemperature);

    return (
        <HStack alignItems="center" justifyContent="space-between" {...rest}>
            <VeichleSelector />
            {weather ? (
                <HStack alignItems={"center"} space="2">
                    <Image
                        source={{ uri: weather.icon }}
                        alt="weather"
                        size={10}
                    />
                    {/* <Sun color="primary.100" /> */}
                    <VStack>
                        <Text color={"#000"} fontSize={6} fontWeight={700}>
                            {weather?.currentDay}
                        </Text>
                        <Text color={"#000"} fontSize={10} fontWeight={700}>
                            {weather?.condtion}
                        </Text>
                    </VStack>
                    <Box h="5" w="2px" bg="primary.100" />
                    <Text color={"#000"} fontSize={18} fontWeight={700}>
                        {weather?.temp}° C
                    </Text>
                </HStack>
            ) : null}
        </HStack>
    );
};

export default React.memo(MapTopDetails);
