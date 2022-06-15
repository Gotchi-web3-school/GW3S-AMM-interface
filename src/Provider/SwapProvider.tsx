import { createContext, useReducer } from "react"
import { swapReducer } from "../Reducers/swapReducer";

const defaultContext = {
    tokenA: {
        id: 0,
        token: undefined,
        approve: {isApproved: undefined, isSearching: false},
        balance: {amount: undefined, isSearching: false},
        logo: "",
    },
    tokenB: {
        id: 1,
        token: undefined,
        approve: {isApproved: undefined, isSearching: false},
        balance: {amount: undefined, isSearching: false},
        logo: "",
    },
    input: undefined,
    output: undefined,
    pair: undefined,
    route: undefined,
    trade: undefined,
    isPool: undefined,
    dispatch: (state: {}, action: any) => {},
}

export const SwapContext = createContext(defaultContext);

export const SwapContextProvider = (props: any) => {
    //const {library, account} = useWeb3React()
    //const contract = useContext(ContractContext)
    const [swap, dispatch] = useReducer(swapReducer, defaultContext)
    const {tokenA, tokenB, pair, input, output, route, trade, isPool} = swap

    return (
        <SwapContext.Provider value={{
            tokenA,
            tokenB,
            input,
            output, 
            pair, 
            isPool, 
            route,
            trade,
            dispatch
        }}>
        {props.children}
        </SwapContext.Provider>)
}