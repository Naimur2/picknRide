import { Avatar, Pressable } from "native-base";
import React from "react";

export default function UserAvatar({
    isActive = true,
    onPress,
    image,
    uname,
    avatarStyle,
    badgeStyle,
    ...rest
}: {
    isActive: boolean;
    image: string;
    onPress: () => void;
    uname;
    avatarStyle?: any;
    badgeStyle?: any;
}) {
    return (
        <Pressable onPress={onPress} {...rest}>
            <Avatar
                source={{
                    uri: image,
                }}
                borderWidth={3}
                borderColor="white"
                {...avatarStyle}
            >
                {uname || "NA"}
                {isActive ? (
                    <Avatar.Badge
                        right={0}
                        bottom={-4}
                        borderColor={"#fff"}
                        bg="green.500"
                        {...badgeStyle}
                    />
                ) : null}
            </Avatar>
        </Pressable>
    );
}
