import { ethers } from "ethers";
import { Token } from "gotchiw3s-sdk"
import { TokenList } from "../../../Constants/list";
import { CompleteTx, ClaimTx, InitTx } from "../../../Models/index"
import { Reward } from "../../../Models";
import { ContractContextType } from "../../../Provider/ContractProvider";
import { interfaces } from "../../../Constants/interfaces";
import { level4List } from "../../../Constants/list"
import { Pool } from "../../../Models";
import { fetchLootsMetadatas } from "../Rewards";


export const start_l4 = async(tx: InitTx) => {
    try {    
        console.warn("INIT")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 4)
        console.log("///////////////////////////////////////////////")

    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.initLevel4() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.initLevel4()
    
        tx.toast({
            title: `Init level 4`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Init level 4`,
            description: `level initiated successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "INIT", payload: 4})

    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Init level 4.',
            description: `${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}

export const completeL4 = async(tx: CompleteTx) => {
    try {    
        console.warn("COMPLETE")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 4)
        console.log("///////////////////////////////////////////////")
        console.log("Facet: ", tx.Facet)
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.completeL4() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.completeL4()
        
        tx.toast({
            title: `Complete level 4`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
        })
        
        const receipt = await transaction.wait()
        
        tx.toast({
            title: `Complete level 4`,
            description: `Level completed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
            console.log(receipt)

            const hasCompleted = await tx.LoupeFacet?.hasCompletedLevel(tx.signer.account, 4)
            tx.dispatch({type: "COMPLETED", payload: hasCompleted})
            
        } catch (error: any) {
            console.log(error.error.message)
            tx.toast({
                position: "bottom-right",
                title: 'Complete level 4.',
                description: `${error.error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            throw new Error(error.error)
    }
}

export const openL4Chest = async(tx: ClaimTx): Promise<Array<Reward | undefined>> => {
    let rewards: Array<Reward | undefined> = []
    let loots, amounts

    try {   
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 4)
        console.log("///////////////////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.openL4Chest()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const chestOpenned = await tx.Facet?.callStatic.openL4Chest()
        const transaction = await tx.Facet?.openL4Chest()
    
        tx.toast({
            title: `Open chest level 4`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Open chest level 4`,
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
            title: 'Open chest level 4.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        throw new Error(error.error.message)
    }
}


export const fetchLevel4State = async(signer: any, contracts: ContractContextType): Promise<{
    running: number,
    instanceAddress: string,
    hasCompleted: boolean,
    hasClaimed: boolean,
    factories: string[],
} | undefined> => {
    try {
        const {LevelLoupeFacet} = contracts
        const instanceAddress: string = await LevelLoupeFacet!.getLevelInstanceByAddress(signer.account, 4)
        
        const running: BigInt = LevelLoupeFacet!.getRunningLevel(signer.account)
        const hasCompleted: boolean = LevelLoupeFacet!.hasCompletedLevel(signer.account, 4)
        const hasClaimed: boolean = LevelLoupeFacet!.hasClaimedLevel(signer.account, 4)
        const factory: string = LevelLoupeFacet!.getFactoryLevel(4, 0)
        
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
    let list: TokenList[] = level4List
    let pools: Pool[] = []

    try {
        const Level4Instance = new ethers.Contract(instanceAddress, interfaces.ILevel4Instance, signer.library)
    
        for(let i = 0; i < 4; i++) (
            list[i].address = await Level4Instance.tokens(i)
        )
        const IFactory = new ethers.Contract(factory, interfaces.IFactory, signer.library)
        initCode = await IFactory.getInitCodeHash()
    
        // Get the pool
        let tokenA = new Token( signer.chainId, list[0].address, 18, list[0].symbol, list[0].name)
        let tokenB = new Token( signer.chainId, list[1].address, 18, list[1].symbol, list[1].name)
        let tokenC = new Token( signer.chainId, list[2].address, 18, list[2].symbol, list[2].name)
        let tokenD = new Token( signer.chainId, list[3].address, 18, list[3].symbol, list[3].name)
        pools.push(new Pool(0, `${list[0].symbol} - ${list[1].symbol}`, tokenA, tokenB,  factory, initCode,  {tokenA: list[0].logoURI, tokenB: list[1].logoURI}))
        pools.push(new Pool(1, `${list[2].symbol} - ${list[1].symbol}`, tokenC, tokenB,  factory, initCode,  {tokenA: list[2].logoURI, tokenB: list[1].logoURI}))
        pools.push(new Pool(2, `${list[3].symbol} - ${list[2].symbol}`, tokenD, tokenC,  factory, initCode,  {tokenA: list[3].logoURI, tokenB: list[2].logoURI}))
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