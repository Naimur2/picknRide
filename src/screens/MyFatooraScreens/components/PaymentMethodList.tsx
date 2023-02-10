import { KeyboardAvoidingView } from "native-base";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles, { BackdropStyles } from "../styles/styles.myfatoora";

function PaymentMethodsList({
    paymentMethods,
    setSelectedIndex,
    setIsDirectPayment,
    selectedIndex,
}: {
    paymentMethods: any[];
    setSelectedIndex: (index: number) => void;
    setIsDirectPayment: (isDirectPayment: boolean) => void;
    selectedIndex: number;
}) {
    return (
        <KeyboardAvoidingView px={4}>
            <View style={[styles.welcome]}>
                <FlatList
                    horizontal
                    data={paymentMethods}
                    style={styles.flatList}
                    contentContainerStyle={{ justifyContent: "center" }}
                    renderItem={({ item: rowData, index: row }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedIndex(row);
                                    if (rowData.IsDirectPayment) {
                                        setIsDirectPayment(true);
                                    } else {
                                        setIsDirectPayment(false);
                                    }
                                }}
                                style={{ padding: 10 }} // adjust the styles to suit your needs
                            >
                                <View style={styles.container}>
                                    {selectedIndex == row ? (
                                        <Image
                                            style={[
                                                BackdropStyles.image,
                                                {
                                                    borderColor: "black",
                                                    borderWidth: 3,
                                                    borderRadius: 5,
                                                },
                                            ]}
                                            source={{ uri: rowData.ImageUrl }}
                                        />
                                    ) : (
                                        <Image
                                            style={BackdropStyles.image}
                                            source={{ uri: rowData.ImageUrl }}
                                        />
                                    )}

                                    <Text style={styles.welcome}>
                                        {" "}
                                        {rowData.PaymentMethodEn}{" "}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

export default PaymentMethodsList;
