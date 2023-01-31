import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React from "react";

export default function useImagePicker(props) {
    const [image, setImage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [fileName, setFileName] = React.useState(null);

    const [fileSize, setFileSize] = React.useState(null);
    const config = props.options || {};

    const opt = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.4,

        ...config,
    };

    const captureImage = async () => {
        // No permissions request is necessary for launching the image library
        setIsLoading(true);
        let result = await ImagePicker.launchCameraAsync({
            ...opt,
            base64: true,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
            setFile(result);
            setIsLoading(false);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        setIsLoading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            ...opt,
            base64: true,
        });
        if (!result.cancelled) {
            setImage(result.uri);
            setFile(result);
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        const getFileInfo = async (fileURI) => {
            const fileInfo = await FileSystem.getInfoAsync(fileURI);
            const { size } = fileInfo;
            setFileName(fileInfo.uri.split("/").pop());

            setFileSize(size);
        };

        if (image) {
            getFileInfo(image);
        }
    }, [image]);

    return {
        image,
        pickImage,
        captureImage,
        isLoading,
        file,
        fileName,
        fileSize,
    };
}
