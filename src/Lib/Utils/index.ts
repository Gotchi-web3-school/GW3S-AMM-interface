import { Web3Provider } from '@ethersproject/providers';
import { BigintIsh, Fraction, Percent, Fetcher, Pair, Token, TokenAmount } from 'gotchiw3s-sdk';
import { abis, GlobalConst, ROUTER_ADDRESS} from '../../Constants';
import { interfaces } from '../../Constants/interfaces';
import { ethers } from "ethers";
import { SelectToken } from '../../Models';

export function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider, 'any');
    library.pollingInterval = 12000;
    return library;
}

export const fetchTokenData = async(address: string, chainId: number, provider: any): Promise<SelectToken> => {
    const erc20 = new ethers.Contract(address, abis.erc20, provider);
    const token: Token = await Fetcher.fetchTokenData(chainId, address, provider);
    const name: string = await erc20.name();
    const symbol: string = await erc20.symbol();
    await Promise.all([token, name, symbol]);
    return ({name: name, symbol: symbol, decimals: token.decimals, address: token.address, chainId: token.chainId, logoURI: ""});
}

export const fetchBalance = async(tokenAddress: string, userAdress: string, provider: any): Promise<string> => {
    let balance
    if (tokenAddress === GlobalConst.addresses.WMATIC) {
        balance = await provider.getBalance(userAdress)
    } else {
        const erc20 = new ethers.Contract(tokenAddress, abis.erc20, provider);
        balance = await erc20.balanceOf(userAdress);
    }
    return(ethers.utils.formatEther(balance));
}

export const fetchApprovedtokens = async(pair: Pair, userAdress: string, provider: any): Promise<{token0: boolean, token1: boolean}> => {
    const token0 = new ethers.Contract(pair.token0.address, abis.erc20, provider.getSigner(userAdress));
    const token1 = new ethers.Contract(pair.token1.address, abis.erc20, provider.getSigner(userAdress));
    const approved0: BigintIsh = await token0.allowance(userAdress, ROUTER_ADDRESS);
    const approved1: BigintIsh = await token1.allowance(userAdress, ROUTER_ADDRESS);
    return ({token0: pair.reserve0.lessThan(approved0), token1: pair.reserve1.lessThan(approved1)})
}

// AMM 
export const fetchApproveToken = async(token: Token, amount: TokenAmount, userAdress: string, provider: any): Promise<boolean> => {
    const erc20 = new ethers.Contract(token.address, abis.erc20, provider.getSigner(userAdress));
    const allowance: BigintIsh = await erc20.allowance(userAdress, ROUTER_ADDRESS);
    return (amount.lessThan(allowance))
}
// normal 
export const fetchApprovedToken = async(tokenAddress: string, amount: number, operator: string, signer: any): Promise<boolean> => {
    const token = new ethers.Contract(tokenAddress, interfaces.IToken, signer.library);
    const allowance: number = parseInt(ethers.utils.formatEther(await token.allowance(signer.account, operator)));
    return (amount < allowance)
}

export const isPoolCreated = async(pair: Pair, factoryAddr: string, provider: any,): Promise<{result: boolean, tokenAddress: any}> => {
    const factory = new ethers.Contract(factoryAddr, abis.factory, provider);
    const pool = await factory.getPair(pair.token0.address, pair.token1.address);
    return {result: pool !== GlobalConst.addresses.ZERO_ADDRESS, tokenAddress: pool};
}

export const fetchReserves = async(pair: Pair, token0: Token, contract: any): Promise<Fraction> => {
    try {
        const pairAddress = await contract.factory.getPair(pair.token0.address, pair.token1.address)
        const pairInstance = contract.pair.attach(pairAddress)
        const reserves = await pairInstance.getReserves()
        const reserve0 = pair.token0.equals(token0) ? reserves[0] : reserves[1]
        const reserve1 = pair.token1.equals(token0) ? reserves[0] : reserves[1]
        return new Fraction(reserve0, reserve1)
    } catch (error) {
        console.log(error)
        return new Fraction('1', '1')
    }
} 

export function calculateSlippageAmount(value: TokenAmount, slippage: Percent): [string, string] {
    const ONE = new Fraction('1', '1');
    if (slippage.lessThan('0') || slippage.greaterThan(ONE)) throw new Error('Unexpected slippage')
    return [value.multiply(ONE.subtract(slippage)).toSignificant(3), value.multiply(ONE.add(slippage)).toSignificant(3)]
}

export const calculateShare = (pair: Pair, token0Amount: TokenAmount, reserves: {tokenA: TokenAmount, tokenB: TokenAmount}): string => {
    const newTotal = reserves.tokenA.add(token0Amount)
    const result = token0Amount.multiply("100").divide(newTotal).toSignificant(2)
    return result;
}

export const isSufficientBalances = (amount0: string, token0Balance: TokenAmount, amount1: string, token1Balance: TokenAmount): boolean => {
    const amountA = parseFloat(amount0);
    const amountB = parseFloat(amount1);
    const balanceA = parseFloat(token0Balance.toExact());
    const balanceB = parseFloat(token1Balance.toExact());
    return (balanceA > 0 && balanceB > 0 && amountA <= balanceA && amountB <= balanceB)
}

export const isSufficientBalance = (amount: string, tokenBalance: TokenAmount): boolean => {
    const amountInput = parseFloat(amount);
    const balance = parseFloat(tokenBalance.toExact());
    return (balance > 0 && amountInput <= balance)
}

export const rate = (amount0: string = "0", amount1: string = "0"): number | string => {
    const result = parseFloat(amount0) / parseFloat(amount1)
    return isNaN(result) ? "0" : result.toPrecision(4)
}

export const getDeadLine = async(provider: any): Promise<string> => {
    return (
        await provider.getBlock()
        .then((result: any) => ethers.BigNumber.from(result.timestamp + GlobalConst.utils.DEFAULT_DEADLINE_FROM_NOW * 10 ))
    )
}

export const isSufficientLPBalance = (input: TokenAmount, balance: TokenAmount): boolean => {
    try {
        const result = parseInt(input.toExact()) <= parseInt(balance.toExact())
        return result
    } catch (error) {
        return false
    }
}

export const getChainIdName = (id: number): string => {
    switch(id) {
        case 1:
            return "ethereum"
        case 4:
            return 'rinkeby'
        case 10:
            return 'Optimism'
        case 58:
            return 'Bsc'
        case 137:
            return 'Polygon'
        case 1284:
            return 'Moonbeam'
        case 1285:
            return 'Moonriver'
        case 42161:
            return 'Arbitrum'
        case 43114:
            return 'Avalanche'
        case 80001:
            return 'Mumbai'
        default:
            return "unknown network"
    } 
}