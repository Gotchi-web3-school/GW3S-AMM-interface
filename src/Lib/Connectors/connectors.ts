import {InjectedConnector} from '@web3-react/injected-connector';
import { ethers } from 'ethers';

export const injected = new InjectedConnector({supportedChainIds: [1, 4, 10, 58, 137, 1284, 1285, 42161, 43114, 80001]});

export const connectUser = (activate: any): void => {
    activate(injected)
}

export const switchNetwork = async(window: any, chainId: number) => {
    try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ethers.utils.hexValue(chainId) }]
        });
        } catch (err: any) {
          // This error code indicates that the chain has not been added to MetaMask
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Mumbai Testnet',
                iconUrls: ["https://seeklogo.com/images/P/polygon-matic-logo-86F4D6D773-seeklogo.com.png"],
                chainId: ethers.utils.hexValue(chainId),
                nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'TMATIC' },
                rpcUrls: ["https://rpc-mumbai.maticvigil.com", 'https://rpc-mumbai.matic.today'],
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                chain: "testnet",
              }
            ]
          });
      }
}