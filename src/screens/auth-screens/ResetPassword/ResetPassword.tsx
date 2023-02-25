import GradientBtn from "@components/GradientBtn/GradientBtn";
import PasswordInput from "@components/PasswordInput/PasswordInput";
import ScreenWithScrollImage from "@components/ScreenWithScrollImage/ScreenWithScrollImage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fontSizes } from "@theme/typography";
import { useFormik } from "formik";
import { Text, VStack } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import * as Yup from "yup";
import { ISelectValidateOtpTypeParams } from "../ForgotPassword/ForgotPassword.types";

function ResetPassword() {
    const navigation = useNavigation();
    const routeParams = useRoute().params as ISelectValidateOtpTypeParams;

    const schema = Yup.object().shape({
        password_1: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number"
            ),
        password_2: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password_1"), null], "Passwords must match"),
    });

    const formik = useFormik({
        initialValues: {
            password_1: "",
            password_2: "",
        },
        onSubmit: async (values) => {
            const { password_1 } = values;
        },
        validationSchema: schema,
    });

    const { values, handleChange, handleBlur, errors, touched, handleSubmit } =
        formik;

    return (
        <ScreenWithScrollImage>
            <Text
                mt={scale(30) + "px"}
                color="primary.200"
                fontSize={fontSizes.md}
                fontWeight="bold"
                textAlign={"center"}
                maxWidth={220}
                mx={"auto"}
            >
                Reset Password by entering your new password
            </Text>
            <VStack my={20} space={4}>
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
            </VStack>
            <GradientBtn
                gradientStyle={{ maxWidth: 250 }}
                title={"Reset Password"}
                mx={"auto"}
                mt={4}
                // onPress={() => navigation.navigate("OtpScreen")}
                onPress={handleSubmit}
                disabled={true}
            />
        </ScreenWithScrollImage>
    );
}

export default ResetPassword;
