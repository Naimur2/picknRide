import { Video } from "expo-av";
import { Factory, VStack, Text, Pressable } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { PlayBtn } from "../../../../../../components/Icons/Icons";

export default function VideoPlayer({ vdo }: { vdo: { uri: string } }) {
    const video = React.useRef(null);

    const [status, setStatus] = React.useState({});

    return (
        <VStack mt={4} space={4}>
            <Text
                mt={2}
                w="280px"
                fontSize={20}
                fontWeight={600}
                _dark={{
                    color: "#fff",
                }}
            >
                International License
            </Text>
            <Pressable onPress={() => setStatus({ paused: !status.paused })}>
                <VStack
                    w={"full"}
                    h={"190px"}
                    py={2}
                    px={4}
                    bg="#000"
                    borderRadius={20}
                    _dark={{
                        bg: "gray.200",
                    }}
                    position={"relative"}
                >
                    {vdo?.uri ? (
                        <Video
                            ref={video}
                            style={styles.video}
                            source={{
                                uri: vdo.uri,
                            }}
                            useNativeControls
                            resizeMode="cover"
                            onPlaybackStatusUpdate={(stat) =>
                                setStatus(() => stat)
                            }
                            onPress={() => console.log("onPress")}
                        />
                    ) : null}

                    {!null ? (
                        <PlayBtn
                            color={"#fff"}
                            _dark={{ color: "gray.100" }}
                            position={"absolute"}
                            top={"45%"}
                            bottom={"50%"}
                            left={"50%"}
                            right={"50%"}
                            size="40"
                        />
                    ) : null}
                </VStack>
            </Pressable>
        </VStack>
    );
}

const styles = StyleSheet.create({
    video: {
        width: "100%",
        height: "100%",
    },
});
