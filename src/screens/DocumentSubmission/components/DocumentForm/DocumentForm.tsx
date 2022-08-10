import { FormControl, Input, Text, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import AddImage from "../AddImage/AddImage";
import YesNo from "../YesNo/YesNo";
import ExpiryDate from "./components/ExpiryDate/ExpiryDate";
import PickerButton from "./components/PickerButton/PickerButton";
import CountryPicker from "react-native-country-picker-modal";
import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import Signature from "./components/Signature/Signature";

export default function DocumentForm() {
    const [hasIntlLicense, setHasIntlLicense] = React.useState("yes");
    const [country, setCountry] = React.useState("");
    const [show, setShow] = React.useState(false);

    const FormLabel = ({ title }: { title: string }) => (
        <FormControl.Label
            fontSize={12}
            color="gray.400"
            _dark={{ color: "#fff" }}
            fontWeight={500}
        >
            {title}
        </FormControl.Label>
    );

    return (
        <VStack w={scale(300) + "px"} py={4}>
            <Text mt={4} fontSize={20} fontWeight={600}>
                Documents
            </Text>

            <FormControl mt={5}>
                <FormLabel title="ID Number" />
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

            <ExpiryDate />

            <AddImage title="Upload both sides of your ID Card" />

            <YesNo
                selected={hasIntlLicense}
                setSelected={(data) => {
                    setHasIntlLicense(data);
                }}
            />

            <FormControl mt={2}>
                <FormLabel title="License Issue Country" />
                <PickerButton
                    onPress={() => setShow(true)}
                    pt={0}
                    isActive={country !== ""}
                    value={country.name || "Select Country"}
                    divider
                />
                {show && (
                    <CountryPicker
                        onClose={() => setShow(false)}
                        visible={show}
                        onSelect={(dt) => {
                            setShow(false);
                            setCountry(dt);
                        }}
                    />
                )}
            </FormControl>

            <FormControl mt={3}>
                <FormLabel title="License Number" />
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
            <ExpiryDate />

            <AddImage title="Upload both sides of your ID Card" />

            <OutlineButton
                title="Take a selfie"
                titleStyle={{
                    mx: "auto",
                }}
            />
            <Signature />
        </VStack>
    );
}
