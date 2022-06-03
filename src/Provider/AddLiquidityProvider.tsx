import { createContext, useEffect, useContext, useState, useCallback } from "react"
import { useWeb3React } from "@web3-react/core";
import { Token, Pair, TokenAmount, Fraction, JSBI } from "quickswap-sdk"
import { SelectToken } from "../models";
import { fetchBalance, fetchApproved, isPoolCreated, createPair, fetchReserves } from "../utils";
import { ethers } from "ethers"
import { ContractContext } from "./ContractsProvider";

export const AddLiquidityContext = createContext<{
    token0: Token | undefined,
    token0Logo: string | undefined,
    token0Balance: TokenAmount| undefined,
    token0Amount: {value: string, bigAmount: TokenAmount | undefined} | undefined,
    token1: Token | undefined, 
    token1Logo: string | undefined,
    token1Balance: TokenAmount| undefined,
    token1Amount: {value: string, bigAmount: TokenAmount | undefined} | undefined,
    handleInputAmount: (idx: number, amount: string) => void,
    newToken: (idx: number, token: SelectToken, onClose: () => void) => void,
    pair: Pair | undefined,
    isPool: Boolean,
    reserves: Fraction,
    isApproved: {token0: boolean, token1: boolean},
}>({
    token0: undefined,
    token0Logo: "",
    token0Balance: undefined,
    token0Amount: undefined,
    token1: undefined,
    token1Logo: "",
    token1Balance: undefined,
    token1Amount: undefined,
    handleInputAmount: (idx: number, amount: string) => {},
    newToken: (idx: number, token: SelectToken, onClose: () => void) => {},
    pair: undefined,
    isPool: false,
    reserves: new Fraction("0", "0"),
    isApproved: {token0: true, token1: true},
});

export const AddLiquidityContextProvider = (props: any) => {
    const {library, account} = useWeb3React()
    const contract = useContext(ContractContext)
    const [token0, setToken0] = useState<Token | undefined>()
    const [token0Logo, setToken0Logo] = useState<string | undefined>("")
    const [token0Balance, setToken0Balance] = useState<TokenAmount | undefined>()
    const [token0Amount, setToken0Amount] = useState<{value: string, bigAmount: TokenAmount | undefined} | undefined>()
    const [token1, setToken1] = useState<Token | undefined>()
    const [token1Logo, setToken1Logo] = useState<string | undefined>("")
    const [token1Balance, setToken1Balance] = useState<TokenAmount | undefined>()
    const [token1Amount, setToken1Amount] = useState<{value: string, bigAmount: TokenAmount | undefined} | undefined>()
    const [pair, setPair] = useState<Pair | undefined>()
    const [isPool, setIspool] = useState<Boolean>(false)
    const [reserves, setReserves] = useState<Fraction>(new Fraction("0", "0"))
    const [isApproved, setIsApproved] = useState<{token0: boolean, token1: boolean}>({token0: true, token1: true})

    const newToken = useCallback((idx: number, token: SelectToken, onClose: () => void) => {
        const newToken = new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
        idx === 0 ? setToken0(newToken) : setToken1(newToken);
        idx === 0 ? setToken0Logo(token.logoURI) : setToken1Logo(token.logoURI);
        onClose();
    }, [])

    const handleInputAmount = useCallback((idx: number, inputAmount: string) => {
        if (isPool && token1 && token0 && inputAmount > "0") {
            const amount = new TokenAmount(idx ? token1 : token0, JSBI.BigInt(ethers.utils.parseEther(inputAmount)))
            if (idx) {
                const pairedAmount = new TokenAmount(token0, amount.multiply(reserves.numerator).divide(reserves.denominator).quotient)
                const pairedInputAmount = amount.multiply(reserves.numerator).divide(reserves.denominator).toSignificant(3)
                console.log(pairedInputAmount)
                setToken1Amount({value: inputAmount, bigAmount: amount})
                setToken0Amount({value: pairedInputAmount, bigAmount: pairedAmount})
            } else {
                const pairedAmount = new TokenAmount(token0, amount.multiply(reserves.denominator).divide(reserves.numerator).quotient)
                const pairedInputAmount = amount.multiply(reserves.denominator).divide(reserves.numerator).toSignificant(3)
                console.log(pairedInputAmount)
                setToken0Amount({value: inputAmount, bigAmount: amount})
                setToken1Amount({value: pairedInputAmount, bigAmount: pairedAmount})
            }
        } else {
            setToken0Amount({value: inputAmount, bigAmount: undefined})
            setToken1Amount({value: inputAmount, bigAmount: undefined});
        }
    }, [isPool, reserves, token0, token1])

    // update token 0
    useEffect(() => {
        if (library && token0 && account)
        {
            fetchBalance(token0.address, account, library)
            .then(result => setToken0Balance(new TokenAmount(token0, ethers.utils.parseEther(result).toString())))
        }
    }, [token0, account, library])
    
    // update token 1
    useEffect(() => {
        if (library && token1 && account)
        {
            fetchBalance(token1.address, account, library)
            .then(result => setToken1Balance(new TokenAmount(token1, ethers.utils.parseEther(result).toString())))
        }
    }, [token1, account, library])
    
    // Set Pair and check if a pool is instanciated
    useEffect(() => {
        if (token0 && token1) {
            const identifier = setTimeout(() => {
                createPair(token0, token1).then(result => {
                    setPair(result)
                    result && isPoolCreated(result, library).then(result => setIspool(result))
                })
            }, 500)

            return () => clearTimeout(identifier)
        }
    }, [token0, token1, library])
    
    // Check for approval
    useEffect(() => {
        if (pair && account && token0 && token1)
            fetchApproved(pair, account, library).then(result => setIsApproved(result))
    }, [pair, account, library, token0, token1])
    
    // If pool is already created
    useEffect(() => {
        if (isPool && contract.factory && contract.pair && pair)
            fetchReserves(pair, contract.factory, contract.pair).then(result => setReserves(result ?? new Fraction("0", "0")))
    }, [pair, isPool, contract])

        
    return (
        <AddLiquidityContext.Provider value={{token0, token0Logo, token0Balance, token0Amount, token1, token1Logo, token1Balance, token1Amount, newToken, handleInputAmount, pair, isPool, isApproved, reserves}}>
        {props.children}
        </AddLiquidityContext.Provider>)
}