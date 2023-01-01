import React from "react";
import { HStack, VStack, Box, Text } from "native-base";

import VeichleSelector from "@components/VeichleSelector/VeichleSelector";
import { Sun } from "@components/Icons/Icons";

const MapTopDetails = ({ selected, setSelected, ...rest }) => {
    return (
        <HStack alignItems="center" justifyContent="space-between" {...rest}>
            <VeichleSelector selected={selected} setSelected={setSelected} />
            <HStack alignItems={"center"} space="2">
                <Sun color="primary.100" />
                <VStack>
                    <Text color={"#000"} fontSize={7} fontWeight={700}>
                        Monday
                    </Text>
                    <Text color={"#000"} fontSize={12} fontWeight={700}>
                        Sunny
                    </Text>
                </VStack>
                <Box h="5" w="2px" bg="primary.100" />
                <Text color={"#000"} fontSize={24} fontWeight={700}>
                    28° C
                </Text>
            </HStack>
        </HStack>
    );
};

export default React.memo(MapTopDetails);
