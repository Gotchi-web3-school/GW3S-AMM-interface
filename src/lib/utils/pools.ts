import { ethers } from "ethers";
import { TokenAmount, Token } from "quickswap-sdk";
import { abis } from "../../Constants";

export const fetchBalances = async(tokenA: Token, tokenB: Token, userAdress: string, provider: any): Promise<{tokenA: TokenAmount, tokenB: TokenAmount}> => {
    const ERC20tokenA = new ethers.Contract(tokenA.address, abis.erc20, provider);
    const ERC20tokenB = new ethers.Contract(tokenB.address, abis.erc20, provider);
    const balanceA = new TokenAmount(tokenA, await ERC20tokenA.balanceOf(userAdress));
    const balanceB = new TokenAmount(tokenB, await ERC20tokenB.balanceOf(userAdress));
    return({tokenA: balanceA, tokenB: balanceB});
}