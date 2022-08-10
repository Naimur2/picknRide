import { Button, Text, VStack } from "native-base";
import React from "react";
import useImagePicker from "../../hooks/use-image-picker";

const ImagePickerSheet = ({ setImage }) => {
    const { image, pickImage, captureImage } = useImagePicker({});

    React.useEffect(() => {
        if (image) {
            setImage(image);
        }
    }, [image]);

    return (
        <>
            <VStack space={8} w="full" h={56} py={8} px={4}>
                <Button onPress={pickImage}>
                    <Text fontWeight={500} color={"#ccc"} fontSize={"md"}>
                        Choose From Gallery
                    </Text>
                </Button>
                <Button onPress={captureImage}>
                    <Text fontWeight={700} color={"white"} fontSize={"lg"}>
                        Open Camera
                    </Text>
                </Button>
            </VStack>
        </>
    );
};

export default ImagePickerSheet;
