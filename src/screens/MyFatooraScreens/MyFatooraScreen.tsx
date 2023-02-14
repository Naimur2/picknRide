import Scroller from "@components/Scroller/Scroller";
import { setLoading } from "@store/features/ui/uiSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useMyFatoora from "./mfhooks/useMyFatoora";
import { ICardListProps } from "./types/myfatoora.interface";
import PaymentForm from "./PaymentForm";
import ImageBg from "@components/ImageBg/ImageBg";
import { useColorMode } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MyFatooraPayment() {
    const distpatch = useDispatch();
    const { colorMode } = useColorMode();
    const params = useRoute().params as {
        amount: number;
    };

    const [paymentMethods, setPaymentMethods] = useState<ICardListProps[]>([]);

    const { initiatePayments } = useMyFatoora();

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

    const insets = useSafeAreaInsets();

    return (
        <Scroller>
            <ImageBg type={colorMode} flexGrow={1}>
                <PaymentForm
                    amount={params?.amount}
                    paymentMethods={paymentMethods}
                />
            </ImageBg>
        </Scroller>
    );
}
