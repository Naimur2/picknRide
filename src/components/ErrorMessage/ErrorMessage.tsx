import { Text } from "native-base";
import React from "react";
import colors from "../../theme-config/colors";
import { fontSizes } from "../../theme-config/typography";

export default function ErrorMessage({ children }: { children: string }) {
    return (
        <Text mb={2} ml={1} fontSize={fontSizes["2xs"]} color={colors.red[100]}>
            {children}
        </Text>
    );
}
