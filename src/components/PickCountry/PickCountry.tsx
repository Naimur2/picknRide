import { HStack, Input, Pressable, Text } from "native-base";
import React from "react";
import CountryPicker from "react-native-country-picker-modal";
import { scale } from "react-native-size-matters";
import { ChevronDownFill } from "../Icons/Icons";

interface IPickCountry {
    onSelect: (country: any) => void;
    onChangeText: (text: string) => void;
    value: string;
    onFocus: () => void;
    onBlur: () => void;
    setCountryCCA2: (code: string) => void;
}

function PickCountry({
    onSelect,
    onChangeText,
    value,
    onFocus,
    onBlur,
    setCountryCCA2,
    ...rest
}: IPickCountry) {
    const [show, setShow] = React.useState(false);
    const [countryCode, setCountryCode] = React.useState(["974"]);

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
                py={3}
                borderRadius={20}
                placeholder="Phone Number"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={scale(12)}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
                onChangeText={onChangeText}
                onFocus={onFocus}
                onBlur={onBlur}
                leftElement={
                    <Pressable onPress={() => setShow(true)}>
                        <HStack space={1} pl={5} alignItems={"center"}>
                            <Text
                                fontSize={scale(12)}
                                fontWeight={500}
                                color={"gray.200"}
                            >
                                + {countryCode || "974"}
                            </Text>
                            <ChevronDownFill color="gray.200" />
                        </HStack>
                    </Pressable>
                }
                {...rest}
            />
            {show && (
                <CountryPicker
                    withCallingCode
                    visible={show}
                    onSelect={(country) => {
                        setShow(false);
                        setCountryCCA2?.(country?.cca2);
                        setCountryCode(country.callingCode);
                    }}
                    onClose={() => setShow(false)}
                    withFilter={true}
                    keyboardShouldPersistTaps="handled"
                    key={countryCode}
                />
            )}
        </>
    );
}

export default React.memo(PickCountry);
