import { Web3Provider } from '@ethersproject/providers'
import { Fetcher, Token } from 'quickswap-sdk'
import { abis } from '../../constants'
import { ethers } from "ethers"

export function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = 12000
    return library
}

export const fetchTokenData = async (address: string, chainId: number, provider: any) => {
    const erc20 = new ethers.Contract(address, abis.erc20, provider)
    const token: Token = await Fetcher.fetchTokenData(chainId, address, provider)
    const name: string = await erc20.name()
    const symbol: string = await erc20.symbol()
    await Promise.all([token, name, symbol])
    return ({name: name, symbol: symbol, decimals: token.decimals, address: token.address, chainId: token.chainId, logoURI: ""})
} 