import { Actionsheet, VStack } from "native-base";
import React from "react";
import GradientBtn from "../../../../../../components/GradientBtn/GradientBtn";
import OutlineButton from "../../../../../../components/OutlineButton/OutlineButton";
import { scale } from "react-native-size-matters";
function SelectActionSheet({ isOpen, onClose, onBtn1Press, onBtn2Press }) {
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content
                _dragIndicator={{
                    bg: "light.100",
                    borderRadius: 8,
                }}
            >
                <VStack>
                    <GradientBtn
                        title="How to Ride"
                        mx="auto"
                        w="100%"
                        gradientStyle={{
                            w: scale(300) + "px",
                        }}
                        onPress={onBtn1Press}
                    />
                    <OutlineButton
                        titleStyle={{
                            mx: "auto",
                        }}
                        title="Geofence"
                        mx="auto"
                        onPress={onBtn2Press}
                    />
                </VStack>
            </Actionsheet.Content>
        </Actionsheet>
    );
}

export default React.memo(SelectActionSheet);
