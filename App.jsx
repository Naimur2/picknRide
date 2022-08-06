import React from "react";
import Main from "./src/Main";
import ThemeConFig from "./src/theme-config/index";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
    return (
        <NavigationContainer>
            <ThemeConFig>
                <Main />
            </ThemeConFig>
        </NavigationContainer>
    );
}
