import React from "react";
import { VStack, HStack, Text, Input } from "native-base";
import Card from "../../../../components/Card/Card";
import { UploadIcon } from "../../../../components/Icons/Icons";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import ImagePickerSheet from "../../../../components/ImagePickerSheet/ImagePickerSheet";
import TopSelection from "../TopSelection/TopSelection";
import { ISelection } from "../../ReportIssue";
import { TOP_PADDING } from "../../../../helper/final";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CModal from "../../../../components/CModal/CModal";

export default function ReportContent({
    selections,
}: {
    selections: ISelection;
}) {
    const [selectedMenu, setSelectedMenu] = React.useState(1);
    const [image, setImage] = React.useState<string | null>(null);
    const [isOpenImagePickerSheet, setIsOpenImagePickerSheet] =
        React.useState(false);
    const insets = useSafeAreaInsets();

    const [isOpen, setIsOpen] = React.useState(false);
    const selectedImage = image?.split("/").pop();

    return (
        <VStack space={6} mt={TOP_PADDING + "px"} px="6" pb={8} h="full">
            <HStack justifyContent={"space-between"}>
                {selections?.map((selection, id) => (
                    <TopSelection
                        key={id}
                        isActive={selectedMenu === selection._id}
                        iconName={selection.icon}
                        title={selection.title}
                        onPress={() => setSelectedMenu(selection._id)}
                    />
                ))}
            </HStack>

            <Card onPress={() => setIsOpenImagePickerSheet(true)}>
                <HStack justifyContent={"space-between"}>
                    <Text
                        color="gray.100"
                        fontSize={12}
                        fontWeight={500}
                        maxWidth={200}
                        numberOfLines={1}
                    >
                        {selectedImage ? selectedImage : "Browse image"}
                    </Text>
                    <UploadIcon fontSize={18} color="gray.100" />
                </HStack>
            </Card>
            <Card px="3" shadow="lg">
                <Input
                    _focus={{
                        bg: "transparent",
                    }}
                    numberOfLines={15}
                    placeholder="Describe your issue"
                    multiline={true}
                    textAlignVertical={"top"}
                    borderWidth={0}
                    _dark={{
                        bg: "gray.200",
                    }}
                    bg="#fff"
                    placeholderTextColor={"gray.100"}
                />
            </Card>
            <ImagePickerSheet
                isOpen={isOpenImagePickerSheet}
                onClose={() => setIsOpenImagePickerSheet(false)}
                setImage={(img) => {
                    setIsOpenImagePickerSheet(false);
                    setImage(img);
                }}
            />
            <GradientBtn
                mt="20%"
                title="report"
                mx="auto"
                onPress={() => setIsOpen(true)}
            />
            {isOpen ? (
                <CModal isOpen={isOpen} onClose={() => setIsOpen(false)} py={8}>
                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={28}
                        fontWeight={600}
                        mb={4}
                    >
                        Thank you for reaching out
                    </Text>
                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={13}
                        fontWeight={500}
                        color="gray.100"
                        mb={4}
                    >
                        We handle all reported issues seriously.
                    </Text>
                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={13}
                        fontWeight={500}
                        color="gray.100"
                        mb={4}
                    >
                        A member of the Pick & Ride team will contact you.
                    </Text>
                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={13}
                        fontWeight={500}
                        color="gray.100"
                    >
                        Let us know if you have any other concerns by emailing
                    </Text>

                    <Text
                        textAlign={"center"}
                        color="#000"
                        fontSize={13}
                        fontWeight={500}
                        color="gray.100"
                    >
                        <Text color={"primary.100"}>
                            support@pickandride.qa
                        </Text>{" "}
                        or alternatively filling out the same form.
                    </Text>
                </CModal>
            ) : null}
        </VStack>
    );
}
