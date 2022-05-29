import React, { createContext, useState } from "react"
import { Token, ChainId, Pair, TokenAmount} from "quickswap-sdk"
import { defaultPair, defaultToken } from "../constants";
import { SelectToken } from "../models";



export const AddLiquidityContext = createContext<{
    token0: Token,
    token0Logo: string,
    token1: Token, 
    token1Logo: string,
    newToken: (idx: number, token: SelectToken, onClose: () => void) => void,
    pair: Pair,
}>({
    token0: defaultToken,
    token0Logo: "",
    token1: defaultToken,
    token1Logo: "",
    newToken: (idx: number, token: SelectToken, onClose: () => void) => {},
    pair: defaultPair
});

export const AddLiquidityContextProvider = (props: any) => {
    const [token0, setToken0] = useState<Token>(new Token(ChainId.MUMBAI, '0xc0FFee0000000000000000000000000000000000', 18, 'HOT', 'Caffeine'))
    const [token0Logo, setToken0Logo] = useState("")
    const [token1, setToken1] = useState<Token>(new Token(ChainId.MUMBAI, '0xDeCAf00000000000000000000000000000000000', 18, 'NOT', 'Caffeine'))
    const [token1Logo, setToken1Logo] = useState("")
    const [pair] = useState<Pair>(new Pair(new TokenAmount(token0, '2000000000000000000'), new TokenAmount(token1, '1000000000000000000')))

    const newToken = (idx: number, token: SelectToken, onClose: () => void) => {
        console.log(token)
        const newToken = new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
        idx === 0 ? setToken0(newToken) : setToken1(newToken);
        idx === 0 ? setToken0Logo(token.logoURI) : setToken1Logo(token.logoURI);
        onClose();
    }

    return (
    <AddLiquidityContext.Provider value={{token0, token0Logo, token1, token1Logo, newToken, pair}}>
        {props.children}
    </AddLiquidityContext.Provider>)
}