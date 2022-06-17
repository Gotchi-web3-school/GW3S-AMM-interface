import { CurrencyAmount } from "quickswap-sdk";
import { ethers } from "ethers";

interface SwapTx {
    router2: ethers.Contract | undefined,
    amountIn: CurrencyAmount,
    amountOutMin: CurrencyAmount,
    path: string[],
    to: string,
    deadline: string,
    toast: any,
}

export const swapExactTokensForTokensSupportingFeeOnTransferTokensTx = async(tx: SwapTx) => {
    try {
        console.log("SWAP EXACT TOKENS FOR TOKENS")
        console.log("//////////////////////////////////////")
        console.log("Amount in: " + tx.amountIn.toExact())
        console.log("Amount out min: " + tx.amountOutMin.toExact())
        console.log("Path: " + tx.path)
        console.log("To: " + tx.to)
        console.log("Deadline: " +  tx.deadline)
        console.log("//////////////////////////////////////")

        // let pathCallData: string = "";
        // for(let i = 0; i < tx.path.length; i++) {
        //     pathCallData += ethers.utils.hexZeroPad(tx.path[i], 32)
        // }
    
        //Estimation of the gas cost
        const gas = await tx.router2?.estimateGas.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            tx.amountIn.raw.toString(),
            tx.amountOutMin.raw.toString(),
            tx.path,
            tx.to,
            tx.deadline,
        ) 
    
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.router2?.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            tx.amountIn.raw.toString(),
            tx.amountOutMin.raw.toString(),
            tx.path!,
            tx.to,
            tx.deadline,
            {gasLimit: gas}
        )
    
        tx.toast({
            title: `Swap ${tx.amountIn.currency.symbol} for ${tx.amountOutMin.currency.symbol}`,
            description: `transaction pending at: ${transaction.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Swap ${tx.amountIn.currency.symbol} for ${tx.amountOutMin.currency.symbol}`,
            description: `Liquidity added successfully !`,
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
            description: `Swap exact tokens for tokens: ${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
}