import { Image, Pressable, Text, VStack } from "native-base";
import React from "react";
import { Plus } from "../../../../components/Icons/Icons";
import ImagePickerSheet from "../../../../components/ImagePickerSheet/ImagePickerSheet";

export default function UploadImg({
    setImage,
}: {
    setImage: (image: string) => void;
    image: string;
    title: string;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState("");

    const title = imageUrl ? imageUrl.split("/").pop() : null;

    React.useEffect(() => {
        setImage?.(imageUrl);
    }, [imageUrl]);

    return (
        <>
            <VStack space="2" w={"48%"}>
                <Pressable
                    h={"120px"}
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
                    {imageUrl ? (
                        <Image
                            source={{ uri: imageUrl }}
                            w="full"
                            h="full"
                            zIndex={-1}
                            position="absolute"
                            blurRadius={3}
                            alt={title}
                        />
                    ) : null}
                </Pressable>
                {title ? (
                    <Text
                        textAlign={"center"}
                        _dark={{
                            color: "#fff",
                        }}
                    >
                        {title}
                    </Text>
                ) : null}
            </VStack>

            <ImagePickerSheet
                setImage={(img) => {
                    setIsOpen(false);
                    setImageUrl(img);
                }}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
