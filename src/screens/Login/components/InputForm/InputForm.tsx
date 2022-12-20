import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFormik } from "formik";
import { Text, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import apiConfig from "../../../../api_config/ApiConfig";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import PickCountry from "../../../../components/PickCountry/PickCountry";
import { fontSizes } from "../../../../theme-config/typography";
import * as Yup from "yup";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

function InputForm() {
    const [phoneError, setPhoneError] = React.useState("");

    const schema = Yup.object().shape({
        password: Yup.string().required("Password is required"),
        phone: Yup.number().required("Phone number is required"),
    });

    const formik = useFormik({
        initialValues: {
            dialing_code: "+974",
            phone: "",
            password: "", //"password",
            country: "QA",
        },
        validationSchema: schema,
        onSubmit: (values) => {},
    });

    const {
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
    } = formik;

    return (
        <VStack mt={10} space={2} shadow="7">
            <PickCountry
                onChangeText={(txt) => {
                    console.log("txt", txt);
                }}
                onBlur={handleBlur("phone")}
                errorMessage={touched.phone && errors.phone ? errors.phone : ""}
                setPhoneInfo={(phoneInfo) => {
                    setFieldValue("phone", phoneInfo?.phoneNumber);
                    setFieldValue("country", phoneInfo?.countryCode);
                    setFieldValue(
                        "dialing_code",
                        phoneInfo?.dialingCode.slice(1)
                    );
                }}
            />

            <PasswordInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password ? errors.password : null}
            />

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Log In"}
                mx={"auto"}
                mt={4}
                onPress={handleSubmit}
            />
            <Text
                color="gray.100"
                fontSize={13}
                fontWeight="500"
                w={scale(170) + "px"}
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
                fontSize={fontSizes.md}
                fontWeight="500"
                w={scale(170) + "px"}
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
