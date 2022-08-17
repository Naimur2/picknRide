import { createDrawerNavigator } from "@react-navigation/drawer";
import { useColorMode } from "native-base";
import React from "react";
import CustomDrawer from "../screens/customDrawer/CustomDrawer";
import UserRoute from "./user.routes";

export default function DrawerRoute() {
    const { colorMode } = useColorMode();
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                overlayColor: colorMode === "dark" ? "#00000080" : "#ffffff80",

                drawerStyle: {
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    overflow: "hidden",
                },
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="UserRoute" component={UserRoute} />
        </Drawer.Navigator>
    );
}
