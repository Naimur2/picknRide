import { Factory } from "native-base";
import * as React from "react";
import { forwardRef, memo, Ref } from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

const SvgComponent = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.style.width || 42.037}
        height={props.style.height || 45.917}
        ref={ref}
        {...props}
    >
        <G data-name="Group 9761" fill={props?.style?.color || "#d0d0d0"}>
            <Path
                data-name="Path 22926"
                d="M16.593 37.025H7.722a2.281 2.281 0 0 1-2.278-2.278v-2.494a2.692 2.692 0 0 0 .612.072 2.738 2.738 0 0 0 .742-.1v2.525a.925.925 0 0 0 .924.924h8.693a.677.677 0 0 0 0-1.354H8.152v-2.982l.014-.016a2.715 2.715 0 0 0-.218-3.655 2.708 2.708 0 0 0 .932-4.482 2.71 2.71 0 0 0 .754-4.641l-1.482-1.2V4.062h3l.019.061a1.7 1.7 0 0 0 1.621 1.192h5.232a1.7 1.7 0 0 0 1.624-1.188l.02-.061h2.69v9.394a.677.677 0 1 0 1.354 0V3.632a.925.925 0 0 0-.924-.924h-3.3a1.1 1.1 0 0 0-1.053.77l-.075.235a.348.348 0 0 1-.333.244h-5.235a.348.348 0 0 1-.333-.244l-.075-.235a1.1 1.1 0 0 0-1.053-.77h-3.61a.925.925 0 0 0-.924.924v12.613a2.688 2.688 0 0 0-1.354-.524v-6.89a.677.677 0 0 0-1.353-.007 2.712 2.712 0 0 0-3.088 4.44l3.088 2.508v.165a2.711 2.711 0 0 0-.8 4.428 2.712 2.712 0 0 0-.929 4.484 2.709 2.709 0 0 0-.755 4.64l2.484 2.016v3.242a3.636 3.636 0 0 0 3.632 3.632h8.871a.677.677 0 0 0 0-1.354ZM1.855 12.215a1.36 1.36 0 1 1 1.715-2.109l.523.425v3.5Zm2.271 5.352a1.357 1.357 0 0 1 1.91-.2l2.744 2.228a1.357 1.357 0 1 1-1.71 2.108l-2.746-2.228a1.357 1.357 0 0 1-.2-1.909Zm-.932 4.482a1.355 1.355 0 0 1 1.874-.224l1.147.931.04.03 1.593 1.294a1.357 1.357 0 1 1-1.712 2.107l-2.744-2.228a1.359 1.359 0 0 1-.2-1.909ZM1.97 27.525a1.356 1.356 0 0 1 2.165-1.224l1.152.936.041.03 1.593 1.293a1.357 1.357 0 1 1-1.711 2.107l-2.744-2.228a1.348 1.348 0 0 1-.496-.914Z"
            />
            <Path
                data-name="Path 22927"
                d="M4.767 6.624a.677.677 0 0 0 .677-.677V3.632a2.281 2.281 0 0 1 2.278-2.278h15.065a2.28 2.28 0 0 1 2.278 2.278v12.491a.677.677 0 1 0 1.354 0V3.632A3.636 3.636 0 0 0 22.787 0H7.722A3.636 3.636 0 0 0 4.09 3.632v2.315a.677.677 0 0 0 .677.677Z"
            />
            <Path
                data-name="Path 22928"
                d="m41.876 44.802-4.618-5.433a.677.677 0 0 0-1.031.877l4.618 5.433a.677.677 0 1 0 1.031-.877Z"
            />
            <Path
                data-name="Path 22929"
                d="M25.3 42.92a.676.676 0 0 0-.429-.256 5.807 5.807 0 0 1-4.736-4.54l-.249-1.215a5.774 5.774 0 0 1 .64-4.022l3.349-5.875a2.154 2.154 0 0 0-.173-2.4l-3.136-4.023a3.128 3.128 0 0 1 .109-3.972l.168-.192a.351.351 0 0 1 .26-.121.346.346 0 0 1 .264.111l2.993 3.175a.677.677 0 0 0 .985-.929l-2.993-3.175a1.707 1.707 0 0 0-2.529.049l-.168.192a4.484 4.484 0 0 0-.157 5.695l3.136 4.023a.805.805 0 0 1 .065.9L19.35 32.22a7.126 7.126 0 0 0-.79 4.965l.249 1.215a7.17 7.17 0 0 0 5.576 5.555l1.3 1.7a.677.677 0 0 0 1.074-.824Z"
            />
            <Path
                data-name="Path 22930"
                d="M33.636 35.109a.958.958 0 0 1-.228-.62v-3.485a9.5 9.5 0 0 0-2.6-6.541l-3.489-3.7a.677.677 0 1 0-.985.929l3.489 3.7a8.152 8.152 0 0 1 2.228 5.612v3.485a2.314 2.314 0 0 0 .55 1.5l1.747 2.055a.677.677 0 1 0 1.032-.877Z"
            />
            <Path
                data-name="Path 22931"
                d="M15.408 7.376a3.148 3.148 0 1 0 1.473 5.93l1.043 1.04a.677.677 0 0 0 .957-.957l-.962-.962a3.147 3.147 0 0 0-2.507-5.05Zm-1.795 3.149a1.795 1.795 0 1 1 1.795 1.795 1.8 1.8 0 0 1-1.794-1.795Z"
            />
            <Path
                data-name="Path 22932"
                d="M17.156 30.473h-5.294a.2.2 0 0 1-.2-.2v-2.9a.2.2 0 0 1 .2-.2h6.8a.677.677 0 0 0 0-1.354h-6.8a1.554 1.554 0 0 0-1.552 1.552v2.9a1.554 1.554 0 0 0 1.552 1.552h5.294a.677.677 0 0 0 0-1.354Z"
            />
        </G>
    </Svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);
const MobileAppComp = Factory(Memo);

export default class MobileApp extends React.Component<SvgProps> {
    render() {
        return <MobileAppComp {...this.props} />;
    }
}
