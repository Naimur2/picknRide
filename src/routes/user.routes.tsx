import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "../components/BackButton/BackButton";
import Account from "../screens/Account/Account";
import CameraView from "../screens/CameraView/CameraView";
import CarRideHistory from "../screens/CarRideHistory/CarRideHistory";
import Cars from "../screens/Cars/Cars";
import Dashboard from "../screens/Dashboard/Dashboard";
import DocumentSubmission from "../screens/DocumentSubmission/DocumentSubmission";
import MapScreen from "../screens/MapScreen/MapScreen";
import Notifications from "../screens/Notifications/Notifications";
import Pricing from "../screens/Pricing/Pricing";
import Receipt from "../screens/Receipt/Receipt";
import ReportIssue from "../screens/ReportIssue/ReportIssue";
import ScanQrCode from "../screens/ScanQrCode/ScanQrCode";
import Settings from "../screens/Settings/Settings";
import StartEndRide from "../screens/StartEndRide/StartEndRide";
import TripDetails from "../screens/TripDetails/TripDetails";
import VarificationStatus from "../screens/VarificationStatus/VarificationStatus";
import Wallet from "../screens/Wallet/Wallet";
import colors from "../theme-config/colors";

const Stack = createNativeStackNavigator();

export default function UserRoutes() {
    const { colorMode } = useColorMode();
    const insets = useSafeAreaInsets();

    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerTitle: "",
                headerTitleStyle: { color: "white" },
                headerTintColor: colorMode === "light" ? "black" : "white",
                headerLeft: () => (
                    <BackButton
                        color={colorMode === "dark" ? "white" : "black"}
                    />
                ),
                headerShadowVisible: true,
                headerStyle: {
                    backgroundColor:
                        colorMode === "dark"
                            ? colors.dark[100]
                            : colors.light[300],
                },
                // statusBarHidden: true,

                headerBackTitleVisible: false,
                headerBackVisible: false,
                animation: "slide_from_left",
            }}
        >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
                name="DocumentSubmission"
                component={DocumentSubmission}
            />
            <Stack.Screen name="CameraView" component={CameraView} />
            <Stack.Screen name="Cars" component={Cars} />
            <Stack.Screen name="RideHistory" component={CarRideHistory} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="ReportIssue" component={ReportIssue} />
            <Stack.Screen
                name="VarificationStatus"
                component={VarificationStatus}
            />
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen name="Pricing" component={Pricing} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="ScanQrCode" component={ScanQrCode} />
            {/* <Stack.Screen name="CarRideHistory" component={CarRideHistory} /> */}
            <Stack.Screen name="TripDetails" component={TripDetails} />
            <Stack.Screen name="Receipt" component={Receipt} />
            <Stack.Screen name="StartEndRide" component={StartEndRide} />
        </Stack.Navigator>
    );
}
