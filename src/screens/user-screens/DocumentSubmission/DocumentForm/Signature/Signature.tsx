import { Image, Modal, Pressable, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import SignatureBox from "./SignatureBox/SignatureBox";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

function Signature({
    setSignatureValue,
    signatureValue,
}: {
    setSignatureValue: (value: string) => void;
    signatureValue: string;
}) {
    const [show, setShow] = React.useState(false);
    const [base64, setBase64] = React.useState<string | null>(null);

    const handleAddSignature = async (sign: string) => {
        console.log("sign", sign);
        try {
            const path = FileSystem.documentDirectory + "sign.png";
            await FileSystem.writeAsStringAsync(
                path,
                sign.replace("data:image/png;base64,", ""),
                { encoding: FileSystem.EncodingType.Base64 }
            );
            const info = await FileSystem.getInfoAsync(path);
            const mediaResult = await MediaLibrary.saveToLibraryAsync(info.uri);
            console.log(mediaResult);
            setBase64(sign);
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
                            source={{
                                uri: base64,
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
