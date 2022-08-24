import { ethers } from "ethers";
import { CompleteTx, InitTx, ClaimTx } from "../../../Models/index"
import { Reward } from "../../../Models";
import { fetchLootsMetadatas } from "../Rewards";
import { TokenList, level6List } from "../../../Constants/list";
import { Pool } from "../../../Models/index";
import { interfaces } from "../../../Constants/interfaces";
import { ContractContextType } from "../../../Provider/ContractProvider";

export const start_l6 = async(tx: InitTx) => {
    try {    
        console.warn("INIT")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 6)
        console.log("///////////////////////////////////////////////")

    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.initLevel6() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.initLevel6()
    
        tx.toast({
            title: `Init level 6`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Init level 6`,
            description: `level initiated successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "INIT", payload: 6})

    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Init level 6.',
            description: `${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}

export const completeL6 = async(tx: CompleteTx) => {
    try {    
        console.warn("COMPLETE")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 6)
        console.log("///////////////////////////////////////////////")
        //Estimation of the gas cost

        const gas = await tx.Facet?.estimateGas.completeL6() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.completeL6()
        
        tx.toast({
            title: `Complete level 6`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
        })
        
        const receipt = await transaction.wait()
        
        tx.toast({
            title: `Complete level 6`,
            description: `Level completed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
            console.log(receipt)

            const hasCompleted = await tx.LoupeFacet?.hasCompletedLevel(tx.signer.account, 6)
            tx.dispatch({type: "COMPLETED", payload: hasCompleted})
            
        } catch (error: any) {
            console.log(error.error.message)
            tx.toast({
                position: "bottom-right",
                title: 'Complete level 6.',
                description: `${error.error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            throw new Error(error.error)
    }
}

export const openL6Chest = async(tx: ClaimTx): Promise<Array<Reward | undefined>> => {
    let rewards: Array<Reward | undefined> = []
    let loots, amounts

    try {   
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 6)
        console.log("///////////////////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.openL6Chest()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const chestOpenned = await tx.Facet?.callStatic.openL6Chest()
        const transaction = await tx.Facet?.openL6Chest()
    
        tx.toast({
            title: `Open chest level 6`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Open chest level 6`,
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
            title: 'Open chest level 6.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        throw new Error(error.error.message)
    }
}

export const fetchAMMState = async(signer: any, contracts: ContractContextType, factory: string): Promise<{
    initCode: string,
    list: TokenList[],
    pools: Pool[] 
} | undefined> => {

    let initCode = '';
    let list: TokenList[] = level6List
    let pools: Pool[] = []
    try {
        const tokens = await contracts.LevelLoupeFacet!.getTokensLevel(6)
        
        const Factory = new ethers.Contract(factory, interfaces.IFactory, signer.library?.getSigner(signer.account) ?? signer.library)
    
        for(let i = 0; i < tokens.length - 1; i++)
            list[i].address = tokens[i]

        initCode = await Factory.getInitCodeHash()
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