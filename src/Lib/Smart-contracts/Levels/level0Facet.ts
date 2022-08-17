import { ethers } from "ethers";
import { ClaimTx, OpennedChest } from "../../../Models";

export const openL0Chest = async(tx: ClaimTx): Promise<OpennedChest> => {
    try {    
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 0)
        console.log("///////////////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.openL0Chest()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const loots = await tx.Facet?.callStatic.openL0Chest()
        const transaction = await tx.Facet?.openL0Chest()
    
        tx.toast({
            title: `Open chest level 0`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Open chest level 0`,
            description: `Reward claimed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "CLAIM", payload: true})

        return loots
    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Open chest level 0.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}
