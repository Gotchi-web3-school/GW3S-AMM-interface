import { ethers } from "ethers";
import { TokenAmount, Token, Percent, Fraction, BigintIsh } from "quickswap-sdk";
import { abis, GlobalConst } from "../../Constants";
import { IPool } from "../../Models";

export const fetchBalances = async(pool: IPool, userAdress: string, provider: any): Promise<{tokenA: TokenAmount, tokenB: TokenAmount}> => {
    const ERC20tokenA = new ethers.Contract(pool.pair.token0.address, abis.erc20, provider);
    const ERC20tokenB = new ethers.Contract(pool.pair.token1.address, abis.erc20, provider);
    const balanceA = new TokenAmount(pool.pair.token0, await ERC20tokenA.balanceOf(userAdress));
    const balanceB = new TokenAmount(pool.pair.token1, await ERC20tokenB.balanceOf(userAdress));
    return({
        tokenA: pool.pair.token0.equals(pool.tokenA.token) ? balanceA : balanceB,
        tokenB: pool.pair.token1.equals(pool.tokenB.token) ? balanceB : balanceA,
    });
}

export const fetchPoolBalances = async(pool: IPool, userAdress: string, contract: any): Promise<{balance: TokenAmount, amountA: TokenAmount, amountB: TokenAmount, share: Percent, reserves: any}> => {
    const poolToken = contract.ERC20.attach(pool.liquidityToken?.address)
    const pairContract = contract.pair.attach(pool.liquidityToken?.address);
    const reserves = await pairContract.getReserves()
    const totalSupply = await new TokenAmount(pool.liquidityToken!, await poolToken.totalSupply())
    const balance = await new TokenAmount(pool.liquidityToken!, await poolToken.balanceOf(userAdress));
    const amountA = new TokenAmount(pool.pair.token0, balance.divide(totalSupply).multiply(reserves[0]).quotient);
    const amountB = new TokenAmount(pool.pair.token1, balance.divide(totalSupply).multiply(reserves[1]).quotient);
    const share = new Percent(balance.raw, totalSupply.raw)

    return({
        balance: balance, 
        amountA: pool.pair.token0.equals(pool.tokenA.token) ? amountA : amountB, 
        amountB: pool.pair.token1.equals(pool.tokenB.token) ? amountB : amountA, 
        share: share, 
        reserves: new Fraction( pool.pair.token0.equals(pool.tokenA.token) ? reserves[0] : reserves[1],
                                pool.pair.token1.equals(pool.tokenB.token) ? reserves[1] : reserves[0])
    });
}

export const fetchApproved = async(pool: IPool, userAdress: string, provider: any): Promise<{tokenA: boolean, tokenB: boolean}> => {
    const token0 = new ethers.Contract(pool.pair.token0.address, abis.erc20, provider.getSigner(userAdress));
    const token1 = new ethers.Contract(pool.pair.token1.address, abis.erc20, provider.getSigner(userAdress));
    const approved0: BigintIsh = await token0.allowance(userAdress, GlobalConst.addresses.ROUTER_ADDRESS);
    const approved1: BigintIsh = await token1.allowance(userAdress, GlobalConst.addresses.ROUTER_ADDRESS);
    return ({
        tokenA: pool.pair.token0.equals(pool.tokenA.token) ? pool.pair.reserve0.lessThan(approved0) : pool.pair.reserve1.lessThan(approved1), 
        tokenB: pool.pair.token1.equals(pool.tokenB.token) ? pool.pair.reserve1.lessThan(approved1) : pool.pair.reserve0.lessThan(approved0),
    })
}

export const getLp = async(lpAddress: string, contract: any): Promise<Token> => {
    const lp = contract.ERC20.attach(lpAddress)
    const decimals = await lp.decimals()
    const symbol = await lp.symbol()
    const name = await lp.name()
    return new Token(80001, lpAddress, decimals, symbol, name)
}