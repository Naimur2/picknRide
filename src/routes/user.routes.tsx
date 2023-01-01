import BackButton from "@components/BackButton/BackButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraView from "@screens/user-screens/CameraView/CameraView";
import CarRideHistory from "@screens/user-screens/CarRideHistory/CarRideHistory";
import Cars from "@screens/user-screens/Cars/Cars";
import Dashboard from "@screens/user-screens/Dashboard/Dashboard";
import DocumentSubmission from "@screens/DocumentSubmission/DocumentSubmission";
import MapScreen from "@screens/MapScreen/MapScreen";
import Notifications from "@screens/user-screens/Notifications/Notifications";
import Pricing from "@screens/user-screens/Pricing/Pricing";
import Receipt from "@screens/user-screens/Receipt/Receipt";
import ReportIssue from "@screens/user-screens/ReportIssue/ReportIssue";
import ScanQrCode from "@screens/user-screens/ScanQrCode/ScanQrCode";
import Settings from "@screens/user-screens/Settings/Settings";
import StartEndRide from "@screens/user-screens/StartEndRide/StartEndRide";
import Account from "@screens/user-screens/Account/Account";
import TripDetails from "@screens/user-screens/TripDetails/TripDetails";
import VarificationStatus from "@screens/user-screens/VarificationStatus/VarificationStatus";
import Wallet from "@screens/user-screens/Wallet/Wallet";
import colors from "@theme/colors";
import { useColorMode } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
