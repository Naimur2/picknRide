import { ScrollView } from "native-base";
import React from "react";

export default function Scroller({ children, ...rest }) {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            {...rest}
        >
            {children}
        </ScrollView>
    );
}
