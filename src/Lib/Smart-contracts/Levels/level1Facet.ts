import { ethers } from "ethers";
import {CompleteTx, ClaimTx} from "../../../Models/index"
import { Reward } from "../Rewards";
import { fetchLootsMetadatas } from "../Rewards";

export const openL1Chest = async(tx: ClaimTx): Promise<Array<Reward | undefined>> => {
    let rewards: Array<Reward | undefined> = []
    let loots, amounts
    
    try {    
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 1)
        console.log("///////////////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.openL1Chest()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const chestOpenned = await tx.Facet?.callStatic.openL1Chest()
        const transaction = await tx.Facet?.openL1Chest()
    
        tx.toast({
            title: `Open chest level 1`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Open chest level 1`,
            description: `Reward claimed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "CLAIM", payload: true})
        console.log(chestOpenned)
        loots = chestOpenned.loots.filter((elem: any) => elem !== "0x0000000000000000000000000000000000000000")
        amounts = chestOpenned.amounts.filter((elem: any) => ethers.utils.formatEther(elem) !== '0.0')
        if (loots)
            rewards = await fetchLootsMetadatas({loots: loots, amounts: amounts}, tx.signer)
            
        return rewards
    } catch (error: any) {
        console.log(error)
        tx.toast({
            position: "bottom-right",
            title: 'Open chest level 1.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}


export const completeL1 = async(tx: CompleteTx) => {
    try {    
        console.warn("COMPLETE")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 1)
        console.log("///////////////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.completeL1() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.completeL1()
    
        tx.toast({
            title: `Complete level 1`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Complete level 1`,
            description: `Level completed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        const hasCompleted = await tx.LoupeFacet?.hasCompletedLevel(tx.signer.account, 1)
        tx.dispatch({type: "COMPLETED", payload: hasCompleted})
        
    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Complete level 1.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}