import { fontSizes } from "@theme/typography";
import { HStack, Image, Pressable, Text, VStack } from "native-base";
import { ICardListProps, ICardProps } from "../types/myfatoora.interface";
import { Platform } from "react-native";

const Cards = ({
    selectedIndex,
    setSelectedIndex,
    isDirectPayment,
    setIsDirectPayment,
    imageUrl,
    paymentMethodEn,
    row,
}: ICardProps) => {
    const isSelected = selectedIndex === row;

    return (
        <Pressable
            onPress={() => {
                setSelectedIndex?.(row);
                if (isDirectPayment) {
                    setIsDirectPayment?.(true);
                } else {
                    setIsDirectPayment?.(false);
                }
            }}
            borderColor={isSelected ? "#000" : "#f0000020"}
            borderWidth={1}
            backgroundColor={"coolGray.200"}
            borderRadius={10}
            bg={isSelected ? "blueGray.100" : "#fff"}
            _dark={{
                bg: isSelected ? "gray.200" : "gray.400",
                borderColor: isSelected ? "gray.200" : "gray.400",
            }}
            _pressed={{ bg: "#F5F5F5" }}
            p={2}
            w={"full"}
        >
            <HStack alignItems={"center"} space="4">
                <Image
                    h={"70px"}
                    w={"80px"}
                    resizeMode="contain"
                    source={{ uri: imageUrl }}
                    alt={paymentMethodEn}
                    mx={1}
                />

                <Text
                    fontWeight={500}
                    fontSize={fontSizes.sm}
                    _dark={{ color: "#fff" }}
                    maxW={40}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                >
                    {" "}
                    {paymentMethodEn}{" "}
                </Text>
            </HStack>
        </Pressable>
    );
};

function PaymentMethodsList({
    paymentMethods,
    setSelectedIndex,
    setIsDirectPayment,
    selectedIndex,
    setPaymentMethodId,
}: {
    paymentMethods: ICardListProps[];
    setSelectedIndex: (index: number) => void;
    setIsDirectPayment: (isDirectPayment: boolean) => void;
    selectedIndex: number;
    setPaymentMethodId: (paymentMethodId: string) => void;
}) {
    const paymentMethodsWithIndex = paymentMethods.map((item, index) => {
        return {
            ...item,
            index,
        };
    });

    const applePaumentMethods = [11, 25];

    const payMentMethodsWithDirectPayment = paymentMethodsWithIndex.filter(
        (item) => item.IsDirectPayment
    );

    const applePayMethods = paymentMethodsWithIndex.filter((item) =>
        applePaumentMethods.includes(item.PaymentMethodId)
    );

    const directpaymentsWithApplePay = [
        ...payMentMethodsWithDirectPayment,
        ...applePayMethods,
    ];

    const paymentmethodsToShow =
        Platform.OS === "ios"
            ? directpaymentsWithApplePay
            : payMentMethodsWithDirectPayment;

    return (
        <VStack space="2">
            {paymentmethodsToShow.map((item, index) => {
                return (
                    <Cards
                        selectedIndex={selectedIndex}
                        setSelectedIndex={(val) => {
                            setSelectedIndex(val);
                            setPaymentMethodId(item.PaymentMethodId);
                        }}
                        isDirectPayment={item.IsDirectPayment}
                        setIsDirectPayment={setIsDirectPayment}
                        imageUrl={item.ImageUrl}
                        paymentMethodEn={item.PaymentMethodEn}
                        row={item?.index}
                        key={index.toString() + "card"}
                    />
                );
            })}
        </VStack>
    );
}

export default PaymentMethodsList;
