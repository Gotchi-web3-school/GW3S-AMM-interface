import { Web3Provider } from '@ethersproject/providers'
//import { Token } from 'quickswap-sdk'

export function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = 12000
    return library
}

//export LIST: Token[] = 