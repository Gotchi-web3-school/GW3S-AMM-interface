import { createContext } from "react"
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers"
import { GlobalConst, ROUTER_ADDRESS, FACTORY_ADDRESS } from "../Constants"
import { abis } from "../Constants/Abis/abis"

export type ContractContextType = {
  factory: ethers.Contract | undefined,
  router2: ethers.Contract | undefined, 
  pair: ethers.Contract | undefined, 
  ERC20: ethers.Contract | undefined,
}

export const ContractContext = createContext<ContractContextType>({
    factory: undefined,
    router2: undefined, 
    pair: undefined, 
    ERC20: undefined,
})

export const ContractProvider = (props: any) => {
    const { library, account } = useWeb3React()
    const factory = new ethers.Contract(FACTORY_ADDRESS, abis.factory, library?.getSigner(account) ?? library)
    const router2 = new ethers.Contract(ROUTER_ADDRESS, abis.router2, library?.getSigner(account) ?? library)
    const pair = new ethers.Contract(GlobalConst.addresses.ZERO_ADDRESS, abis.pair, library?.getSigner(account) ?? library)
    const ERC20 = new ethers.Contract(GlobalConst.addresses.ZERO_ADDRESS, abis.erc20, library?.getSigner(account) ?? library)

  
  return (
    <ContractContext.Provider value={{ factory, router2, pair, ERC20 }}>
    {props.children}
    </ContractContext.Provider>
  )
}
