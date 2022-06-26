import {InjectedConnector} from '@web3-react/injected-connector';
import { utils } from 'ethers';

export const injected = new InjectedConnector({supportedChainIds: [1, 4, 10, 58, 137, 1284, 1285, 42161, 43114, 80001]});

export const connectUser = (activate: any): void => {
    activate(injected)
}


const networkMap = {
  POLYGON_MAINNET: {
    chainId: utils.hexValue(137), // '0x89'
    chainName: "Matic(Polygon) Mainnet", 
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://www.polygonscan.com/"],
  },
  MUMBAI_TESTNET: {
    chainId: utils.hexValue(80001), // '0x13881'
    chainName: "Matic(Polygon) Mumbai Testnet",
    nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

export const switchNetwork = async(window: any, chainId: number) => {
    try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.MUMBAI_TESTNET],
        });
    } catch (err: any) {
          // This error code indicates that the chain has not been added to MetaMask
    }
}