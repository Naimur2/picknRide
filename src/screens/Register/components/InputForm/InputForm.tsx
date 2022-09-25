import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { VStack } from "native-base";
import React from "react";
import apiConfig from "../../../../api_config/ApiConfig";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import PickCountry from "../../../../components/PickCountry/PickCountry";
import Select from "../../../../components/Select/Select";
import TextInput from "../../../../components/TextInput/TextInput";

function InputForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [selectedLocation, setSelectedLocation] = React.useState(null);
    const [formData, setFormData] = React.useState({
        location_id: null,
        f_name: "",
        l_name: "",
        email: "",
        dialing_code: "",
        phone: "",
        password_1: "",
        password_2: "",
    });
    const navigation = useNavigation();

    // handleSubmit
    const handleSubmit = () => {
        const submitFromData = {
            location_id: selectedLocation?.id,
            f_name: formData.f_name,
            l_name: formData.l_name,
            email: formData.email,
            dialing_code: "+794",
            phone: formData.phone,
            password: formData.password_1,
        }
        //console.log(submitFromData);
        // post form data to api
        axios.post(`${apiConfig.apiUrl}/sign_up`, submitFromData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        // const postRegFrom = async () => {
        //     const res = await axios.post(`${apiConfig.apiUrl}/sign_up`, submitFromData);
        //     console.log(res.data);
        //     //  setResidency(res?.data?.data);
        // }
        // postRegFrom();
    };

    return (
        <VStack mt={10} space={2} shadow="7">
            <Select
                onSelect={(loc) => setSelectedLocation(loc)}
                selected={selectedLocation}
            />

            <TextInput placeholder="First Name"
                value={formData.f_name}
                onChangeText={(text) => setFormData({ ...formData, f_name: text })}
            />
            <TextInput placeholder="Last Name"
                value={formData.l_name}
                onChangeText={(text) => setFormData({ ...formData, l_name: text })}

            />
            <TextInput placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}

            />
            <TextInput placeholder="Phone"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType='numeric'
            />
            <PasswordInput placeholder="Password"
                value={formData.password_1}
                onChangeText={(text) => setFormData({ ...formData, password_1: text })}

            />
            <PasswordInput placeholder="Confirm Password"
                value={formData.password_2}
                onChangeText={(text) => setFormData({ ...formData, password_2: text })}
            />

            <PickCountry />

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Sign Up"}
                mx={"auto"}
                mt={4}
                // onPress={() => navigation.navigate("OtpScreen")}
                onPress={() => {
                    handleSubmit();
                }}
            />
        </VStack>
    );
}

export default React.memo(InputForm);
