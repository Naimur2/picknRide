import { Avatar, Pressable } from "native-base";
import React from "react";

export default function UserAvatar() {
    return (
        <Pressable>
            <Avatar
                source={{
                    uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                borderWidth={3}
                borderColor="white"
            >
                SS
                <Avatar.Badge bg="green.500" />
            </Avatar>
        </Pressable>
    );
}
