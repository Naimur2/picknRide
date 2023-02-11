import Scroller from "@components/Scroller/Scroller";
import { setLoading } from "@store/features/ui/uiSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useMyFatoora from "./mfhooks/useMyFatoora";
import { ICardListProps } from "./types/myfatoora.interface";
import PaymentForm from "./PaymentForm";
import ImageBg from "@components/ImageBg/ImageBg";
import { useColorMode } from "native-base";

export default function MyFatooraPayment() {
    const distpatch = useDispatch();
    const { colorMode } = useColorMode();

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

    return (
        <Scroller>
            <ImageBg type={colorMode} flexGrow={1}>
                <PaymentForm paymentMethods={paymentMethods} />
            </ImageBg>
        </Scroller>
    );
}
