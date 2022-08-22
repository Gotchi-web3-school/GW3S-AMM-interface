import { ethers } from "ethers";
import { TokenList } from "../../../Constants/list";
import { ContractContextType } from "../../../Provider/ContractProvider";
import { interfaces } from "../../../Constants/interfaces";
import { level3List } from "../../../Constants/list"
import { Pool } from "../../../Models";
import { Token } from "gotchiw3s-sdk"
import { DEFAULT_LOGOS } from "../../../Constants/index"

interface ClaimTx {
    ILevel0: ethers.Contract | undefined,
    toast: any,
}

export const claim_l0 = async(tx: ClaimTx) => {
    try {    
        console.warn("CLAIM")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 0)
        console.log("///////////////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await tx.ILevel0?.estimateGas.claim_l0() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.ILevel0?.claim_l0()
    
        tx.toast({
            title: `Claim level 0`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Claim level 0`,
            description: `Reward claimed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)
        
    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Claim level 0.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}

export const fetchLevel3State = async(signer: any, contracts: ContractContextType): Promise<{
    running: number,
    instanceAddress: string,
    hasCompleted: boolean,
    hasClaimed: boolean,
    factory: string, 
    initCode: string,
    list: TokenList[],
    pools: Pool[] 
} | undefined> => {
    try {
        const {LevelLoupeFacet} = contracts
        let initCode = '';
        let list: TokenList[] = level3List
        let pools: Pool[] = []
    
        const instanceAddress: string = await LevelLoupeFacet!.getLevelInstanceByAddress(signer.account, 3)
        const Level3Instance = new ethers.Contract(instanceAddress, interfaces.ILevel3Instance, signer.library)
        
        const running: BigInt = LevelLoupeFacet!.getRunningLevel(signer.account)
        const hasCompleted: boolean = LevelLoupeFacet!.hasCompletedLevel(signer.account, 3)
        const hasClaimed: boolean = LevelLoupeFacet!.hasClaimedLevel(signer.account, 3)
        const factory: string = LevelLoupeFacet!.getFactoryLevel(3, 0)
        
        const result = await Promise.all([running, hasCompleted, hasClaimed, factory])
        for(let i = 0; i < 2; i++) (
            list[i].address = await Level3Instance.tokens(i)
        )
        const IFactory = new ethers.Contract(result[3], interfaces.IFactory, signer.library)
        initCode = await IFactory.getInitCodeHash()

        // Get the pool
        let tokenA = new Token( signer.chainId, list[0].address, 18, list[0].symbol, list[0].name)
        let tokenB = new Token( signer.chainId, list[1].address, 18, list[1].symbol, list[1].name)
        pools.push(new Pool(0, `${list[0].symbol} - ${list[1].symbol}`, tokenA, tokenB,  result[3], initCode,  {tokenA: DEFAULT_LOGOS[2], tokenB: DEFAULT_LOGOS[1]}),)
        
        console.log(pools)
        return {
            running: parseInt(result[0].toString()),
            instanceAddress: instanceAddress,
            hasCompleted: result[1],
            hasClaimed: result[2],
            factory: result[3],
            initCode: initCode,
            list: list,
            pools: pools
        }
        
    } catch (error: any) {
        console.log(error.message)
        throw new Error("REKT")
    }
}