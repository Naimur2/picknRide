import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Factory, Pressable, useColorMode } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton/BackButton";
import { ChevronLeft } from "../components/Icons/Icons";
import Dashboard from "../screens/Dashboard/Dashboard";
import DocumentSubmission from "../screens/DocumentSubmission/DocumentSubmission";

export default function UserRoute() {
    const Stack = createNativeStackNavigator();
    const { colorMode } = useColorMode();
    const navigation = useNavigation();

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: "",
                headerTitleStyle: { color: "white" },
                headerTintColor: colorMode === "light" ? "black" : "white",
                headerTransparent: true,
                headerStyle: {
                    height: "100",
                },
                headerLeft: () => (
                   <BackButton />
                ),
            }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
                name="DocumentSubmission"
                component={DocumentSubmission}
            />
        </Stack.Navigator>
    );
}
