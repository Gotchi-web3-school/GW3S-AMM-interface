import { createContext, useEffect, useState, useCallback } from "react"
import { useWeb3React } from "@web3-react/core";
import { Token, Pair, TokenAmount } from "quickswap-sdk"
import { SelectToken } from "../models";
import { fetchBalance, fetchApproved, isPoolCreated } from "../lib/utils";

export const AddLiquidityContext = createContext<{
    token0: Token | undefined,
    token0Logo: string | undefined,
    token0Balance: string | undefined,
    token0Amount: string,
    token1: Token | undefined, 
    token1Logo: string | undefined,
    token1Balance: string | undefined,
    token1Amount: string
    handleAmount: (idx: number, amount: string) => void,
    newToken: (idx: number, token: SelectToken, onClose: () => void) => void,
    pair: Pair | undefined,
    isPool: Boolean,
    isApproved: {token0: boolean, token1: boolean},
}>({
    token0: undefined,
    token0Logo: "",
    token0Balance: "",
    token0Amount: "",
    token1: undefined,
    token1Logo: "",
    token1Balance: "",
    token1Amount: "",
    handleAmount: (idx: number, amount: string) => {},
    newToken: (idx: number, token: SelectToken, onClose: () => void) => {},
    pair: undefined,
    isPool: false,
    isApproved: {token0: true, token1: true},
});

export const AddLiquidityContextProvider = (props: any) => {
    const {library, account} = useWeb3React()
    const [token0, setToken0] = useState<Token | undefined>()
    const [token0Logo, setToken0Logo] = useState<string | undefined>("")
    const [token0Balance, setToken0Balance] = useState<string | undefined>("")
    const [token0Amount, setToken0Amount] = useState<string>("")
    const [token1, setToken1] = useState<Token | undefined>()
    const [token1Logo, setToken1Logo] = useState<string | undefined>("")
    const [token1Balance, setToken1Balance] = useState<string | undefined>("")
    const [token1Amount, setToken1Amount] = useState<string>("")
    const [pair, setPair] = useState<Pair | undefined>()
    const [isPool, setIspool] = useState<Boolean>(false)
    const [isApproved, setIsApproved] = useState<{token0: boolean, token1: boolean}>({token0: true, token1: true})

    const newToken = useCallback((idx: number, token: SelectToken, onClose: () => void) => {
        console.log(token)
        const newToken = new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
        idx === 0 ? setToken0(newToken) : setToken1(newToken);
        idx === 0 ? setToken0Logo(token.logoURI) : setToken1Logo(token.logoURI);
        onClose();
    }, [])

    const handleAmount = useCallback((idx: number, amount: string) => {
        idx === 0 ? setToken0Amount(amount) : setToken1Amount(amount);
    }, [])
    // update token 0
    useEffect(() => {
        if (library && token0 && account)
        {
            fetchBalance(token0.address, account, library)
            .then(result => setToken0Balance(result))
            
        }
    }, [token0, account, library, token0Amount])
    
    // update token 1
    useEffect(() => {
        if (library && token1 && account)
        {
            fetchBalance(token1.address, account, library)
            .then(result => setToken1Balance(result))
        }
    }, [token1, account, library])
    
    // Fetch Datas
    useEffect(() => {
        if (token0 && token1 && token0Amount && token1Amount && pair === undefined)
        setPair(new Pair(new TokenAmount(token0, token0Amount), new TokenAmount(token1, token1Amount)));
        if (pair && token0 && token1 && account) {
            const amount: TokenAmount[] = [new TokenAmount(token0, token0Amount), new TokenAmount(token1, token1Amount)]
            fetchApproved(pair, amount, account, library).then(result => setIsApproved(result))
            isPoolCreated(pair, library).then(result => setIspool(result))
        }
    }, [pair, token0, token1, token0Amount, token1Amount, library, account])
    
    console.log(pair ? pair.liquidityToken : "")
    return (
    <AddLiquidityContext.Provider value={{token0, token0Logo, token0Balance, token0Amount, token1, token1Logo, token1Balance, token1Amount, newToken, handleAmount, pair, isPool, isApproved}}>
        {props.children}
    </AddLiquidityContext.Provider>)
}