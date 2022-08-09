import {
    Octicons,
    MaterialIcons,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";

import { Factory } from "native-base";

export const Tick = Factory((props) => (
    <Octicons name="check-circle-fill" size={24} color="black" {...props} />
));

export const Error = Factory((props) => (
    <MaterialIcons name="error" size={26} color="black" {...props} />
));

export const EyeOpen = Factory((props) => (
    <Ionicons name="ios-eye-outline" size={24} color="black" {...props} />
));

export const EyeClose = Factory((props) => (
    <Ionicons name="eye-off-outline" size={24} color="black" {...props} />
));

export const ChevronDown = Factory((props) => (
    <Entypo name="chevron-thin-down" size={20} color="black" {...props} />
));

export const ChevronDownFill = Factory((props) => (
    <Entypo name="chevron-down" size={20} color="black" {...props} />
));

export const Circle = Factory((props) => (
    <Entypo name="circle" size={24} color="black" {...props} />
));

export const CloseIcon = Factory((props) => (
    <MaterialCommunityIcons name="close" size={24} color="black" {...props} />
));

export const Plus = Factory((props) => (
    <Fontisto name="plus-a" size={24} color="black" {...props} />
));

export const ChevronLeft = Factory((props) => (
    <MaterialIcons
        name="keyboard-backspace"
        size={24}
        color="black"
        {...props}
    />
));
