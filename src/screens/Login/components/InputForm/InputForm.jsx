import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Text, VStack } from "native-base";
import React from "react";
import apiConfig from "../../../../api_config/ApiConfig";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import PickCountry from "../../../../components/PickCountry/PickCountry";

function InputForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [fromData, setFromData] = React.useState({
        dialing_code: "+974",
        phone: "31404159",
        password: "",//"password",
    });
    // handleLogin
    const handleLogin = () => {
        // console.log(fromData);
        axios.post(`${apiConfig.apiUrl}/login`, fromData)
            .then(res => {
                // console.log(res.data.status);
                if (res.data.status === 400) {
                    // console.log(res.data);
                    alert("Invalid Number or Password");
                }
                if (res.data.status === 200) {
                    storeData(res.data.data);
                    alert("Login Success");
                    //  console.log(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
    }

    // store data in async storage
    const storeData = async (value) => {
        try {
            // await AsyncStorage.setItem('user', JSON.stringify(value))
            await AsyncStorage.setItem('user', value)

        } catch (e) {
            // saving error
            console.log("cont save data in async storage", e);
        }
    }
    // console.log(AsyncStorage.getItem('user').then((value) => {
    //     console.log(value);
    // }));
    return (
        <VStack mt={10} space={2} shadow="7">
            <PickCountry />
            <PasswordInput placeholder="Password"
                value={fromData.password}
                onChangeText={(text) => setFromData({ ...fromData, password: text })}
            />

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Log In"}
                mx={"auto"}
                mt={4}
                onPress={() => handleLogin()}
            />
            <Text
                color="gray.100"
                fontSize={13}
                fontWeight="500"
                w="170"
                textAlign={"center"}
                mx={"auto"}
                mt={2}
                _dark={{
                    color: "white",
                }}
            >
                Forgot Password
            </Text>
            <Text
                color="gray.100"
                fontSize={20}
                fontWeight="500"
                w="170"
                textAlign={"center"}
                mx={"auto"}
                mt={4}
            >
                Or
            </Text>
        </VStack>
    );
}

export default React.memo(InputForm);
