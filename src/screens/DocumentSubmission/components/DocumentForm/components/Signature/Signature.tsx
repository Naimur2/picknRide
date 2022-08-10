import React from "react";
import { Text, VStack } from "native-base";
import SignatureScreen from "react-native-signature-canvas";

export default function Signature() {
    const ref = React.useRef();

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        console.log(signature);
        // onOK(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };
    return (
        <VStack>
            <Text fontSize={20} fontWeight={600}>
                Signature
            </Text>
            <SignatureScreen
                ref={ref}
                onEnd={handleEnd}
                onOK={handleOK}
                onEmpty={handleEmpty}
                onClear={handleClear}
                onGetData={handleData}
                autoClear={true}
                descriptionText={"fh"}
            />
        </VStack>
    );
}
