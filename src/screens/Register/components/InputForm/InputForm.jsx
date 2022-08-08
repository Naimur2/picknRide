import { Input, Text, VStack } from "native-base";
import React from "react";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import { EyeClose, EyeOpen } from "../../../../components/Icons/Icons";
import Select from "../../../../components/Select/Select";
import CountryPicker from "../../../../components/CountryPicker/CountryPicker";
import { useNavigation } from "@react-navigation/native";

export default function InputForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [selectedLocation, setSelectedLocation] = React.useState(null);
    const navigation = useNavigation();

    const data = [
        {
            id: 1,
            name: "Chittagong",
        },
        {
            id: 2,
            name: "Dhaka",
        },
        {
            id: 3,
            name: "Khulna",
        },
        {
            id: 4,
            name: "Rajshahi",
        },
        {
            id: 5,
            name: "Rangpur",
        },
        {
            id: 6,
            name: "Sylhet",
        },
        {
            id: 7,
            name: "Barisal",
        },
        {
            id: 8,
            name: "Mymensingh",
        },
    ];

    return (
        <VStack mt={10} space={2} shadow="7">
            <Select data={data} onSelect={(loc) => setSelectedLocation(loc)} />

            <Input
                borderWidth={0}
                bg="white"
                shadow="9"
                px={6}
                py={6}
                borderRadius={20}
                placeholder="First Name"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={14}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
            />
            <Input
                borderWidth={0}
                bg="white"
                shadow="9"
                px={6}
                py={6}
                borderRadius={20}
                placeholder="Last Name"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={14}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
            />
            <Input
                borderWidth={0}
                bg="white"
                shadow="9"
                px={6}
                py={6}
                borderRadius={20}
                placeholder="Email"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={14}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
            />
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
                            onPress={() => setShowPassword1(!showPassword)}
                            color="gray.300"
                            mx="4"
                        />
                    )
                }
            />
            <Input
                borderWidth={0}
                bg="white"
                shadow="9"
                px={6}
                py={6}
                borderRadius={20}
                placeholder="Retype Password"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={14}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
                type={showPassword1 ? "default" : "password"}
                rightElement={
                    showPassword1 ? (
                        <EyeOpen
                            onPress={() => setShowPassword(!showPassword1)}
                            color="gray.300"
                            mx="4"
                        />
                    ) : (
                        <EyeClose
                            onPress={() => setShowPassword(!showPassword1)}
                            color="gray.300"
                            mx="4"
                        />
                    )
                }
            />
            <Input
                borderWidth={0}
                bg="white"
                shadow="9"
                px={6}
                py={6}
                borderRadius={20}
                placeholder="Mobile Number"
                _focus={{
                    bg: "white",
                }}
                color="gray.200"
                fontSize={14}
                fontWeight="500"
                placeholderTextColor="gray.300"
                mb={2}
            />

            <CountryPicker />

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Sign Up"}
                mx={"auto"}
                mt={4}
                onPress={() => navigation.navigate("OtpScreen")}
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
