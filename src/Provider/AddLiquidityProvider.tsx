import { createContext, useEffect, useState, useCallback } from "react"
import { useWeb3React } from "@web3-react/core";
import { Token, Pair} from "quickswap-sdk"
import { SelectToken } from "../models";
import { defaultPair, defaultToken } from "../constants";
import { fetchBalance } from "../lib/utils";


export const AddLiquidityContext = createContext<{
    token0: Token | undefined,
    token0Logo: string | undefined,
    token0Balance: string | undefined,
    token1: Token | undefined, 
    token1Logo: string | undefined,
    token1Balance: string | undefined,
    newToken: (idx: number, token: SelectToken, onClose: () => void) => void,
    pair: Pair | undefined,
}>({
    token0: defaultToken,
    token0Logo: "",
    token0Balance: "",
    token1: defaultToken,
    token1Logo: "",
    token1Balance: "",
    newToken: (idx: number, token: SelectToken, onClose: () => void) => {},
    pair: defaultPair
});

export const AddLiquidityContextProvider = (props: any) => {
    const {library, account} = useWeb3React()
    const [token0, setToken0] = useState<Token | undefined>()
    const [token0Logo, setToken0Logo] = useState<string | undefined>("")
    const [token0Balance, setToken0Balance] = useState<string | undefined>("")
    const [token1, setToken1] = useState<Token | undefined>()
    const [token1Logo, setToken1Logo] = useState<string | undefined>("")
    const [token1Balance, setToken1Balance] = useState<string | undefined>("")
    const [pair] = useState<Pair | undefined>()

    const newToken = useCallback((idx: number, token: SelectToken, onClose: () => void) => {
        console.log(token)
        const newToken = new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
        idx === 0 ? setToken0(newToken) : setToken1(newToken);
        idx === 0 ? setToken0Logo(token.logoURI) : setToken1Logo(token.logoURI);
        onClose();
    }, [])

    useEffect(() => {
        if (library && token0 && account)
        {
            fetchBalance(token0.address, account, library)
            .then(result => setToken0Balance(result))
        }
    }, [token0, account, library])

    useEffect(() => {
        if (library && token1 && account)
        {
            fetchBalance(token1.address, account, library)
            .then(result => setToken1Balance(result))
        }
    }, [token1, account, library])

    return (
    <AddLiquidityContext.Provider value={{token0, token0Logo, token0Balance, token1, token1Logo, token1Balance, newToken, pair}}>
        {props.children}
    </AddLiquidityContext.Provider>)
}