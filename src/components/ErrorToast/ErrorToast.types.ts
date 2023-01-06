import * as React from "react";
import { HStack } from "native-base";

export type HStackProps = React.ComponentProps<typeof HStack>;

export interface IErrorToastProps extends HStackProps {
    message: string;
}
