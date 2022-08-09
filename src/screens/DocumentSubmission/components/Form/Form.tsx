import React from "react";
import {
    VStack,
    Text,
    FormControl,
    Input,
    Pressable,
    HStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { ChevronDownFill, Plus } from "../../../../components/Icons/Icons";
import YesNo from "../YesNo/YesNo";
import { scale } from "react-native-size-matters";
import AddImage from "../AddImage/AddImage";

export default function Form() {
    const [hasIntlLicense, setHasIntlLicense] = React.useState("yes");
    console.log(hasIntlLicense);

    return (
        <VStack w={scale(300) + "px"} py={4}>
            <Text fontSize={20} fontWeight={600}>
                Documents
            </Text>
            <FormControl mt={5}>
                <FormControl.Label
                    fontSize={12}
                    color="gray.400"
                    _dark={{ color: "#fff" }}
                    fontWeight={500}
                >
                    ID Number
                </FormControl.Label>
                <Input
                    fontSize={17}
                    fontWeight={600}
                    variant="underlined"
                    placeholder="Enter Id"
                    placeholderTextColor="gray.300"
                    _dark={{
                        color: "#fff",
                        placeholderTextColor: "white",
                    }}
                />
            </FormControl>

            <FormControl my={3}>
                <TouchableOpacity>
                    <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                        py={3}
                    >
                        <Text
                            color="gray.100"
                            fontWeight={600}
                            fontSize={17}
                            p={0}
                        >
                            Expiry
                        </Text>
                        <ChevronDownFill color={"gray.100"} />
                    </HStack>
                </TouchableOpacity>
            </FormControl>

            <AddImage title="Upload both sides of your ID Card" />

            <YesNo
                selected={hasIntlLicense}
                setSelected={(data) => {
                    setHasIntlLicense(data);
                }}
            />
        </VStack>
    );
}
