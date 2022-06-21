import { Token } from "gotchiw3s-sdk";
import { ethers } from "ethers";

interface ApproveTx {
    router2: ethers.Contract,
    spender: string,
    amount: string,
    token: Token,
    toast: any,
}

export const approveTx = async(tx: ApproveTx) => {
    try {
        console.warn("APPROVE")
        console.log("//////////////////////////////////////////////////////////")
        console.log("Spender: " + tx.spender)
        console.log("Amount: " + tx.amount)
        console.log("//////////////////////////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await tx.router2?.estimateGas.approve(
            tx.spender,
            tx.amount,
        ) 
    
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.router2?.addLiquidity(
            tx.spender,
            tx.amount,
            {gasLimit: gas}
        )
    
        tx.toast({
            title: `Approve: ${tx.spender} to spend ${tx.token.symbol}`,
            description: `transaction pending at: ${transaction.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Approve: ${tx.spender} to spend ${tx.token.symbol}`,
            description: `Amount approved successfully !`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)
        
    } catch (error: any) {
        console.log(error)
        tx.toast({
            position: "bottom-right",
            title: 'An error occurred.',
            description: `Approve: ${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
}