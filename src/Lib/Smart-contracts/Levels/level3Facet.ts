import { ethers } from "ethers";
import { Token } from "gotchiw3s-sdk"
import { TokenList } from "../../../Constants/list";
import { CompleteTx, ClaimTx, InitTx } from "../../../Models/index"
import { Reward } from "../../../Models";
import { ContractContextType } from "../../../Provider/ContractProvider";
import { interfaces } from "../../../Constants/interfaces";
import { level3List } from "../../../Constants/list"
import { Pool } from "../../../Models";
import { DEFAULT_LOGOS } from "../../../Constants/index"
import { fetchLootsMetadatas } from "../Rewards";

export const start_l3 = async(tx: InitTx) => {
    try {    
        console.warn("INIT")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 3)
        console.log("///////////////////////////////////////////////")

    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.initLevel3() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.initLevel3()
    
        tx.toast({
            title: `Init level 3`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Init level 3`,
            description: `level initiated successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "INIT", payload: 3})

    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Init level 3.',
            description: `${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}

export const completeL3 = async(tx: CompleteTx) => {
    try {    
        console.warn("COMPLETE")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 3)
        console.log("///////////////////////////////////////////////")
        console.log("Facet: ", tx.Facet)
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.completeL3() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.completeL3()
        
        tx.toast({
            title: `Complete level 3`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
        })
        
        const receipt = await transaction.wait()
        
        tx.toast({
            title: `Complete level 3`,
            description: `Level completed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
            console.log(receipt)

            const hasCompleted = await tx.LoupeFacet?.hasCompletedLevel(tx.signer.account, 3)
            tx.dispatch({type: "COMPLETED", payload: hasCompleted})
            
        } catch (error: any) {
            console.log(error.error.message)
            tx.toast({
                position: "bottom-right",
                title: 'Complete level 3.',
                description: `${error.error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            throw new Error(error.error)
    }
}

export const openL3Chest = async(tx: ClaimTx): Promise<Array<Reward | undefined>> => {
    let rewards: Array<Reward | undefined> = []
    let loots, amounts

    try {   
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 3)
        console.log("///////////////////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.openL3Chest()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const chestOpenned = await tx.Facet?.callStatic.openL3Chest()
        const transaction = await tx.Facet?.openL3Chest()
    
        tx.toast({
            title: `Open chest level 3`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Open chest level 3`,
            description: `Reward claimed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "CLAIM", payload: true})
        
        loots = chestOpenned.loots.filter((elem: any) => elem !== "0x0000000000000000000000000000000000000000")
        amounts = chestOpenned.amounts.filter((elem: any) => ethers.utils.formatEther(elem) !== '0.0')
        if (loots)
            rewards = await fetchLootsMetadatas({loots: loots, amounts: amounts}, tx.signer)
            
        return rewards
    } catch (error: any) {
        console.log(error)
        tx.toast({
            position: "bottom-right",
            title: 'Open chest level 3.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        throw new Error(error.error.message)
    }
}


export const fetchLevel3State = async(signer: any, contracts: ContractContextType): Promise<{
    running: number,
    instanceAddress: string,
    hasCompleted: boolean,
    hasClaimed: boolean,
    factories: string[],
} | undefined> => {
    try {
        const {LevelLoupeFacet} = contracts
        const instanceAddress: string = await LevelLoupeFacet!.getLevelInstanceByAddress(signer.account, 3)
        
        const running: BigInt = LevelLoupeFacet!.getRunningLevel(signer.account)
        const hasCompleted: boolean = LevelLoupeFacet!.hasCompletedLevel(signer.account, 3)
        const hasClaimed: boolean = LevelLoupeFacet!.hasClaimedLevel(signer.account, 3)
        const factory: string = LevelLoupeFacet!.getFactoryLevel(3, 0)
        
        const result = await Promise.all([running, hasCompleted, hasClaimed, factory])
        
        return {
            running: parseInt(result[0].toString()),
            instanceAddress: instanceAddress,
            hasCompleted: result[1],
            hasClaimed: result[2],
            factories: [result[3]],
        }
        
    } catch (error: any) {
        console.log(error.message)
        throw new Error("REKT")
    }
}

export const fetchAMMState = async(signer: any, instanceAddress: string, factory: string): Promise<{
    initCode: string,
    list: TokenList[],
    pools: Pool[] 
} | undefined> => {

    let initCode = '';
    let list: TokenList[] = level3List
    let pools: Pool[] = []

    try {
        const Level3Instance = new ethers.Contract(instanceAddress, interfaces.ILevel3Instance, signer.library)
    
        for(let i = 0; i < 2; i++) (
            list[i].address = await Level3Instance.tokens(i)
        )
        const IFactory = new ethers.Contract(factory, interfaces.IFactory, signer.library)
        initCode = await IFactory.getInitCodeHash()
    
        // Get the pool
        let tokenA = new Token( signer.chainId, list[0].address, 18, list[0].symbol, list[0].name)
        let tokenB = new Token( signer.chainId, list[1].address, 18, list[1].symbol, list[1].name)
        pools.push(new Pool(0, `${list[0].symbol} - ${list[1].symbol}`, tokenA, tokenB,  factory, initCode,  {tokenA: DEFAULT_LOGOS[2], tokenB: DEFAULT_LOGOS[1]}))
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
    
    return {
        initCode: initCode,
        list: list,
        pools: pools
    }
}