import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import React from "react";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import PickCountry from "../../../../components/PickCountry/PickCountry";
import Select from "../../../../components/Select/Select";
import TextInput from "../../../../components/TextInput/TextInput";

function InputForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [selectedLocation, setSelectedLocation] = React.useState(null);

    const navigation = useNavigation();

    React.useEffect(() => {
        console.log("selectedLocation");
    }, []);

    return (
        <VStack mt={10} space={2} shadow="7">
            <Select
                onSelect={(loc) => setSelectedLocation(loc)}
                selected={selectedLocation}
            />

            <TextInput placeholder="First Name" />
            <TextInput placeholder="Last Name" />
            <TextInput placeholder="Email" />
            <TextInput placeholder="Phone" />
            <PasswordInput placeholder="Password" />
            <PasswordInput placeholder="Confirm Password" />

            <PickCountry />

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Sign Up"}
                mx={"auto"}
                mt={4}
                onPress={() => navigation.navigate("OtpScreen")}
            />
        </VStack>
    );
}

export default React.memo(InputForm);
