import { Web3Provider } from '@ethersproject/providers';
import { BigintIsh, Fetcher, Pair, Token, TokenAmount } from 'quickswap-sdk';
import { abis, GlobalConst} from '../../constants';
import { ethers } from "ethers";

export function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider, 'any');
    library.pollingInterval = 12000;
    return library;
}

export const fetchTokenData = async (address: string, chainId: number, provider: any) => {
    const erc20 = new ethers.Contract(address, abis.erc20, provider);
    const token: Token = await Fetcher.fetchTokenData(chainId, address, provider);
    const name: string = await erc20.name();
    const symbol: string = await erc20.symbol();
    await Promise.all([token, name, symbol]);
    return ({name: name, symbol: symbol, decimals: token.decimals, address: token.address, chainId: token.chainId, logoURI: ""});
}

export const fetchBalance = async(tokenAddress: string, userAdress: string, provider: any) => {
    const erc20 = new ethers.Contract(tokenAddress, abis.erc20, provider);
    const balance = await erc20.balanceOf(userAdress);
    return(ethers.utils.formatEther(balance));
}

export const fetchApproved = async(pair: Pair, tokenAmount: TokenAmount[], userAdress: string, provider: any) => {
    const token0 = new ethers.Contract(pair.token0.address, abis.erc20, provider);
    const token1 = new ethers.Contract(pair.token1.address, abis.erc20, provider);
    const approved0: BigintIsh = await token0.allowance(userAdress, GlobalConst.addresses.ROUTER_ADDRESS);
    const approved1: BigintIsh = await token1.allowance(userAdress, GlobalConst.addresses.ROUTER_ADDRESS);
    return ({token0: tokenAmount[0].lessThan(approved0), token1: tokenAmount[1].lessThan(approved1)})
}

export const getShareOfPool = async(pair: Pair, amoutA: string, provider: any) => {
    const router2 = new ethers.Contract(GlobalConst.addresses.ROUTER_ADDRESS, abis.router2, provider);
    const quote = await router2.quote( pair.reserve0, pair.reserve1);
    console.log(quote)
}

export const isPoolCreated = async(pair: Pair, provider: any) => {
    const factory = new ethers.Contract(GlobalConst.addresses.FACTORY_ADDRESS, abis.factory, provider);
    const pool = await factory.getPair(pair.token0.address, pair.token1.address);
    return pool !== GlobalConst.addresses.ZERO_ADDRESS;
}