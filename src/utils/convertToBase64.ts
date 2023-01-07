import * as FileSystem from "expo-file-system";
const convertToBase64 = async (uri: string) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
};

export default convertToBase64;
