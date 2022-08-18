import {
    Entypo,
    Feather,
    FontAwesome,
    Fontisto,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
} from "@expo/vector-icons";

import { Factory } from "native-base";

export const Tick = Factory((props) => (
    <Octicons
        name="check-circle-fill"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const Error = Factory((props) => (
    <MaterialIcons
        name="error"
        size={props.iconSize || 26}
        color="black"
        {...props}
    />
));

export const EyeOpen = Factory((props) => (
    <Ionicons
        name="ios-eye-outline"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const EyeClose = Factory((props) => (
    <Ionicons
        name="eye-off-outline"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const ChevronDown = Factory((props) => (
    <Entypo
        name="chevron-thin-down"
        size={props.iconSize || 20}
        color="black"
        {...props}
    />
));

export const ChevronDownFill = Factory((props) => (
    <Entypo
        name="chevron-down"
        size={props.iconSize || 20}
        color="black"
        {...props}
    />
));

export const Circle = Factory((props) => (
    <Entypo
        name="circle"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const CloseIcon = Factory((props) => (
    <MaterialCommunityIcons
        name="close"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const Plus = Factory((props) => (
    <Fontisto
        name="plus-a"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const ChevronLeft = Factory((props) => (
    <MaterialIcons
        name="keyboard-backspace"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const Whatsapp = Factory((props) => (
    <FontAwesome
        name="whatsapp"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const Telephone = Factory((props) => (
    <Foundation
        name="telephone"
        size={props.iconSize || 24}
        color="black"
        {...props}
    />
));

export const PlayBtn = Factory((props) => (
    <Octicons
        name="play"
        size={props.iconSize || 30}
        color="black"
        {...props}
    />
));

export const UploadIcon = Factory((props) => {
    return (
        <Feather
            name="upload"
            size={props.iconSize || 24}
            color="black"
            {...props}
        />
    );
});

export const Instagram = Factory((props) => {
    return (
        <Feather
            name="instagram"
            size={props.iconSize || 24}
            color="black"
            {...props}
        />
    );
});
