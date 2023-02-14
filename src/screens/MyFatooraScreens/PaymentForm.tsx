import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import H3 from "@components/H3/H3";
import ImageBg from "@components/ImageBg/ImageBg";
import { setLoading } from "@store/features/ui/uiSlice";
import { fontSizes } from "@theme/typography";
import { useFormik } from "formik";
import {
    Center,
    FormControl,
    HStack,
    Input,
    Text,
    VStack,
    useColorMode,
} from "native-base";
import React, { useState } from "react";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import GradientBtn from "../../components/GradientBtn/GradientBtn";
import PaymentMethodsList from "./components/PaymentMethodList";
import useMyFatoora from "./mfhooks/useMyFatoora";
import { ICardListProps } from "./types/myfatoora.interface";
import { useTopUpBalanceMutation } from "@store/api/v2/documentApi/documentApiSlice";

export default function PaymentForm({
    paymentMethods,
    amount,
}: {
    paymentMethods: ICardListProps[];
    amount: number;
}) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isDirectPayment, setIsDirectPayment] = useState(false);
    const { executeDirectPayment, executePayment } = useMyFatoora();
    const dispatch = useDispatch();
    const [topUp, result] = useTopUpBalanceMutation();

    const initialState = {
        cardHolderName: "",
        cardNumber: "",
        month: "",
        year: "",
        cvv: "",
        paymentAmount: amount.toString() || "",
    };

    // q:minimum number of digit in credit card number?
    const creditCardNumberSchema = Yup.object().shape({
        cardHolderName: Yup.string().required("Card name is required"),
        cardNumber: Yup.string().required("Card number is required"),
        month: Yup.string().required("Required"),
        year: Yup.string().required("Required"),
        cvv: Yup.string().required("Required"),
        paymentAmount: Yup.number().required("Required"),
    });

    const onExecutePaymentButtonClickHandler = () => {
        if (paymentMethods[selectedIndex].IsDirectPayment) {
            executeDirectPayment({
                cardExpiryMonth: values.month,
                cardExpiryYear: values.year,
                cardHolderName: values.cardHolderName,
                cardNumber: values.cardNumber,
                cardSecureCode: values.cvv,
                paymentMethods: paymentMethods,
                selectedIndex,
                invoiceValue: parseFloat(values.paymentAmount),
                paymentType: "CARD",
            })
                .then((res) => {
                    console.log("executeDirectPayment", res);
                })
                .catch((err) => {
                    alert(err);
                });
        } else {
            executePayment({
                invoiceValue: parseFloat(values.paymentAmount),
                paymentMethods: paymentMethods,
                selectedIndex,
            })
                .then((res) => {
                    dispatch(setLoading(false));
                    if (res?.Data?.PaymentURL) {
                        topUp({
                            amount: parseFloat(values.paymentAmount),
                            payemntStatus: 1,
                            paymentData: res?.Data?.PaymentURL,
                            paymentType: selectedIndex,
                            remark: "topup",
                        })
                            .unwrap()
                            .then((res) => {
                                alert("Payment Success");
                            })
                            .catch((err) => {
                                alert("Payment Failed");
                            });
                    } else {
                        alert("Payment Failed");
                    }
                })
                .catch((err) => {
                    dispatch(setLoading(false));
                    alert("Payment Failed");
                });
        }
    };

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: creditCardNumberSchema,
        onSubmit: async (values) => {
            onExecutePaymentButtonClickHandler();
        },
    });

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        formik;

    const formHandler = () => {
        if (isDirectPayment) {
            handleSubmit();
        } else {
            onExecutePaymentButtonClickHandler();
        }
    };

    return (
        <>
            <VStack p={6} space="4">
                <H3>Pay Now</H3>
                <FormControl>
                    <Text
                        fontWeight={600}
                        fontSize={fontSizes.sm}
                        _dark={{ color: "#fff" }}
                    >
                        Enter Amount
                    </Text>
                    <Input
                        fontSize={fontSizes.sm}
                        fontWeight={600}
                        variant="underlined"
                        borderBottomColor={"light.200"}
                        placeholder="Enter Amount"
                        placeholderTextColor="gray.300"
                        _dark={{
                            color: "#fff",
                            placeholderTextColor: "white",
                        }}
                        keyboardType="numeric"
                        onChangeText={handleChange("paymentAmount")}
                        onBlur={handleBlur("paymentAmount")}
                        value={values.paymentAmount}
                    />
                </FormControl>

                <Text
                    fontWeight={600}
                    fontSize={fontSizes.sm}
                    _dark={{ color: "#fff" }}
                >
                    Select Payment Method
                </Text>

                <PaymentMethodsList
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    paymentMethods={paymentMethods}
                    setIsDirectPayment={setIsDirectPayment}
                />

                {isDirectPayment ? (
                    <VStack space="4">
                        <Text
                            fontWeight={600}
                            fontSize={fontSizes.md}
                            _dark={{ color: "#fff" }}
                        >
                            Card Details
                        </Text>
                        <FormControl>
                            <FormControl.Label
                                fontSize={fontSizes.xs}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                Name
                            </FormControl.Label>
                            <Input
                                fontSize={fontSizes.sm}
                                fontWeight={600}
                                variant="underlined"
                                borderBottomColor={"light.200"}
                                placeholder="Enter name"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                value={values.cardHolderName}
                                onChangeText={handleChange("cardHolderName")}
                                onBlur={handleBlur("cardHolderName")}
                                autoCorrect={false}
                                autoComplete="off"
                            />
                            {errors.cardHolderName && touched.cardHolderName ? (
                                <ErrorMessage>
                                    {errors.cardHolderName}
                                </ErrorMessage>
                            ) : null}
                        </FormControl>
                        <FormControl>
                            <FormControl.Label
                                fontSize={fontSizes.xs}
                                color="gray.400"
                                _dark={{ color: "#fff" }}
                            >
                                Card Number
                            </FormControl.Label>
                            <Input
                                fontSize={fontSizes.sm}
                                fontWeight={600}
                                variant="underlined"
                                borderBottomColor={"light.200"}
                                placeholder="0000 0000 0000 0000"
                                placeholderTextColor="gray.300"
                                _dark={{
                                    color: "#fff",
                                    placeholderTextColor: "white",
                                }}
                                value={values.cardNumber}
                                onChangeText={handleChange("cardNumber")}
                                onBlur={handleBlur("cardNumber")}
                                keyboardType="numeric"
                            />
                            {errors.cardNumber && touched.cardNumber ? (
                                <ErrorMessage>{errors.cardNumber}</ErrorMessage>
                            ) : null}
                        </FormControl>

                        <HStack justifyContent="space-between">
                            <FormControl w={"31%"}>
                                <FormControl.Label
                                    fontSize={fontSizes.xs}
                                    color="gray.400"
                                    _dark={{ color: "#fff" }}
                                >
                                    Expiry Month
                                </FormControl.Label>
                                <Input
                                    fontSize={fontSizes.sm}
                                    fontWeight={600}
                                    variant="underlined"
                                    borderBottomColor={"light.200"}
                                    placeholder="01"
                                    placeholderTextColor="gray.300"
                                    _dark={{
                                        color: "#fff",
                                        placeholderTextColor: "white",
                                    }}
                                    value={values.month}
                                    onChangeText={handleChange("month")}
                                    onBlur={handleBlur("month")}
                                    keyboardType="numeric"
                                    editable={false}
                                    isDisabled={Boolean(amount)}
                                    isReadOnly={Boolean(amount)}
                                    defaultValue={amount.toString() || ""}
                                />
                                {errors.month && touched.month ? (
                                    <ErrorMessage>{errors.month}</ErrorMessage>
                                ) : null}
                            </FormControl>
                            <FormControl w={"31%"}>
                                <FormControl.Label
                                    fontSize={fontSizes.xs}
                                    color="gray.400"
                                    _dark={{ color: "#fff" }}
                                >
                                    Expiry Year
                                </FormControl.Label>
                                <Input
                                    fontSize={fontSizes.sm}
                                    fontWeight={600}
                                    variant="underlined"
                                    borderBottomColor={"light.200"}
                                    placeholder="2000"
                                    placeholderTextColor="gray.300"
                                    _dark={{
                                        color: "#fff",
                                        placeholderTextColor: "white",
                                    }}
                                    value={values.year}
                                    onChangeText={handleChange("year")}
                                    onBlur={handleBlur("year")}
                                    keyboardType="numeric"
                                />
                                {errors.year && touched.year ? (
                                    <ErrorMessage>{errors.year}</ErrorMessage>
                                ) : null}
                            </FormControl>
                            <FormControl w={"29%"}>
                                <FormControl.Label
                                    fontSize={fontSizes.xs}
                                    color="gray.400"
                                    _dark={{ color: "#fff" }}
                                >
                                    CVV
                                </FormControl.Label>
                                <Input
                                    fontSize={fontSizes.sm}
                                    fontWeight={600}
                                    variant="underlined"
                                    borderBottomColor={"light.200"}
                                    placeholder="123"
                                    placeholderTextColor="gray.300"
                                    _dark={{
                                        color: "#fff",
                                        placeholderTextColor: "white",
                                    }}
                                    value={values.cvv}
                                    onChangeText={handleChange("cvv")}
                                    onBlur={handleBlur("cvv")}
                                    keyboardType="numeric"
                                />

                                {errors.cvv && touched.cvv ? (
                                    <ErrorMessage>{errors.cvv}</ErrorMessage>
                                ) : null}
                            </FormControl>
                        </HStack>
                    </VStack>
                ) : null}
            </VStack>
            <Center pb={10}>
                <GradientBtn
                    gradientStyle={{
                        width: scale(250) + "px",
                    }}
                    title={"Pay Now"}
                    onPress={formHandler}
                    disabled={selectedIndex === -1}
                />
            </Center>
        </>
    );
}
