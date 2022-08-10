import { Video } from "expo-av";
import { Factory, VStack, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

export default function VideoPlayer() {
    const video = React.useRef(null);
    const Player = Factory(Video);
    const [status, setStatus] = React.useState({});

    return (
        <VStack my={4} space={4}>
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

            <VStack
                w={"full"}
                h={"180px"}
                bg="#000"
                borderRadius={20}
                _dark={{
                    bg: "gray.200",
                }}
            >
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                    }}
                    useNativeControls
                    resizeMode="contain"
                    onPlaybackStatusUpdate={(stat) => setStatus(() => stat)}
                    onPress={() => console.log("onPress")}
                />
            </VStack>
        </VStack>
    );
}

const styles = StyleSheet.create({
    video: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
});
