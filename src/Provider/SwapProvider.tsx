import { createContext, useReducer, useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import { swapReducer } from "../Reducers/swapReducer";
import { ISwap, SwapProvider } from "../Models/swap";
//import { ContractContext } from "./ContractsProvider";
import { fetchBalance } from "../lib/utils";
import { Fetcher } from "quickswap-sdk";
import { FACTORY_ADDRESS, INIT_CODE_HASH} from "../Constants";

const defaultSwap: ISwap = {
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
}

const defaultContext = {
    ...defaultSwap,
    dispatch: (state: {}, action: any) => {},
}

export const SwapContext = createContext<SwapProvider>(defaultContext);

export const SwapContextProvider = (props: any) => {
    const {library, account} = useWeb3React()
    //const contract = useContext(ContractContext)
    const [swap, dispatch] = useReducer(swapReducer, defaultSwap)
    const {tokenA, tokenB, pair, input, output, route, trade, isPool} = swap

    console.log(pair)

     // STEP 1: update token A
     useEffect(() => {
        if (tokenA.token && account)
        {
            fetchBalance(tokenA.token.address, account, library)
            .then(result => dispatch({type: "SET_TOKEN_BALANCE", payload: {id: 0, amount: result}}))
        }
    }, [tokenA.token, account, library])
    
    // STEP 1: update token B
    useEffect(() => {
        if (tokenB.token && account)
        {
            fetchBalance(tokenB.token.address, account, library)
            .then(result => dispatch({type: "SET_TOKEN_BALANCE", payload: {id: 1, amount: result}}))
        }
    }, [tokenB.token, account, library])

    // STEP 2: Set Pair & set route for the trade
    useEffect(() => {
        if (tokenA.token && tokenB.token) {
            console.log("new pair")
            Fetcher.fetchPairData(tokenA.token, tokenB.token, FACTORY_ADDRESS, INIT_CODE_HASH, library)
            .then(result => dispatch({type: "SET_PAIR", payload: result}))
        }
    }, [tokenA.token, tokenB.token, library])

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