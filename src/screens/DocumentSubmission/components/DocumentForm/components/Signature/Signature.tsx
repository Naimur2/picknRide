import { Box, Image, Modal, Pressable, Text, VStack } from "native-base";
import React from "react";
import ActionSheet from "react-native-actions-sheet";
import { scale } from "react-native-size-matters";
import SignatureBox from "./componets/SignatureBox";

function Signature() {
    const [show, setShow] = React.useState(false);
    const [signature, setSignature] = React.useState("");

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
