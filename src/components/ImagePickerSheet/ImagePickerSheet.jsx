import { Center, Factory, HStack, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import useImagePicker from "../../hooks/use-image-picker";
import Camera from "../../svgs/Camera";
import { UploadIcon } from "../Icons/Icons";

const ImagePickerSheet = ({ setImage }) => {
    const { image, pickImage, captureImage } = useImagePicker({});
    const Button = Factory(TouchableOpacity);

    React.useEffect(() => {
        if (image) {
            setImage(image);
        }
    }, [image]);

    return (
        <>
            <HStack
                space={8}
                w="full"
                pt={4}
                px={4}
                pb={6}
                alignItems="center"
                justifyContent="flex-start"
            >
                <Button onPress={captureImage}>
                    <Center>
                        <UploadIcon
                            mb="10px"
                            color="primary.100"
                            iconSize={26}
                        />
                        <Text color={"#000"} fontWeight={600} fontSize={15}>
                            From File
                        </Text>
                    </Center>
                </Button>
                <Button onPress={captureImage}>
                    <Center>
                        <Camera
                            mb="10px"
                            size={24}
                            color="primary.100"
                            iconSize={26}
                        />
                        <Text color={"#000"} fontWeight={600} fontSize={15}>
                            Camera
                        </Text>
                    </Center>
                </Button>
            </HStack>
        </>
    );
};

export default ImagePickerSheet;
