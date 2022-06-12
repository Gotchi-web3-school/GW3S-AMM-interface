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
    liquidityToken?: Token
    pair: Pair;
    logoURI?: {tokenA?: string, tokenB?: string};
    balance: string | undefined
    share: Percent
    isApproved?: boolean
    totalReserves?: Fraction
    isPool?: boolean | undefined
    tokenA: {
        token: Token,
        isApproved: boolean, 
        pooled: string, 
        input: TokenAmount, 
        balance: TokenAmount | undefined,
        logo?: string,
        loading: boolean,
    }
    tokenB: {
        token: Token,
        isApproved: boolean, 
        pooled: string, 
        input: TokenAmount, 
        balance: TokenAmount | undefined,
        logo?: string
        loading: boolean,
    }
}

export class Pool implements IPool {
    name: string;
    pair: Pair;
    liquidityToken?: Token
    balance: string | undefined = undefined
    share: Percent = new Percent("0", "100")
    isApproved = false
    totalReserves: Fraction = new Fraction("1", "1")
    isPool = undefined
    tokenA: {
        token: Token,
        isApproved: boolean, 
        pooled: string, 
        input: TokenAmount, 
        balance: TokenAmount,
        logo?: string,
        loading: boolean,
    }
    tokenB: {
        token: Token,
        isApproved: boolean, 
        pooled: string, 
        input: TokenAmount, 
        balance: TokenAmount,
        logo?: string,
        loading: boolean
    }

    constructor(name: string, tokenA: Token, tokenB: Token,  logoURI?: {tokenA?: string, tokenB?: string}) {
        this.name = name;
        this.pair = new Pair(new TokenAmount(tokenA, JSBI.BigInt("0")), new TokenAmount(tokenB, JSBI.BigInt("0")));
        this.tokenA = {
            token: tokenA,
            isApproved: false, 
            pooled: "0", 
            input: new TokenAmount(tokenA, JSBI.BigInt("0")), 
            balance: new TokenAmount(tokenA, JSBI.BigInt("0")),
            logo: logoURI?.tokenA,
            loading: false,
        }
        this.tokenB = {
            token: tokenB,
            isApproved: false, 
            pooled: "0", 
            input: new TokenAmount(tokenA, JSBI.BigInt("0")), 
            balance: new TokenAmount(tokenA, JSBI.BigInt("0")),
            logo: logoURI?.tokenB,
            loading: false,
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
