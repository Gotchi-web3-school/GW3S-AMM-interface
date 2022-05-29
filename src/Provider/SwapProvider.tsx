import React, { createContext, useReducer } from "react"
import { Trade} from "quickswap-sdk"
//import { defaultTrade } from "../constants";

/*
const SwapContext = createContext<Trade>(defaultTrade);

const SwapContextProvider: React.FC = (props) => {
    const [userState, dispatch] = useReducer(userReducer, defaultTrade)
    return (
        <SwapContext.Provider value={defaultTrade}>
            {props.children}
        </SwapContext.Provider>
    )
}
*/