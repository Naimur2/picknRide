import { Plus } from "@components/Icons/Icons";
import ImagePickerSheet from "@components/ImagePickerSheet/ImagePickerSheet";
import { Pressable, Text, VStack } from "native-base";
import React from "react";
import { Image } from "react-native";

function UploadImg({
    setImage,
    imgTitle,
    imageLink,
    ...rest
}: {
    setImage: (image: string) => void;
    imageLink?: string;
    imgTitle?: string;
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState("");

    let title = imageUrl ? imageUrl.split("/").pop() : null;
    title = imgTitle ? imgTitle : title;

    React.useEffect(() => {
        if (imageUrl) setImage(imageUrl);
    }, [imageUrl]);

    const uri = imageLink ? imageLink : imageUrl;

    return (
        <>
            <VStack space="2" w={"48%"} {...rest}>
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
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                zIndex: -1,
                                borderRadius: 12,
                            }}
                            source={{ uri: uri }}
                            // w="full"
                            // h="full"
                            // zIndex={-1}
                            // position="absolute"
                            // blurRadius={3}
                            // alt={title}
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

export default React.memo(UploadImg);
