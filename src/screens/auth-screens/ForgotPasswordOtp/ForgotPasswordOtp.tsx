import GradientBtn from "@components/GradientBtn/GradientBtn";
import OtpInput from "@components/OtpInput/OtpInput";
import { fontSizes } from "@theme/typography";
import { Center, Text, Toast } from "native-base";
import React from "react";
import { scale } from "react-native-size-matters";
import ScreenWithScrollImage from "@components/ScreenWithScrollImage/ScreenWithScrollImage";
import { ISelectValidateOtpTypeParams } from "../ForgotPassword/ForgotPassword.types";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
    useVerifyForgotPasswordOtpEmailMutation,
    useVerifyForgotPasswordOtpWhatsappMutation,
} from "@store/api/v1/authApi/authApiSlice";
import ErrorToast from "@components/ErrorToast/ErrorToast";

export default function ForgotPasswordOtp() {
    const [otp, setOtp] = React.useState<string>("");
    const navigation = useNavigation();

    const routeParams = useRoute().params as ISelectValidateOtpTypeParams;
    const [whatsappOtpVerify, whatsappOtpVerifyResult] =
        useVerifyForgotPasswordOtpWhatsappMutation();
    const [emailOtpVerify, emailOtpVerifyResult] =
        useVerifyForgotPasswordOtpEmailMutation();

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            Toast.show({
                id: "otpError" + Math.random(),
                render: () => <ErrorToast message="Please enter a valid OTP" />,
                placement: "top",
            });
        } else {
            if (routeParams.validationType === "whatsapp") {
                try {
                    const result = await whatsappOtpVerify({
                        otp,
                        phoneCode: routeParams.phoneCode,
                        mobileNo: routeParams.mobileNo,
                    });
                    if (result.error) {
                        Toast.show({
                            id: "otpError",
                            render: () => (
                                <ErrorToast message={result.error.message} />
                            ),
                            placement: "top",
                        });
                    } else {
                        navigation.navigate("ResetPassword", routeParams);
                    }
                } catch (error) {
                    Toast.show({
                        id: "otpError",
                        render: () => (
                            <ErrorToast message={"Error validating otp"} />
                        ),
                        placement: "top",
                    });
                }
            } else if (routeParams.validationType === "email") {
                try {
                    const result = await emailOtpVerify({
                        otp,
                        email: routeParams.emailId,
                    });
                    if (result.error) {
                        Toast.show({
                            id: "otpError",
                            render: () => (
                                <ErrorToast message={result.error.message} />
                            ),
                            placement: "top",
                        });
                    } else {
                        navigation.navigate("ResetPassword", routeParams);
                    }
                } catch (error) {
                    Toast.show({
                        id: "otpError",
                        render: () => (
                            <ErrorToast message={"Error validating otp"} />
                        ),
                        placement: "top",
                    });
                }
            }
        }
    };

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
                Verify with codes sent to you
            </Text>
            <OtpInput my={20} numInputs={6} setOtp={(otp) => setOtp(otp)} />
            <Center>
                <GradientBtn
                    title="Verify"
                    onPress={handleVerifyOtp}
                    disabled={
                        whatsappOtpVerifyResult.isLoading ||
                        emailOtpVerifyResult.isLoading ||
                        otp.length !== 6
                    }
                />
            </Center>
        </ScreenWithScrollImage>
    );
}
