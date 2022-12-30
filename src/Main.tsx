import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "native-base";
import React from "react";
import useAuth from "./hooks/useAuth";
import AuthRoute from "./routes/auth.routes";
import DrawerRoute from "./routes/drawer.routes";
import { useSelector } from "react-redux";
import { selectAuth } from "./store/store";
import { IAuthState } from "./store/features/auth/authSlice.types";

function HomeScreen() {
    return (
        <View>
            <Text color={"#000"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                quos consequuntur inventore totam! Sint, magnam error.
                Perferendis architecto a laborum neque laudantium accusantium
                sunt rerum modi voluptate itaque quo numquam quod, velit
                voluptatum non nobis nulla omnis minima. Atque, dignissimos?
            </Text>
        </View>
    );
}

const Stack = createNativeStackNavigator();

export default function Main() {
    const auth = useSelector(selectAuth) as IAuthState;

    console.log(auth);

    if (auth?.token) {
        return <DrawerRoute />;
    }

    return <AuthRoute />;

    // return (
    //     <Stack.Navigator>
    //         <Stack.Screen name="Home" component={HomeScreen} />
    //     </Stack.Navigator>
    // );
}
