import { Image, Modal, Pressable, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import SignatureBox from "./SignatureBox/SignatureBox";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import base64 from "react-native-base64";

function Signature({
    setSignatureValue,
    signatureValue,
}: {
    setSignatureValue: (value: string) => void;
    signatureValue: string;
}) {
    const [show, setShow] = React.useState(false);
    const [base64Image, setBase64Image] = React.useState<string>();

    const handleAddSignature = async (sign: string) => {
        console.log("sign", sign);
        try {
            const imagePath = FileSystem.documentDirectory + "image.png";
            const imageData = base64.decode(sign);
            await FileSystem.writeAsStringAsync(imagePath, imageData, {
                encoding: FileSystem.EncodingType.Base64,
            });
            await MediaLibrary.createAssetAsync(imagePath);
            const info = await FileSystem.getInfoAsync(imagePath);
            setBase64Image(sign);
            console.log("info", info);
            setSignatureValue?.(info.uri);
            setShow(false);
        } catch (error) {
            console.log("error", error);
        }
    };

    console.log("signatureValue", signatureValue);

    return (
        <VStack mt={2} space={2}>
            <Pressable onPress={() => setShow(true)} shadow={5}>
                <VStack
                    borderRadius={20}
                    h={"200px"}
                    w={scale(300) + "px"}
                    mt="2"
                    bg="white"
                    overflow="hidden"
                    alignItems="center"
                    justifyContent="center"
                >
                    {signatureValue ? (
                        <Image
                            src={{
                                uri: base64Image,
                            }}
                            alt="signature"
                            h="full"
                            w="full"
                        />
                    ) : null}
                </VStack>
            </Pressable>
            <Modal isOpen={show} onClose={() => setShow(false)}>
                <SignatureBox
                    onSignature={(sig) => {
                        handleAddSignature(sig);
                    }}
                />
            </Modal>
        </VStack>
    );
}

export default React.memo(Signature);
