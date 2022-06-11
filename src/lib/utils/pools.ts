import { ethers } from "ethers";
import { TokenAmount, Token, Pair, Percent } from "quickswap-sdk";
import { abis } from "../../Constants";

export const fetchBalances = async(tokenA: Token, tokenB: Token, userAdress: string, provider: any): Promise<{tokenA: TokenAmount, tokenB: TokenAmount}> => {
    const ERC20tokenA = new ethers.Contract(tokenA.address, abis.erc20, provider);
    const ERC20tokenB = new ethers.Contract(tokenB.address, abis.erc20, provider);
    const balanceA = new TokenAmount(tokenA, await ERC20tokenA.balanceOf(userAdress));
    const balanceB = new TokenAmount(tokenB, await ERC20tokenB.balanceOf(userAdress));
    return({tokenA: balanceA, tokenB: balanceB});
}

export const fetchPoolBalances = async(pair: Pair, userAdress: string, contract: any, provider: any): Promise<{balance: TokenAmount, amountA: TokenAmount, amountB: TokenAmount, share: Percent}> => {
    const poolToken = contract.ERC20.attach(pair.liquidityToken.address)
    const pairContract = contract.pair.attach(pair.liquidityToken.address);
    const reserves = await pairContract.getReserves()
    const totalSupply = await new TokenAmount(pair.liquidityToken, await poolToken.totalSupply())
    const balance = await new TokenAmount(pair.liquidityToken, await poolToken.balanceOf(userAdress));
    const amountA = new TokenAmount(pair.token0, balance.divide(totalSupply).multiply(reserves[0]).quotient);
    const amountB = new TokenAmount(pair.token1, balance.divide(totalSupply).multiply(reserves[1]).quotient);
    const share = new Percent(balance.raw, totalSupply.raw)

    return({balance: balance, amountA: amountA, amountB: amountB, share: share});
}