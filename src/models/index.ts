import { Token, TokenAmount, Pair, Fraction, Percent, JSBI } from "quickswap-sdk";
import { ethers } from "ethers";

export type SelectToken = {
    name: string | undefined;
    address: string;
    symbol: string | undefined;
    decimals: number;
    chainId: number;
    logoURI?: string | undefined;
    isSearched?: boolean;
}

export type Contract = {
    factory: ethers.Contract | undefined,
    router2: ethers.Contract | undefined, 
    pair: ethers.Contract | undefined, 
    ERC20: ethers.Contract | undefined,
}

export interface IPool {
    name: string;
    pair: Pair;
    logoURI?: {tokenA?: string, tokenB?: string};
    balance: string
    share: Percent
    isApproved?: boolean
    totalReserves?: Fraction
    isPool?: boolean
    tokenA: {
        isApproved: boolean, 
        pooled: string, 
        input: TokenAmount, 
        balance: TokenAmount,
        logo?: string
    }
    tokenB: {
        isApproved: boolean, 
        pooled: string, 
        input: TokenAmount, 
        balance: TokenAmount
        logo?: string
    }
}

export class Pool implements IPool {
    name: string;
    pair: Pair;
    balance: string = "0"
    share: Percent = new Percent("0", "100")
    isApproved = false
    totalReserves: Fraction = new Fraction("1", "1")
    isPool = false
    tokenA: {
        isApproved: boolean, 
        pooled: string, 
        input: TokenAmount, 
        balance: TokenAmount,
        logo?: string
    }
    tokenB: {
        isApproved: boolean, 
        pooled: string, 
        input: TokenAmount, 
        balance: TokenAmount
        logo?: string
    }

    constructor(name: string, pair: Pair,  logoURI?: {tokenA?: string, tokenB?: string}) {
        this.name = name;
        this.pair = pair;
        this.tokenA = {
            isApproved: false, 
            pooled: "0", 
            input: new TokenAmount(pair.token0, JSBI.BigInt("0")), 
            balance: new TokenAmount(pair.token0, JSBI.BigInt("0")),
            logo: logoURI?.tokenA,
        }
        this.tokenB = {
            isApproved: false, 
            pooled: "0", 
            input: new TokenAmount(pair.token1, JSBI.BigInt("0")), 
            balance: new TokenAmount(pair.token1, JSBI.BigInt("0")),
            logo: logoURI?.tokenB,
        }
    }
}

export type PoolProvider = {
    tokenA: Token | undefined,
    tokenALogo: string | undefined,
    tokenB: Token | undefined,
    tokenBLogo: string | undefined,
    pools: Pool[],
    pool?: IPool,
    dispatch: (action: any, state?: Object,) => void,
}

export type AddLiquidity = {
    token0: Token | undefined,
    token0Logo: string | undefined,
    token0Balance: TokenAmount| undefined,
    token0Amount: TokenAmount | undefined,
    token1: Token | undefined, 
    token1Logo: string | undefined,
    token1Balance: TokenAmount| undefined,
    token1Amount: TokenAmount| undefined,
    pair: Pair | undefined,
    isPool: Boolean,
    isApproved: {token0: boolean, token1: boolean} | undefined,
    reserves: Fraction,
    dispatch: (action: any, state?: Object,) => void,
}

export type AddLiquidityTx = {
    router2: ethers.Contract,
    pair: Pair,
    amount0: TokenAmount,
    amount1: TokenAmount,
    userAddress: string,
}

export type RemoveLiquidityProvider = {
    token0: Token | undefined,
    token0Logo: string | undefined,
    token0Balance: TokenAmount| undefined,
    token0Amount: TokenAmount | undefined,
    token1: Token | undefined, 
    token1Logo: string | undefined,
    token1Balance: TokenAmount| undefined,
    token1Amount: TokenAmount| undefined,
    pair: Pair | undefined,
    isPool: Boolean,
    isApproved: {token0: boolean, token1: boolean} | undefined,
    reserves: Fraction,
    dispatch: (action: any, state?: Object,) => void,
}
