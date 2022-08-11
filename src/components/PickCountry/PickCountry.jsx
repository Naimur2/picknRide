import { HStack, Input, Pressable, Text } from "native-base";
import React from "react";
import CountryPicker from "react-native-country-picker-modal";
import { ChevronDownFill } from "../Icons/Icons";

function PickCountry({
    onSelect,
    onChangeText,
    value,
    onFocus,
    onBlur,
    ...rest
}) {
    const [show, setShow] = React.useState(false);
    const [countryCode, setCountryCode] = React.useState("974");

    React.useEffect(() => {
        if (countryCode) {
            onSelect?.(countryCode);
        }
    }, [countryCode]);

    return (
        <>
            <Input
                borderWidth={0}
                bg="white"
                shadow="9"
                px={6}
                py={6}
                borderRadius={20}
                placeholder="Phone Number"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={14}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
                onChangeText={(text) => {
                    onChangeText?.(text);
                }}
                onFocus={() => {
                    onFocus?.();
                }}
                onBlur={() => {
                    onBlur?.();
                }}
                value={value}
                {...rest}
                leftElement={
                    <Pressable onPress={() => setShow(true)}>
                        <HStack space={1} pl={5} alignItems={"center"}>
                            <Text
                                fontSize={15}
                                fontWeight={500}
                                color={"gray.200"}
                            >
                                + {countryCode || "974"}
                            </Text>
                            <ChevronDownFill color="gray.200" />
                        </HStack>
                    </Pressable>
                }
            />
            {show && (
                <CountryPicker
                    withCallingCode
                    visible={show}
                    onSelect={(country) => {
                        setShow(false);
                        setCountryCode(country.callingCode);
                    }}
                    onClose={() => setShow(false)}
                />
            )}
        </>
    );
}

export default React.memo(PickCountry);
