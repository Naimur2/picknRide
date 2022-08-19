import ReportIssue from "../screens/ReportIssue/ReportIssue";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import React from "react";
import BackButton from "../components/BackButton/BackButton";
import CameraView from "../screens/CameraView/CameraView";
import Cars from "../screens/Cars/Cars";
import Dashboard from "../screens/Dashboard/Dashboard";
import DocumentSubmission from "../screens/DocumentSubmission/DocumentSubmission";
import Notifications from "../screens/Notifications/Notifications";
import RideHistory from "../screens/RideHistory/RideHistory";
import Settings from "../screens/Settings/Settings";
import VarificationStatus from "../screens/VarificationStatus/VarificationStatus";
import Wallet from "../screens/Wallet/Wallet";
import MapScreen from "../screens/MapScreen/MapScreen";

const Stack = createNativeStackNavigator();

export default function UserRoutes() {
    const { colorMode } = useColorMode();
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerTitle: "",
                headerTitleStyle: { color: "white" },
                headerTintColor: colorMode === "light" ? "black" : "white",
                headerTransparent: true,
                headerStyle: {
                    height: "100",
                },
                headerLeft: () => <BackButton />,
            }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
                name="DocumentSubmission"
                component={DocumentSubmission}
            />
            <Stack.Screen name="CameraView" component={CameraView} />
            <Stack.Screen name="Cars" component={Cars} />
            <Stack.Screen name="RideHistory" component={RideHistory} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="ReportIssue" component={ReportIssue} />
            <Stack.Screen
                name="VarificationStatus"
                component={VarificationStatus}
            />
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
    );
}
