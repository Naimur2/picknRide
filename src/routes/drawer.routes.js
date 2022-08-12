import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import CustomDrawer from "../screens/customDrawer/CustomDrawer";
import UserRoute from "./user.routes";


export default function DrawerRoute() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={(props)=><CustomDrawer {...props} />}
        >
            <Drawer.Screen name="UserRoute" component={UserRoute} />
        </Drawer.Navigator>
    );
}
