import { ethers } from "ethers";
import {CompleteTx, ClaimTx} from "../../../Models/index"

export const claim_l1 = async(tx: ClaimTx) => {
    try {    
        console.warn("CLAIM")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 1)
        console.log("///////////////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.claim_l1() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.claim_l1()
    
        tx.toast({
            title: `Claim level 1`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Claim level 1`,
            description: `Reward claimed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "CLAIM", payload: true})
        
    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Claim level 1.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
}


export const complete_l1 = async(tx: CompleteTx) => {
    try {    
        console.warn("COMPLETE")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 1)
        console.log("///////////////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.complete_l1() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.complete_l1()
    
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
    }
}