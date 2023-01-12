import GradientBtn from "@components/GradientBtn/GradientBtn";
import PasswordInput from "@components/PasswordInput/PasswordInput";
import PickCountry from "@components/PickCountry/PickCountry";
import { useFormik } from "formik";
import { Text, Toast, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import * as Yup from "yup";

import { fontSizes } from "@theme/typography";

import { useLoginApiMutation } from "@store/api/v1/authApi/authApiSlice";
import { ILoginProps } from "@store/api/v1/authApi/authApiSlice.types";
import { Keyboard } from "react-native";
import ErrorToast from "../../../../components/ErrorToast/ErrorToast";

function SignInInputForm() {
    const schema = Yup.object().shape({
        password: Yup.string().required("Password is required"),
        phone: Yup.number().required("Phone number is required"),
    });

    const [login, result] = useLoginApiMutation();

    React.useEffect(() => {
        if (result.data?.status === 400) {
            console.log("result.error", result);
            Toast.show({
                id: "error",
                render: () => (
                    <ErrorToast
                        message={result.data?.message || "Something went wrong"}
                    />
                ),
                placement: "top",
            });
        }
    }, [result]);

    const formik = useFormik({
        initialValues: {
            dialing_code: "974",
            phone: "",
            password: "", //"password",
            country: "QA",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            Keyboard.dismiss();
            const { phone, password, dialing_code } = values;
            const body: ILoginProps = {
                phone: phone,
                password: password,
                dialing_code: "+" + dialing_code,
            };
            await login(body);
        },
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
                disabled={result.isLoading}
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

export default React.memo(SignInInputForm);
