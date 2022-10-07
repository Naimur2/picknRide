import { useNavigation } from "@react-navigation/native";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useFormik } from "formik";
import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { VStack } from "native-base";
import React from "react";
import { Alert } from "react-native";
import * as Yup from "yup";
import apiConfig from "../../../../api_config/ApiConfig";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import GradientBtn from "../../../../components/GradientBtn/GradientBtn";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import PickCountry from "../../../../components/PickCountry/PickCountry";
import Select from "../../../../components/Select/Select";
import TextInput from "../../../../components/TextInput/TextInput";

function InputForm() {
    const navigation = useNavigation();
    const [phoneError, setPhoneError] = React.useState("");

    const schema = Yup.object().shape({
        f_name: Yup.string().required("First Name is required"),
        l_name: Yup.string().required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password_1: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number"
            ),
        password_2: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password_1"), null], "Passwords must match"),
        dialing_code: Yup.string().required("Dialing code is required"),
        phone: Yup.number().required("Phone number is required"),
        location_id: Yup.string().required("Location is required"),
    });

    const formik = useFormik({
        initialValues: {
            location_id: "",
            f_name: "",
            l_name: "",
            email: "",
            dialing_code: "+974",
            phone: "",
            password_1: "",
            password_2: "",
            country: "QA",
        },
        onSubmit: async (values) => {
            if (!phoneError) {
                try {
                    delete values.password_2;
                    delete values.country;
                    const data = {
                        ...values,
                        dialing_code: "+" + values.dialing_code,
                        password: values.password_1,
                    };
                    const res: AxiosResponse = await axios.post(
                        `${apiConfig.apiUrl}/sign_up`,
                        data
                    );

                    if (res.status === 200) {
                        navigation.navigate("OtpScreen", {
                            phone: values.phone,
                            dialing_code: values.dialing_code,
                        });
                    } else {
                        console.log(res);
                        Alert.alert("Error", "Something went wrong");
                    }
                } catch (error: AxiosError) {
                    alert(error);
                }
            }
        },
        validationSchema: schema,
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

    // custom phone validation function for yup

    const getParsedPhoneNumber = (
        phone: string,
        dialingCode: string,
        countryCode: string
    ) => {
        return parsePhoneNumber(dialingCode + phone, countryCode?.toUpperCase())
            ?.formatNational()
            .replace(" ", "-");
    };

    React.useEffect(() => {
        if (values.phone) {
            const phone = getParsedPhoneNumber(
                values.phone,
                values.dialing_code,
                values.country
            );

            const isPhoneNumber = isValidPhoneNumber(
                `(${values.dialing_code}) ${values.phone}`,
                values.country
            );
            if (phone && isPhoneNumber) {
                setPhoneError("");
            } else {
                setPhoneError("Invalid phone number");
            }
        }
    }, [values.phone, values.dialing_code, values.country]);

    return (
        <VStack mt={10} space={3} shadow="7">
            <VStack>
                <Select
                    onSelect={(id) => setFieldValue("location_id", id)}
                    selected={values.location_id}
                />
                {touched.location_id && errors.location_id ? (
                    <ErrorMessage>{errors?.location_id}</ErrorMessage>
                ) : null}
            </VStack>

            <TextInput
                placeholder="First Name"
                value={values.f_name}
                onChangeText={handleChange("f_name")}
                onBlur={handleBlur("f_name")}
                error={touched.f_name && errors.f_name}
            />
            <TextInput
                placeholder="Last Name"
                value={values.l_name}
                onChangeText={handleChange("l_name")}
                onBlur={handleBlur("l_name")}
                error={touched.l_name && errors.l_name}
            />
            <TextInput
                placeholder="Email"
                value={values.email}
                onChangeText={(value) =>
                    setFieldValue("email", value.toLowerCase())
                }
                onBlur={handleBlur("email")}
                error={touched.email && errors.email}
            />

            <PasswordInput
                placeholder="Password"
                value={values.password_1}
                onChangeText={handleChange("password_1")}
                onBlur={handleBlur("password_1")}
                error={touched.password_1 && errors.password_1}
            />

            <PasswordInput
                placeholder="Confirm Password"
                value={values.password_2}
                onChangeText={handleChange("password_2")}
                onBlur={handleBlur("password_2")}
                error={touched.password_2 && errors.password_2}
            />

            <VStack>
                <PickCountry
                    onSelect={(dialingCode) => {
                        setFieldValue("dialing_code", `${dialingCode[0]}`);
                        console.log(dialingCode);
                    }}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    setCountryCCA2={(cca2) => {
                        setFieldValue("country", cca2?.toUpperCase());
                    }}
                />
                {phoneError || (touched.phone && errors.phone) ? (
                    <ErrorMessage>{phoneError || errors?.phone}</ErrorMessage>
                ) : null}
                {touched.dialing_code && errors.dialing_code ? (
                    <ErrorMessage>{errors?.dialing_code}</ErrorMessage>
                ) : null}
            </VStack>

            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Sign Up"}
                mx={"auto"}
                mt={4}
                // onPress={() => navigation.navigate("OtpScreen")}
                onPress={handleSubmit}
            />
        </VStack>
    );
}

export default React.memo(InputForm);
