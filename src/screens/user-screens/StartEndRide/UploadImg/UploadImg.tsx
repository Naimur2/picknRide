import { Plus } from "@components/Icons/Icons";
import useImagePicker from "@hooks/use-image-picker";
import { Image, Pressable, Text, VStack } from "native-base";
import React from "react";

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
    const {
        image: imageUrl,
        captureImage,
        file,
    } = useImagePicker({
        useCamera: true,
    });

    let title = imageUrl ? imageUrl.split("/").pop() : null;
    title = imgTitle ? imgTitle : title;

    React.useEffect(() => {
        setImage?.(imageUrl);
    }, [imageUrl]);

    const uri = React.useMemo(() => {
        if (imageLink) {
            return imageLink;
        } else if (imageUrl) {
            return imageUrl;
        } else {
            return "";
        }
    }, [imageUrl]);

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
                    onPress={captureImage}
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
                    {uri ? (
                        <Image
                            source={{ uri: uri }}
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
        </>
    );
}

export default React.memo(UploadImg);
