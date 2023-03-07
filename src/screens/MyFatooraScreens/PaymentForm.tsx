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
import {
    ICardListProps,
    IMyFatooraRouteParams,
} from "./types/myfatoora.interface";
import { useTopUpBalanceMutation } from "@store/api/v2/documentApi/documentApiSlice";
import { MFCurrencyISO } from "./types/enums.myfatoora";
import { useRoute } from "@react-navigation/native";
import {
    useExecuteDirectPaymentWithoutTokenMutation,
    useExexuteDirectPaymentWithTokenMutation,
    useInitiateDirectPaymentMutation,
} from "@store/api/v2/payment/paymentApiSlice";

import * as WebBrowser from "expo-web-browser";

export default function PaymentForm({
    paymentMethods,
    amount,
}: {
    paymentMethods: ICardListProps[];
    amount: number;
}) {
    const params = useRoute().params as IMyFatooraRouteParams;

    console.log(params);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isDirectPayment, setIsDirectPayment] = useState(false);
    const { executeDirectPayment, executePayment } = useMyFatoora();
    const dispatch = useDispatch();
    const [topUp, result] = useTopUpBalanceMutation();
    const [initiateDirectPaymentMutation, initiateDirectPaymentResult] =
        useInitiateDirectPaymentMutation();

    const [execDirPayWithToken, execDirPayWithTokenResult] =
        useExexuteDirectPaymentWithTokenMutation();
    const [execDirPayWithoutToken, execDirPayWithoutTokenResult] =
        useExecuteDirectPaymentWithoutTokenMutation();

    console.log(amount);

    const initialState = {
        cardHolderName: "Jhon Smith",
        cardNumber: "4012001037141112",
        month: "12",
        year: "24",
        cvv: "207",
        paymentAmount: amount?.toString() || "",
        paymentMethodId: "",
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
            try {
                // const res = await initiateDirectPaymentMutation({
                //     currencyIso: MFCurrencyISO.QATAR_QAR,
                //     invoiceValue: parseFloat(values.paymentAmount),
                // }).unwrap();

                // const initiateDirectPaymentMutationData = {
                //     data: {
                //         isSuccess: true,
                //         message: null,
                //         validationErrors: null,
                //         data: {
                //             paymentMethods: [
                //                 {
                //                     paymentMethodId: 4,
                //                     paymentMethodAr: "سداد",
                //                     paymentMethodEn: "Sadad",
                //                     paymentMethodCode: "s",
                //                     isDirectPayment: false,
                //                     serviceCharge: 2.222,
                //                     totalAmount: 42.222,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/s.png",
                //                     isEmbeddedSupported: false,
                //                     paymentCurrencyIso: "SAR",
                //                 },
                //                 {
                //                     paymentMethodId: 7,
                //                     paymentMethodAr: "البطاقات المدينة - قطر",
                //                     paymentMethodEn: "Qatar Debit Cards",
                //                     paymentMethodCode: "np",
                //                     isDirectPayment: false,
                //                     serviceCharge: 2.222,
                //                     totalAmount: 42.222,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/np.png",
                //                     isEmbeddedSupported: false,
                //                     paymentCurrencyIso: "QAR",
                //                 },
                //                 {
                //                     paymentMethodId: 6,
                //                     paymentMethodAr: "مدى",
                //                     paymentMethodEn: "MADA",
                //                     paymentMethodCode: "md",
                //                     isDirectPayment: false,
                //                     serviceCharge: 12.218,
                //                     totalAmount: 40,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/md.png",
                //                     isEmbeddedSupported: true,
                //                     paymentCurrencyIso: "SAR",
                //                 },
                //                 {
                //                     paymentMethodId: 1,
                //                     paymentMethodAr: "كي نت",
                //                     paymentMethodEn: "KNET",
                //                     paymentMethodCode: "kn",
                //                     isDirectPayment: false,
                //                     serviceCharge: 12.618,
                //                     totalAmount: 40,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/kn.png",
                //                     isEmbeddedSupported: false,
                //                     paymentCurrencyIso: "KWD",
                //                 },
                //                 {
                //                     paymentMethodId: 11,
                //                     paymentMethodAr: "أبل الدفع",
                //                     paymentMethodEn: "Apple Pay",
                //                     paymentMethodCode: "ap",
                //                     isDirectPayment: false,
                //                     serviceCharge: 12.618,
                //                     totalAmount: 40,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/ap.png",
                //                     isEmbeddedSupported: true,
                //                     paymentCurrencyIso: "QAR",
                //                 },
                //                 {
                //                     paymentMethodId: 2,
                //                     paymentMethodAr: "فيزا / ماستر",
                //                     paymentMethodEn: "VISA/MASTER",
                //                     paymentMethodCode: "vm",
                //                     isDirectPayment: false,
                //                     serviceCharge: 1.262,
                //                     totalAmount: 40,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/vm.png",
                //                     isEmbeddedSupported: true,
                //                     paymentCurrencyIso: "KWD",
                //                 },
                //                 {
                //                     paymentMethodId: 14,
                //                     paymentMethodAr: "STC Pay",
                //                     paymentMethodEn: "STC Pay",
                //                     paymentMethodCode: "stc",
                //                     isDirectPayment: false,
                //                     serviceCharge: 1.262,
                //                     totalAmount: 40,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/stc.png",
                //                     isEmbeddedSupported: false,
                //                     paymentCurrencyIso: "SAR",
                //                 },
                //                 {
                //                     paymentMethodId: 8,
                //                     paymentMethodAr:
                //                         "كروت الدفع المدنية (الإمارات)",
                //                     paymentMethodEn: "UAE Debit Cards",
                //                     paymentMethodCode: "uaecc",
                //                     isDirectPayment: false,
                //                     serviceCharge: 2.222,
                //                     totalAmount: 42.222,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/uaecc.png",
                //                     isEmbeddedSupported: true,
                //                     paymentCurrencyIso: "AED",
                //                 },
                //                 {
                //                     paymentMethodId: 5,
                //                     paymentMethodAr: "بنفت",
                //                     paymentMethodEn: "Benefit",
                //                     paymentMethodCode: "b",
                //                     isDirectPayment: false,
                //                     serviceCharge: 2.022,
                //                     totalAmount: 40,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/b.png",
                //                     isEmbeddedSupported: false,
                //                     paymentCurrencyIso: "BHD",
                //                 },
                //                 {
                //                     paymentMethodId: 9,
                //                     paymentMethodAr:
                //                         "Visa/Master Direct 3DS Flow",
                //                     paymentMethodEn:
                //                         "Visa/Master Direct 3DS Flow",
                //                     paymentMethodCode: "vm",
                //                     isDirectPayment: true,
                //                     serviceCharge: 2.222,
                //                     totalAmount: 42.222,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/vm.png",
                //                     isEmbeddedSupported: true,
                //                     paymentCurrencyIso: "KWD",
                //                 },
                //                 {
                //                     paymentMethodId: 20,
                //                     paymentMethodAr: "Visa/Master Direct",
                //                     paymentMethodEn: "Visa/Master Direct",
                //                     paymentMethodCode: "vm",
                //                     isDirectPayment: true,
                //                     serviceCharge: 1.262,
                //                     totalAmount: 40,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/vm.png",
                //                     isEmbeddedSupported: true,
                //                     paymentCurrencyIso: "KWD",
                //                 },
                //                 {
                //                     paymentMethodId: 3,
                //                     paymentMethodAr: "اميكس",
                //                     paymentMethodEn: "AMEX",
                //                     paymentMethodCode: "ae",
                //                     isDirectPayment: false,
                //                     serviceCharge: 2.222,
                //                     totalAmount: 42.222,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/ae.png",
                //                     isEmbeddedSupported: true,
                //                     paymentCurrencyIso: "USD",
                //                 },
                //                 {
                //                     paymentMethodId: 25,
                //                     paymentMethodAr: "أبل باي (مدي)",
                //                     paymentMethodEn: "Apple Pay (Mada)",
                //                     paymentMethodCode: "ap",
                //                     isDirectPayment: false,
                //                     serviceCharge: 0.4,
                //                     totalAmount: 40,
                //                     currencyIso: "QAR",
                //                     imageUrl:
                //                         "https://demo.myfatoorah.com/imgs/payment-methods/ap.png",
                //                     isEmbeddedSupported: true,
                //                     paymentCurrencyIso: "KWD",
                //                 },
                //             ],
                //         },
                //     },
                //     succeeded: true,
                // };

                const res2 = await execDirPayWithToken({
                    currencyIso: MFCurrencyISO.QATAR_QAR,
                    invoiceValue: parseFloat(values.paymentAmount),
                    paymentMethodId: values.paymentMethodId,
                }).unwrap();

                if (res2.succeeded) {
                    if (res2?.data?.paymentURL && res2?.data?.callBackURL) {
                        const info = await WebBrowser.openAuthSessionAsync(
                            res2?.data?.paymentURL,
                            res2?.data?.callBackURL
                        );
                        console.log({ info });
                    }
                    // const resData = {
                    //     data: {
                    //         amount: "20",
                    //         callBackURL:
                    //             "http://3.139.151.111/api/Payment/CallBackPayment",
                    //         paymentId: "07072107602148613271",
                    //         paymentURL:
                    //             "https://demo.MyFatoorah.com/En/KWT/PayInvoice/MpgsAuthentication?paymentId=07072107602148613271&sessionId=SESSION0002365723296J1007127F14",
                    //         status: "Success",
                    //     },
                    //     succeeded: true,
                    // };
                    alert("Payment Success");
                } else {
                    const res3 = await execDirPayWithoutToken({
                        currencyIso: MFCurrencyISO.QATAR_QAR,
                        invoiceValue: parseFloat(values.paymentAmount),
                        paymentMethodId: values.paymentMethodId,
                        cardNumber: values.cardNumber,
                        expiryMonth: values.month,
                        expiryYear: values.year,
                        securityCode: values.cvv,
                        cardHolderName: values.cardHolderName,
                    }).unwrap();

                    if (res3.succeeded) {
                        alert("Payment Success");
                    } else {
                        alert("Payment Failed");
                    }
                }
            } catch (error) {
                alert("Payment Failed");
                console.log("initiateDirectPaymentMutation", error);
            }
        },
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
    } = formik;

    console.log(values);

    React.useEffect(() => {
        if (amount) {
            setFieldValue("paymentAmount", amount);
        }
    }, [amount]);

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
                <H3>Select method</H3>
                {/* <FormControl>
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
                </FormControl> */}

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
                    setPaymentMethodId={(value) => {
                        setFieldValue("paymentMethodId", value);
                    }}
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
                                    defaultValue={amount?.toString() || ""}
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
            <Center pb={20}>
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
