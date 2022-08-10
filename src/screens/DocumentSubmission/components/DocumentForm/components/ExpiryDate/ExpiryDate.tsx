import { TouchableOpacity } from "react-native";
import React from "react";
import { FormControl, HStack, Text } from "native-base";
import { ChevronDownFill } from "../../../../../../components/Icons/Icons";
import DatePickerModal from "../../../../../../components/DatePickerModal/DatePickerModal";
import { getTextDate } from "../../../../../../helper/date.helper";
import PickerButton from "../PickerButton/PickerButton";

export default function ExpiryDate({
    onChange,
    ...rest
}: {
    onChange: (date: Date) => void;
}) {
    const [show, setShow] = React.useState(false);
    const [date, setDate] = React.useState(null);

    React.useEffect(() => {
        onChange?.(date);
    }, [date]);

    return (
        <FormControl mt="3" {...rest}>
            <PickerButton
                value={date ? getTextDate(date) : "Expiry"}
                onPress={() => setShow(true)}
                isActive={!!date}
            />

            <DatePickerModal
                isOpen={show}
                onClose={() => setShow(false)}
                setDate={(dt) => {
                    setDate(dt);
                    setShow(false);
                }}
            />
        </FormControl>
    );
}
