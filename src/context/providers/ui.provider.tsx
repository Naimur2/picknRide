import React from "react";
import { UIContext } from "../contexts";

const defaultState = {
    backButtonColor: "#000",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_BACK_BTN_COLOR":
            return {
                ...state,
                backButtonColor: action.payload,
            };
        case "CLEAR":
            return {
                ...defaultState,
            };
        default:
            return state;
    }
};

export default function UIProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, defaultState);

    const value = React.useMemo(() => {
        const setBackButtonColor = (color) => {
            dispatch({
                type: "SET_BACK_BTN_COLOR",
                payload: color,
            });
        };

        return {
            backButtonColor: state.backButtonColor,
            setBackButtonColor,
        };
    }, [state]);

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
