import H3 from "@components/H3/H3";
import ImageBg from "@components/ImageBg/ImageBg";
import Scroller from "@components/Scroller/Scroller";
import { useRoute } from "@react-navigation/native";
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

    return (
        <ImageBg type={colorMode} flexGrow={1}>
            <Scroller>
                <H3 mt={10} px={4}>
                    {showAddMoney ? "Add Money" : "Pay Now"}
                </H3>
                {showAddMoney ? (
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
                                "Your wallet balance is not enough to pay for this trip. Please add money to your wallet."}
                        </Text>
                        <AmountDetails
                            amount={
                                params?.paymentDetails?.currentBalance || 400
                            }
                            label={"Current Balance"}
                        />
                        <AmountDetails
                            amount={
                                params?.paymentDetails?.requiredAmount || 420
                            }
                            label={"Required Amount"}
                        />
                        <AmountDetails
                            amount={amountValue || 100}
                            label={"You need to add"}
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
