import { Pair, Route, Token, TokenAmount, Trade } from "quickswap-sdk"

type TokenSwap = {
    id: number
    token: Token | undefined
    approve: {isApproved: boolean | undefined, isSearching: boolean}
    balance: {amount: TokenAmount | undefined, isSearching: boolean}
    logo: string
}

export interface ISwap {
    tokenA: TokenSwap
    tokenB: TokenSwap
    input: TokenAmount | undefined
    output: TokenAmount | undefined
    pair: Pair | undefined
    route: Route | undefined
    trade: Trade | undefined
    isPool: boolean | undefined
}

export class Swap implements ISwap {
    tokenA: TokenSwap
    tokenB: TokenSwap
    input: TokenAmount | undefined = undefined
    output: TokenAmount | undefined = undefined
    pair: Pair | undefined
    route: Route | undefined
    trade: Trade | undefined
    isPool: boolean | undefined = undefined


    constructor( tokenA?: Token, tokenB?: Token, pair?: Pair, logoURI?: {tokenA?: string, tokenB?: string}) {
        this.tokenA = {
            id: 0,
            token: tokenA,
            approve: {isApproved: undefined, isSearching: false},
            balance: {amount: tokenA ? new TokenAmount(tokenA, "0") : undefined, isSearching: false},
            logo: logoURI?.tokenA ?? "",
        }
        this.tokenB = {
            id: 1,
            token: tokenB,
            approve: {isApproved: undefined, isSearching: false},
            balance: {amount: tokenB ? new TokenAmount(tokenB, "0") : undefined, isSearching: false},
            logo: logoURI?.tokenB ?? "",
        }
        this.pair = pair
    }
}