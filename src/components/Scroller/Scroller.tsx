import { ScrollView } from "native-base";
import React from "react";

export default function Scroller({
    children,
    contentStyle,
    ...rest
}: {
    children: React.ReactNode;
    contentStyle?: object;
}) {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                ...contentStyle,
                flexGrow: 1,
            }}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            {...rest}
        >
            {children}
        </ScrollView>
    );
}
