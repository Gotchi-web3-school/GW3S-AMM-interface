import { createContext, useReducer, useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import { Fetcher } from "quickswap-sdk";
import { swapReducer } from "../Reducers/swapReducer";
import { ISwap, SwapProvider } from "../Models/swap";
//import { ContractContext } from "./ContractsProvider";
import { fetchApprovedtokens, fetchBalance } from "../lib/utils";
import { FACTORY_ADDRESS, INIT_CODE_HASH} from "../Constants";

const defaultSwap: ISwap = {
    tokenA: {
        id: 0,
        token: undefined,
        approve: {isApproved: undefined, loading: false},
        balance: {amount: undefined, isSearching: false},
        logo: "",
    },
    tokenB: {
        id: 1,
        token: undefined,
        approve: {isApproved: undefined, loading: false},
        balance: {amount: undefined, isSearching: false},
        logo: "",
    },
    input: {amount: undefined, input: undefined},
    output: {amount: undefined, input: undefined},
    pair: undefined,
    route: undefined,
    trade: undefined,
    isPool: undefined,
    error: false,
    loading: false,
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
    const {tokenA, tokenB, pair, input, output, route, trade, isPool, error, loading} = swap

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

    // STEP 2: Set Pair & set (single) Route for the trade
    useEffect(() => {
        if (tokenA.token && tokenB.token) {
            console.log("new pair")
            Fetcher.fetchPairData(tokenA.token, tokenB.token, FACTORY_ADDRESS, INIT_CODE_HASH, library)
            .then(result => dispatch({type: "SET_PAIR", payload: result}))
            .catch(error =>{console.log(error); dispatch({type: "FAILURE", payload: error})})
        }
    }, [tokenA.token, tokenB.token, library, account])

    // STEP3: Set Trade
    useEffect(() => {
        if (input.input !== undefined && output.input !== undefined && pair && route) {
            dispatch({type: "SEARCH_APPROVE"})
            fetchApprovedtokens(pair, account!, library).then(result => dispatch({type: "APPROVED", payload: result}))
            dispatch({type: "SET_TRADE"})
        }
    }, [input.input, output.input, pair, route, account, library])

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
            error,
            loading,
            dispatch
        }}>
        {props.children}
        </SwapContext.Provider>)
}