import { useWeb3React } from "@web3-react/core";
import React, { createContext, useEffect, useContext, useReducer } from "react"
import { addLiquidityReducer } from "../../Reducers/AMM/addLiquidityReducer";
import { AddLiquidity } from "../../Models";
import { fetchBalance, fetchApprovedtokens, isPoolCreated, fetchReserves } from "../../Lib/Utils";
import { ContractContext } from "../ContractProvider";
import { DEFAULT_FACTORY_ADDRESS, DEFAULT_INIT_CODE_HASH } from "../../Constants";

const defaultContext = {
    token0: undefined, token0Logo: undefined, token0Balance: undefined, token0Amount: undefined,
    token1: undefined, token1Logo: undefined, token1Balance: undefined, token1Amount: undefined,
    pair: undefined,
    isPool: false,
    reserves: undefined,
    isApproved: undefined,
    initCode: undefined,
    factoryAddess: undefined,
    dispatch: (state: {}, action: any) => {},
} 

export const AddLiquidityContext = createContext<AddLiquidity>(defaultContext);

export const AddLiquidityProvider: React.FC<{initCode?: string, factoryAddress?: string, children: React.ReactNode}> = ({
    initCode = DEFAULT_INIT_CODE_HASH,
    factoryAddress = DEFAULT_FACTORY_ADDRESS, 
    children
}) => {
    const {library, account} = useWeb3React()
    const contract = useContext(ContractContext)
    const [addLiquidity, dispatch] = useReducer(addLiquidityReducer, {...defaultContext, factoryAddress: factoryAddress, initCode: initCode})
    const {token0, token0Logo, token0Balance, token0Amount, token1, token1Logo, token1Balance, token1Amount, pair, isPool, reserves, isApproved} = addLiquidity

    // update token 0
    useEffect(() => {
        if (library && token0 && account)
        {
            fetchBalance(token0.address, account, library)
            .then(result => dispatch({type: "SET_TOKEN_BALANCE", payload: {id: 0, token: token0, amount: result}}))
        }
    }, [token0, account, library])
    
    // update token 1
    useEffect(() => {
        if (library && token1 && account)
        {
            fetchBalance(token1.address, account, library)
            .then(result => dispatch({type: "SET_TOKEN_BALANCE", payload: {id: 1, token: token1, amount: result}}))
        }
    }, [token1, account, library])
    
    // Set Pair and check if a pool is instanciated
    useEffect(() => {
        if (token0 && token1) {
            console.log("new pair")
            dispatch({type: "SET_PAIR"})
        }
    }, [token0, token1])

    // Check if pool is already created from token0 & token1 if yes fetch the reserves associated
    useEffect(() => {
        if (pair) {
            isPoolCreated(pair, factoryAddress, library).then(isPool => {
                if (isPool && token0) {
                    console.log("New pool found!")
                    dispatch({type: "SET_ISPOOL", payload: {isPool: true}})
                    fetchReserves(pair, token0, contract)
                    .then(reserves => dispatch({type: "SET_RESERVES", payload: {reserves: reserves}}))
                } else {
                    dispatch({type: "SET_ISPOOL", payload: {isPool: false}})
                }
            })
        }
    }, [pair, token0, library, contract, factoryAddress])
    
    // Check for approval
    useEffect(() => {
        if (pair && account && isApproved === undefined)
        fetchApprovedtokens(pair, account, library)
        .then(result => dispatch({type: "SET_APPROVED", payload: {isApproved: result}}))
    }, [pair, account, library, isApproved])

        
    return (
        <AddLiquidityContext.Provider value={{
            token0, token0Logo, token0Balance, token0Amount, 
            token1, token1Logo, token1Balance, token1Amount, 
            pair, 
            isPool, 
            isApproved, 
            reserves,
            factoryAddress,
            initCode,
            dispatch
        }}>
        {children}
        </AddLiquidityContext.Provider>)
}