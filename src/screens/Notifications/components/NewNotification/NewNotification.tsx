import NotificationsCard, {
    INotificationsCard,
} from "../NotificationsCard/NotificationsCard";
import { VStack } from "native-base";
import H3 from "../H3/H3";
import moment from "moment";

export interface INotification {
    title: string | Date;
    data: INotificationsCard[];
}

const NewNotification = (props: INotification) => {
    return (
        <VStack>
            <H3>
                {props?.title ? moment(props?.title).format("MMM Do YY") : ""}
            </H3>
            <VStack space={4}>
                {props?.data?.map((item, index) => (
                    <NotificationsCard
                        key={
                            item?.title +
                            item?.data?.length.toString() +
                            index.toString()
                        }
                        user={item?.user}
                        description={item?.description}
                        dateTime={
                            item?.dateTime
                                ? moment(item?.dateTime).fromNow()
                                : ""
                        }
                    />
                ))}
            </VStack>
        </VStack>
    );
};

export default NewNotification;
