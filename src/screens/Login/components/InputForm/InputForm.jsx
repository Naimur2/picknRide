import { Input, Text, VStack } from "native-base";
import React from "react";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import PickCountry from "../../../../components/PickCountry/PickCountry";
import { EyeClose, EyeOpen, Tick } from "./../../../../components/Icons/Icons";

function InputForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
        <VStack mt={10} space={2} shadow="7">
            <PickCountry />
            <Input
                borderWidth={0}
                bg="white"
                shadow="9"
                px={6}
                py={6}
                borderRadius={20}
                placeholder="Password"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={14}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
                type={showPassword ? "default" : "password"}
                rightElement={
                    showPassword ? (
                        <EyeOpen
                            onPress={() => setShowPassword(!showPassword)}
                            color="gray.300"
                            mx="4"
                        />
                    ) : (
                        <EyeClose
                            onPress={() => setShowPassword(!showPassword)}
                            color="gray.300"
                            mx="4"
                        />
                    )
                }
            />

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Log In"}
                mx={"auto"}
                mt={4}
            />
            <Text
                color="gray.100"
                fontSize={13}
                fontWeight="500"
                w="170"
                textAlign={"center"}
                mx={"auto"}
                mt={2}
                _dark={{
                    color: "white",
                }}
            >
                Forgot Password
            </Text>
            <Text
                color="gray.100"
                fontSize={20}
                fontWeight="500"
                w="170"
                textAlign={"center"}
                mx={"auto"}
                mt={4}
            >
                Or
            </Text>
        </VStack>
    );
}

export default React.memo(InputForm);
