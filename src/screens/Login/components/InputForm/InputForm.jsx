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
        },
        validationSchema: schema,
        onSubmit: (values) => {},
    });

    const getParsedPhoneNumber = (
        phone: string,
        dialingCode: string,
        countryCode: string
    ) => {
        return parsePhoneNumber(dialingCode + phone, countryCode?.toUpperCase())
            ?.formatNational()
            .replace(" ", "-");
    };
    const {
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
    } = formik;

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

    const [fromData, setFromData] = React.useState({
        dialing_code: "+974",
        phone: "31404159",
        password: "", //"password",
        country: "QA",
    });
    // handleLogin
    const handleLogin = () => {
        // console.log(fromData);
        axios
            .post(`${apiConfig.apiUrl}/login`, fromData)
            .then((res) => {
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
            .catch((err) => {
                console.log(err);
                alert(err);
            });
    };

    // store data in async storage
    const storeData = async (value) => {
        try {
            // await AsyncStorage.setItem('user', JSON.stringify(value))
            await AsyncStorage.setItem("user", value);
        } catch (e) {
            // saving error
            console.log("cont save data in async storage", e);
        }
    };
    // console.log(AsyncStorage.getItem('user').then((value) => {
    //     console.log(value);
    // }));
    return (
        <VStack mt={10} space={2} shadow="7">
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

            <PasswordInput
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
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
