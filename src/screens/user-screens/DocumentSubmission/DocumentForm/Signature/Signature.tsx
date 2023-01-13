import { Image, Modal, Pressable, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import SignatureBox from "./SignatureBox/SignatureBox";

function Signature({
    setSignatureValue,
    signatureValue,
}: {
    setSignatureValue: (value: string) => void;
    signatureValue: string;
}) {
    const [show, setShow] = React.useState(false);

    const handleAddSignature = React.useCallback(
        (sign: string) => {
            const signBase64 = sign.split(",")[1];
            setSignatureValue?.(signBase64);
            setShow(false);
        },
        [setSignatureValue, signatureValue]
    );

    const signature = React.useMemo(() => {
        if (signatureValue) {
            return `data:image/png;base64,${signatureValue}`;
        }
    }, [signatureValue]);

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
                    {signature ? (
                        <Image
                            source={{
                                uri: signature,
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
