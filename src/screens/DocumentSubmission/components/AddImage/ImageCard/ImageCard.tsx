import { Pressable, Text, VStack, Actionsheet, Image } from "native-base";
import React from "react";
import { Plus } from "../../../../../components/Icons/Icons";
import ImagePickerSheet from "../../../../../components/ImagePickerSheet/ImagePickerSheet";

export default function ImageCard({
    setImage,
    image,
    title,
}: {
    setImage: (image: string) => void;
    image: string;
    title: string;
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <VStack space="2" w={"48%"}>
                <Pressable
                    h={"90px"}
                    w="full"
                    borderRadius={35}
                    bg="#fff"
                    shadow="9"
                    alignItems={"center"}
                    justifyContent={"center"}
                    onPress={() => setIsOpen(true)}
                    position="relative"
                    overflow={"hidden"}
                    _dark={{
                        bg: "gray.200",
                    }}
                >
                    <Plus
                        color={"light.200"}
                        _dark={{
                            color: "gray.100",
                        }}
                    />
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            w="full"
                            h="full"
                            zIndex={-1}
                            position="absolute"
                            blurRadius={3}
                            alt={title}
                        />
                    ) : null}
                </Pressable>
                <Text
                    textAlign={"center"}
                    _dark={{
                        color: "#fff",
                    }}
                >
                    {title}
                </Text>
            </VStack>

            <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Actionsheet.Content
                    _dragIndicator={{
                        bg: "light.200",
                        borderRadius: 20,
                    }}
                    bg="#fff"
                >
                    <ImagePickerSheet
                        setImage={(image) => {
                            setIsOpen(false);
                            setImage(image);
                        }}
                    />
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}
