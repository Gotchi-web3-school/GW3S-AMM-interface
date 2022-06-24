import { Pair, Route, Token, TokenAmount, Trade } from "gotchiw3s-sdk"

export type TokenSwap = {
    id: number
    token: Token | undefined
    approve: {isApproved: boolean | undefined, loading: boolean}
    balance: {amount: TokenAmount | undefined, isSearching: boolean}
    logo: string
}

export interface ISwap {
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
}

export class Swap implements ISwap {
    tokenA: TokenSwap
    tokenB: TokenSwap
    input: {amount: TokenAmount | undefined, input: string | undefined} = {amount: undefined, input: undefined}
    output: {amount: TokenAmount | undefined, input: string | undefined} = {amount: undefined, input: undefined}
    pair: Pair | undefined
    route: Route | undefined
    trade: Trade | undefined
    isPool: boolean | undefined = undefined
    error: boolean = false
    loading: boolean = false

    constructor( tokenA?: Token, tokenB?: Token, pair?: Pair, logoURI?: {tokenA?: string, tokenB?: string}) {
        this.tokenA = {
            id: 0,
            token: tokenA,
            approve: {isApproved: undefined, loading: true},
            balance: {amount: tokenA ? new TokenAmount(tokenA, "0") : undefined, isSearching: false},
            logo: logoURI?.tokenA ?? "",
        }
        this.tokenB = {
            id: 1,
            token: tokenB,
            approve: {isApproved: undefined, loading: true},
            balance: {amount: tokenB ? new TokenAmount(tokenB, "0") : undefined, isSearching: false},
            logo: logoURI?.tokenB ?? "",
        }
        this.pair = pair
    }
}
