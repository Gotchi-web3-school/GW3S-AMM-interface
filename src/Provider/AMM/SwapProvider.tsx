import { createContext, useReducer, useEffect, useContext } from "react"
import { useWeb3React } from "@web3-react/core";
import { Fetcher, TokenAmount, Pair, Route, Trade } from "gotchiw3s-sdk";
import { TokenSwap } from "../../Models/swap";
import { swapReducer } from "../../Reducers/AMM/swapReducer";
import { ISwap } from "../../Models/swap";
import { fetchApproveToken, fetchBalance, isPoolCreated } from "../../Lib/Utils";
import { DEFAULT_FACTORY_ADDRESS, DEFAULT_INIT_CODE_HASH} from "../../Constants";
import { DEFAULT_TOKEN_LIST } from "../../Constants/list";
import { ContractContext } from "../ContractProvider";
import { TokenList } from "../../Constants/list";

export type SwapContextType = {
    tokenA: TokenSwap
    tokenB: TokenSwap
    input: {amount: TokenAmount | undefined, input: string | undefined}
    output: {amount: TokenAmount | undefined, input: string | undefined}
    pair: Pair | undefined
    route: Route | undefined
    trade: Trade | undefined
    isPool: boolean | undefined
    error: boolean
    loading: boolean
    defaultTokenList: TokenList[]
    dispatch: (action: any, state?: Object,) => void,
}

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
    defaultTokenList: [],
    dispatch: (state: {}, action: any) => {},
}

export const SwapContext = createContext<SwapContextType>(defaultContext);

export const SwapProvider: React.FC<{initCode?: string, factoryAddress?: string, defaultTokenList?: TokenList[], children: React.ReactNode}> = ({
    initCode=DEFAULT_INIT_CODE_HASH, 
    factoryAddress=DEFAULT_FACTORY_ADDRESS,
    defaultTokenList=DEFAULT_TOKEN_LIST,
    children
}) => {
    const {library, account} = useWeb3React()
    const contract = useContext(ContractContext)
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
            const tokenAmountA = new TokenAmount(tokenA.token, "0")
            const tokenAmountB = new TokenAmount(tokenB.token, "0")
            isPoolCreated(new Pair(tokenAmountA, tokenAmountB, factoryAddress, initCode), library).then(result => console.log(result))
            Fetcher.fetchPairData(tokenA.token, tokenB.token, factoryAddress, initCode, library)
            .then(result => {console.log(result); dispatch({type: "SET_PAIR", payload: result})})
            .catch(error => {
                const tokenAmountA = new TokenAmount(tokenA.token!, "0")
                const tokenAmountB = new TokenAmount(tokenB.token!, "0")
                const pair = new Pair(tokenAmountA, tokenAmountB, factoryAddress, initCode)
                isPoolCreated(pair, library).then(result => {
                    if (result.result)
                        dispatch({type: "SET_PAIR", payload: pair})
                    else
                    dispatch({type: "SET_PAIR_FAILURE", payload: error})
                })
            })
        }
    }, [tokenA.token, tokenB.token, library, account, contract, factoryAddress, initCode])

    // STEP3: Set Trade
    useEffect(() => {
        if (input.input !== undefined && output.input !== undefined && pair && route) {
            dispatch({type: "SEARCH_APPROVE"})
            fetchApproveToken(tokenA.token!, input.amount!, account!, library)
            .then(result => dispatch({type: "APPROVED", payload: result}))
            .catch(() => dispatch({type: "APPROVED", payload: false}))
            dispatch({type: "SET_TRADE"})
        }
    }, [input, output.input, pair, tokenA.token, route, account, library])

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
            defaultTokenList,
            dispatch
        }}>
        {children}
        </SwapContext.Provider>)
}