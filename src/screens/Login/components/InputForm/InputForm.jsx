import { Input, Text, VStack } from "native-base";
import React from "react";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import PickCountry from "../../../../components/PickCountry/PickCountry";
import { EyeClose, EyeOpen, Tick } from "./../../../../components/Icons/Icons";

function InputForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
        <VStack mt={10} space={2} shadow="7">
            <PickCountry />
            <PasswordInput placeholder="Password" />

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
