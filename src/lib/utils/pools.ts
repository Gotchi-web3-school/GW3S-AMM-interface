import { ethers } from "ethers";
import { TokenAmount, Token, Percent, BigintIsh } from "gotchiw3s-sdk";
import { abis, GlobalConst, ROUTER_ADDRESS } from "../../Constants";
import { IPool } from "../../Models";

export const fetchBalances = async(pool: IPool, userAdress: string, provider: any): Promise<{tokenA: TokenAmount, tokenB: TokenAmount}> => {
    let ERC20tokenA, ERC20tokenB, ERC20token, balanceA, balanceB;
    if (pool.pair.token0.address === GlobalConst.addresses.WMATIC || pool.pair.token1.address === GlobalConst.addresses.WMATIC) {
        const token = pool.tokenA.token.address === GlobalConst.addresses.WMATIC ? pool.tokenB.token : pool.tokenA.token
        const matic = pool.tokenB.token.address === GlobalConst.addresses.WMATIC ? pool.tokenA.token : pool.tokenB.token
        ERC20token = new ethers.Contract(token.address, abis.erc20, provider);
        balanceA = new TokenAmount(token, await ERC20token.balanceOf(userAdress));
        balanceB = new TokenAmount(matic, await provider.getBalance(userAdress));
        return ({
            tokenA: pool.pair.token0.address === GlobalConst.addresses.WMATIC ? balanceB : balanceA,
            tokenB: pool.pair.token1.address === GlobalConst.addresses.WMATIC ? balanceB : balanceA
        })
    } else {
        ERC20tokenA = new ethers.Contract(pool.pair.token0.address, abis.erc20, provider);
        ERC20tokenB = new ethers.Contract(pool.pair.token1.address, abis.erc20, provider);
        balanceA = new TokenAmount(pool.pair.token0, await ERC20tokenA.balanceOf(userAdress));
        balanceB = new TokenAmount(pool.pair.token1, await ERC20tokenB.balanceOf(userAdress));
        return({
            tokenA: pool.pair.token0.equals(pool.tokenA.token) ? balanceA : balanceB,
            tokenB: pool.pair.token1.equals(pool.tokenB.token) ? balanceB : balanceA,
        });
    }
}

export const fetchPoolBalances = async(pool: IPool, userAdress: string, contract: any): Promise<{balance: TokenAmount, amountA: TokenAmount, amountB: TokenAmount, share: Percent, reserves: any}> => {
    const poolToken = contract.ERC20.attach(pool.lpToken.token?.address)
    const pairContract = contract.pair.attach(pool.lpToken.token?.address);
    const reserves = await pairContract.getReserves()
    const totalSupply = await new TokenAmount(pool.lpToken.token!, await poolToken.totalSupply())
    const balance = await new TokenAmount(pool.lpToken.token!, await poolToken.balanceOf(userAdress));
    const amountA = new TokenAmount(pool.pair.token0, balance.divide(totalSupply).multiply(reserves[0]).quotient);
    const amountB = new TokenAmount(pool.pair.token1, balance.divide(totalSupply).multiply(reserves[1]).quotient);
    const share = new Percent(balance.raw, totalSupply.raw)

    return({
        balance: balance, 
        amountA: pool.pair.token0.equals(pool.tokenA.token) ? amountA : amountB, 
        amountB: pool.pair.token1.equals(pool.tokenB.token) ? amountB : amountA, 
        share: share, 
        reserves: {tokenA: new TokenAmount(pool.tokenA.token, pool.pair.token0.equals(pool.tokenA.token) ? reserves[0] : reserves[1]),
                   tokenB: new TokenAmount(pool.tokenB.token, pool.pair.token1.equals(pool.tokenB.token) ? reserves[1] : reserves[0])}
    });
}

export const fetchApprovedLp = async(pool: IPool, userAdress: string, provider: any): Promise<boolean> => {
    const lp = new ethers.Contract(pool.lpToken.token!.address, abis.erc20, provider.getSigner(userAdress));
    const approved: BigintIsh = await lp.allowance(userAdress, ROUTER_ADDRESS);
    return (parseInt(ethers.utils.formatEther(approved.toString())) > 0)
}

export const fetchApprovedPair = async(pool: IPool, userAdress: string, provider: any): Promise<{tokenA: boolean, tokenB: boolean}> => {
    let tokenA, tokenB, token, approvedA: BigintIsh, approvedB: BigintIsh, approved: BigintIsh;
    // if the pair include MATIC native token
    if (pool.tokenA.token.address === GlobalConst.addresses.WMATIC || pool.tokenB.token.address === GlobalConst.addresses.WMATIC) {
        const tokenAddress = pool.tokenA.token.address === GlobalConst.addresses.WMATIC ? pool.tokenB.token.address : pool.tokenA.token.address
        token =  new ethers.Contract(tokenAddress, abis.erc20, provider.getSigner(userAdress));
        approved = await token.allowance(userAdress, ROUTER_ADDRESS);
        return ({
            tokenA: pool.tokenA.token.address === GlobalConst.addresses.WMATIC ? true : parseInt(ethers.utils.formatEther(approved.toString())) > 0,
            tokenB: pool.tokenB.token.address === GlobalConst.addresses.WMATIC ? true : parseInt(ethers.utils.formatEther(approved.toString())) > 0
        })
    } else {
        tokenA = new ethers.Contract(pool.tokenA.token!.address, abis.erc20, provider.getSigner(userAdress));
        tokenB = new ethers.Contract(pool.tokenB.token!.address, abis.erc20, provider.getSigner(userAdress));
        approvedA = await tokenA.allowance(userAdress, ROUTER_ADDRESS);
        approvedB = await tokenB.allowance(userAdress, ROUTER_ADDRESS);
        return ({
            tokenA: parseInt(ethers.utils.formatEther(approvedA.toString())) > 0, 
            tokenB: parseInt(ethers.utils.formatEther(approvedB.toString())) > 0
        })
    }
}

export const getLp = async(lpAddress: string, contract: any): Promise<Token> => {
    const lp = contract.ERC20.attach(lpAddress)
    const decimals = await lp.decimals()
    const symbol = await lp.symbol()
    const name = await lp.name()
    return new Token(80001, lpAddress, decimals, symbol, name)
}