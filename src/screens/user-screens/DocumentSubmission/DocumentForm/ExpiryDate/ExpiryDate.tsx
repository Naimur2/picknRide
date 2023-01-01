import DatePickerModal from "@components/DatePickerModal/DatePickerModal";
import { getTextDate } from "@utils/date.helper";
import { FormControl } from "native-base";
import React from "react";
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
