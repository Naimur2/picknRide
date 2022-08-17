import React from "react";
import Card from "../../../../components/Card/Card";
import { HStack, Text, useColorMode } from "native-base";
import ToggleSwitch from "toggle-switch-react-native";
import colors from "../../../../theme-config/colors";

export default function ThemeToggler() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Card>
            <HStack justifyContent={"space-between"}>
                <Text
                    color="#000"
                    _dark={{ color: "#fff" }}
                    fontWeight={600}
                    fontSize={15}
                >
                    Dark Mode
                </Text>
                <ToggleSwitch
                    isOn={colorMode === "dark"}
                    onColor={colors.primary[100]}
                    offColor="red"
                    size="medium"
                    onToggle={toggleColorMode}
                />
            </HStack>
        </Card>
    );
}
