import { ethers } from "ethers";

interface ClaimTx {
    Facet: ethers.Contract | undefined,
    toast: any,
}

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

export const signMessage = (signer: any, message: string) => {
    
}