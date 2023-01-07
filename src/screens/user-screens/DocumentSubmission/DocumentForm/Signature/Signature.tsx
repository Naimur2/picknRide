import { Image, Modal, Pressable, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import SignatureBox from "./SignatureBox/SignatureBox";

function Signature({
    setSignatureValue,
}: {
    setSignatureValue: (value: string) => void;
}) {
    const [show, setShow] = React.useState(false);
    const [signature, setSignature] = React.useState("");

    React.useEffect(() => {
        if (signature && setSignatureValue) {
            // remove base64 header
            const sig = signature.split(",")[1];
            setSignatureValue(sig);
        }
    }, [signature]);

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
                        setSignature(sig);
                        setShow(false);
                    }}
                />
            </Modal>
        </VStack>
    );
}

export default React.memo(Signature);
