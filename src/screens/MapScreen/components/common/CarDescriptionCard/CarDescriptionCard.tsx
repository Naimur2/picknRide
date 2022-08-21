import React from "react";
import { Image, Stack, Text, VStack, HStack } from "native-base";
import battery from "../../../../../../assets/images/battery.png";
import locationImg from "../../../../../../assets/images/location.png";
import clockFill from "../../../../../../assets/images/clock-fill.png";

const imagetype = {
    battery,
    clockFill,
    location: locationImg,
};

interface ICDesc {
    bettaryTitle: string;
    bettaryDescription?: string;
    locationTitle: string;
    locationDescription?: string;
    timeTitle: string;
    timeDescription?: string;
}

interface ICardDesc {
    type: "battery" | "clockFill" | "location";
    title: string;
    description?: string;
}

const CarDescription = ({ type, title, description }: ICardDesc) => (
    <Stack space="2" w="full" px={4} alignItems="center" w="30%">
        <VStack space="1">
            <HStack space="1.5" alignItems={"center"}>
                <Image
                    w="18px"
                    h="18px"
                    resizeMode="contain"
                    source={imagetype[type]}
                    alt="ring bell"
                />
                <Text color={"black"} fontWeight={700} fontSize={13}>
                    {title}
                </Text>
            </HStack>
            {description ? (
                <Text fontWeight={500} color="gray.100" fontSize={13}>
                    Distance
                </Text>
            ) : null}
        </VStack>
    </Stack>
);

export default function CarDescriptionCard({
    bettaryTitle,
    bettaryDescription,
    locationTitle,
    locationDescription,
    timeTitle,
    timeDescription,
    ...rest
}: ICDesc) {
    return (
        <Stack
            w={"full"}
            direction="row"
            px={8}
            py={4}
            justifyContent={"space-between"}
            {...rest}
        >
            <CarDescription
                type="location"
                title={locationTitle}
                description={locationDescription}
            />
            <CarDescription
                type="battery"
                title={bettaryTitle}
                description={bettaryDescription}
            />
            <CarDescription
                type="clockFill"
                title={timeTitle}
                description={timeDescription}
            />
        </Stack>
    );
}
