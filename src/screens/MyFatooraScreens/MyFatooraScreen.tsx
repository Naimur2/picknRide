import H3 from "@components/H3/H3";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { useRoute, useNavigation } from "@react-navigation/native";
import WalletTab from "@screens/user-screens/Wallet/WalletTab/WalletTab";
import { setLoading } from "@store/features/ui/uiSlice";
import { HStack, Text, VStack, useColorMode } from "native-base";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PaymentForm from "./PaymentForm";
import useMyFatoora from "./mfhooks/useMyFatoora";
import {
    ICardListProps,
    IMyFatooraRouteParams,
    IPaymentAmount,
} from "./types/myfatoora.interface";
import RideCompleteData from "@screens/MapScreen/components/RideCompleteModal/RideCompleteData";
import PaymentTimer from "./components/PaymentTimer";

const amounts: IPaymentAmount[] = [
    {
        _id: 1,
        amount: 20,
        currency: "QAR",
    },
    {
        _id: 2,
        amount: 40,
        currency: "QAR",
    },
    {
        _id: 3,
        amount: 50,
        currency: "QAR",
    },
    {
        _id: 4,
        amount: 100,
        currency: "QAR",
    },
];

const AmountDetails = ({
    amount,
    label = "Available Balance",
}: {
    amount: number;
    label: string;
}) => {
    return (
        <VStack>
            <Text fontWeight={600} fontSize={14}>
                {label}
            </Text>
            <HStack
                bg={"#ffffff90"}
                borderWidth={1}
                borderRadius={10}
                borderColor={"#ccc"}
                w="full"
                px={4}
                py={4}
                mt={2}
            >
                <Text fontWeight={500} fontSize={14}>
                    {amount}
                </Text>
            </HStack>
        </VStack>
    );
};

export default function MyFatooraPayment() {
    const distpatch = useDispatch();
    const { colorMode } = useColorMode();
    const params = useRoute().params as IMyFatooraRouteParams;
    const [selected, setSelected] = React.useState(amounts[0]);
    const navigation = useNavigation();
    console.log("params", params);

    const [paymentMethods, setPaymentMethods] = useState<ICardListProps[]>([]);

    const { initiatePayments } = useMyFatoora();

    const selectedAmount = selected?.amount;

    const amountValue =
        params?.paymentFor === "lowBalance" ? params.amount : selectedAmount;

    React.useEffect(() => {
        distpatch(setLoading(true));
        initiatePayments()
            .then((res) => {
                console.log("initiatePayments", res);
                setPaymentMethods(res?.Data?.PaymentMethods);
                distpatch(setLoading(false));
            })
            .catch((err) => {
                alert(err);
                distpatch(setLoading(false));
            });
    }, []);

    let showAddMoney = params?.paymentFor === "lowBalance";
    let showPayNow = params?.paymentFor === "recharge";

    console.log("params", params);

    return (
        <ImageBg type={colorMode} flexGrow={1}>
            <Scroller>
                <H3 mt={10} px={4}>
                    {showAddMoney ? "Pay Now" : "Add Money"}
                </H3>
                {showPayNow ? (
                    <HStack px={4} justifyContent={"space-between"}>
                        {amounts.map((amount, index) => (
                            <WalletTab
                                key={index.toString() + amount._id}
                                item={amount}
                                isActive={selected?._id === amount?._id}
                                onSelect={(item) => setSelected(item)}
                            />
                        ))}
                    </HStack>
                ) : (
                    <VStack p={4} space={4}>
                        <Text fontWeight={600} fontSize={17}>
                            {params?.paymentDetails?.message ||
                                "Your trip is paused due to low balance. Please add money to continue your trip."}
                        </Text>

                        <VStack
                            justifyContent={"center"}
                            alignItems={"center"}
                            my={2}
                        >
                            <Text fontWeight={500} textAlign={"center"}>
                                Your payment is pending, please complete the
                                payment within
                            </Text>
                            <HStack alignItems={"center"} space="2">
                                <PaymentTimer
                                    timeLimit={5}
                                    onFinish={() => {
                                        navigation.goBack();
                                    }}
                                />
                                <Text textAlign={"center"} fontWeight={500}>
                                    min
                                </Text>
                            </HStack>
                        </VStack>

                        <RideCompleteData
                            startLocation={params?.paymentDetails?.from}
                            endLocation={params?.paymentDetails?.to}
                            amount={
                                params?.paymentDetails?.requiredAmount * -1 || 0
                            }
                            distanceTravelled={params?.paymentDetails?.distance}
                            timeElapsed={params?.paymentDetails?.duration}
                            hideCompletText={true}
                        />
                    </VStack>
                )}

                <PaymentForm
                    amount={amountValue}
                    paymentMethods={paymentMethods}
                />
            </Scroller>
        </ImageBg>
    );
}
