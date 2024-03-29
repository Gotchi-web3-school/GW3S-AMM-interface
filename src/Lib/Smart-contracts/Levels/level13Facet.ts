import { ethers } from "ethers";

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
    }
}
