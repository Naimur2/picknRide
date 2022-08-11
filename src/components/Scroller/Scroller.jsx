import { ScrollView } from "native-base";
import React from "react";

export default function Scroller({ children, contentStyle, ...rest }) {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={contentStyle}
            nestedScrollEnabled={true}
            {...rest}
        >
            {children}
        </ScrollView>
    );
}
