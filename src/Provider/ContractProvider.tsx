import { createContext } from "react"
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers"
import { GlobalConst, ROUTER_ADDRESS, DEFAULT_FACTORY_ADDRESS, DIAMOND_ADDRESS } from "../Constants"
import { abis } from "../Constants/Abis/abis"
import { interfaces } from "../Constants/interfaces";

export type ContractContextType = {
  factory: ethers.Contract | undefined,
  router2: ethers.Contract | undefined, 
  pair: ethers.Contract | undefined, 
  ERC20: ethers.Contract | undefined,
  IToken: ethers.Contract | undefined,
  ILevel0Facet: ethers.Contract | undefined,
  ILevel1Facet: ethers.Contract | undefined,
  ILevel2Facet: ethers.Contract | undefined,
  ILevel3Facet: ethers.Contract | undefined,
  ILevel4Facet: ethers.Contract | undefined,
  ILevel5Facet: ethers.Contract | undefined,
  ILevel6Facet: ethers.Contract | undefined,
  ILevel7Facet: ethers.Contract | undefined,
  ILevel8Facet: ethers.Contract | undefined,
  ILevel9Facet: ethers.Contract | undefined,
  ILevel10Facet: ethers.Contract | undefined,
  ILevel11Facet: ethers.Contract | undefined,
  ILevel12Facet: ethers.Contract | undefined,
  ILevel13Facet: ethers.Contract | undefined,
  LevelLoupeFacet: ethers.Contract | undefined,
  LevelFacets: Array<ethers.Contract>
}

export const ContractContext = createContext<ContractContextType>({
    factory: undefined,
    router2: undefined, 
    pair: undefined, 
    ERC20: undefined,
    IToken: undefined,
    ILevel0Facet: undefined,
    ILevel1Facet: undefined,
    ILevel2Facet: undefined,
    ILevel3Facet: undefined,
    ILevel4Facet: undefined,
    ILevel5Facet: undefined,
    ILevel6Facet: undefined,
    ILevel7Facet: undefined,
    ILevel8Facet: undefined,
    ILevel9Facet: undefined,
    ILevel10Facet: undefined,
    ILevel11Facet: undefined,
    ILevel12Facet: undefined,
    ILevel13Facet: undefined,
    LevelLoupeFacet: undefined,
    LevelFacets: []
})

export const ContractProvider = (props: any) => {
    const { library, account } = useWeb3React()
    const factory = new ethers.Contract(DEFAULT_FACTORY_ADDRESS, abis.factory, library?.getSigner(account) ?? library)
    const router2 = new ethers.Contract(ROUTER_ADDRESS, abis.router2, library?.getSigner(account) ?? library)
    const pair = new ethers.Contract(GlobalConst.addresses.ZERO_ADDRESS, abis.pair, library?.getSigner(account) ?? library)
    const ERC20 = new ethers.Contract(GlobalConst.addresses.ZERO_ADDRESS, abis.erc20, library?.getSigner(account) ?? library)
    const IToken = new ethers.Contract(DIAMOND_ADDRESS, interfaces.IToken, library?.getSigner(account) ?? library)
    const ILevel0Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel0Facet, library?.getSigner(account) ?? library)
    const ILevel1Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel1Facet, library?.getSigner(account) ?? library)
    const ILevel2Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel2Facet, library?.getSigner(account) ?? library)
    const ILevel3Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel3Facet, library?.getSigner(account) ?? library)
    const ILevel4Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel4Facet, library?.getSigner(account) ?? library)
    const ILevel5Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel5Facet, library?.getSigner(account) ?? library)
    const ILevel6Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel6Facet, library?.getSigner(account) ?? library)
    const ILevel7Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel7Facet, library?.getSigner(account) ?? library)
    const ILevel8Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel8Facet, library?.getSigner(account) ?? library)
    const ILevel9Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel9Facet, library?.getSigner(account) ?? library)
    const ILevel10Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel10Facet, library?.getSigner(account) ?? library)
    const ILevel11Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel11Facet, library?.getSigner(account) ?? library)
    const ILevel12Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel12Facet, library?.getSigner(account) ?? library)
    const ILevel13Facet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.ILevel13Facet, library?.getSigner(account) ?? library)
    const LevelLoupeFacet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.LevelLoupeFacet, library?.getSigner(account) ?? library)
    const LevelFacets = [
      ILevel0Facet,
      ILevel1Facet,
      ILevel2Facet,
      ILevel3Facet,
      ILevel4Facet,
      ILevel5Facet,
      ILevel6Facet,
      ILevel7Facet,
      ILevel8Facet,
      ILevel9Facet,
      ILevel10Facet,
      ILevel11Facet,
      ILevel12Facet,
      ILevel13Facet,
    ]

  
  return (
    <ContractContext.Provider value={{ 
      factory, router2, pair, ERC20, IToken, LevelFacets,
      ILevel0Facet, ILevel1Facet, ILevel2Facet, ILevel3Facet, ILevel4Facet, ILevel5Facet, ILevel6Facet, ILevel7Facet, ILevel8Facet,
      ILevel9Facet, ILevel10Facet, ILevel11Facet, ILevel12Facet, ILevel13Facet,
      LevelLoupeFacet
      }}>
    {props.children}
    </ContractContext.Provider>
  )
}
