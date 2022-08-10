import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import UserRoute from "./user.routes";


export default function DrawerRoute() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name="UserRoute" component={UserRoute} />
        </Drawer.Navigator>
    );
}