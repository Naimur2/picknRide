import React from "react";
import { Text, VStack, HStack } from "native-base";
import SignatureScreen from "react-native-signature-canvas";
import { scale } from "react-native-size-matters";

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
        <VStack mt={2} space={2}>
            <Text fontSize={20} fontWeight={600}>
                Signature
            </Text>
            <VStack h={scale(202)} w={scale(301)} mt="2">
                <VStack
                    alignItems={"center"}
                    justifyContent="center"
                    w="100%"
                    h="100%"
                    shadow={7}
                    borderRadius={20}
                    overflow="hidden"
                >
                    <SignatureScreen
                        ref={ref}
                        onEnd={handleEnd}
                        onOK={handleOK}
                        onEmpty={handleEmpty}
                        onClear={handleClear}
                        onGetData={handleData}
                        autoClear={true}
                        descriptionText={"fhsefddd"}
                        bgHeight={190}
                        bgWidth={scale(290)}
                        backgroundColor={"#fff"}
                        androidHardwareAccelerationDisabled={false}
                        webStyle={`
                    .m-signature-pad--body {
                        border:none;
                        background-color: #fff;
                       
                        overflow: hidden;
                      }
                      .m-signature-pad--body{
                        border:none;
                        box-shadow: none;
                        
                        overflow: hidden;
                      }
                      .m-signature-pad {
                        border:none;
                        
                        overflow: hidden;
                        box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                      }
                    `}
                        style={{
                            borderWidth: 0,
                        }}
                    />
                </VStack>
            </VStack>
        </VStack>
    );
}
