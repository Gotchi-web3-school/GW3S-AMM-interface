import { CurrencyAmount } from "gotchiw3s-sdk";
import { ethers } from "ethers";

interface SwapExactTokenForTokenTx {
    router2: ethers.Contract | undefined,
    amountIn: CurrencyAmount,
    amountOutMin: CurrencyAmount,
    path: string[],
    to: string,
    deadline: string,
    toast: any,
    dispatch: (state: {}, action?: Object | undefined) => void,
}

export const swapExactTokensForTokensSupportingFeeOnTransferTokensTx = async(tx: SwapExactTokenForTokenTx) => {
    try {
        console.log("SWAP EXACT TOKENS FOR TOKENS")
        console.log("//////////////////////////////////////")
        console.log("Amount in: " + tx.amountIn.toExact())
        console.log("Amount out min: " + tx.amountOutMin.toExact())
        console.log("Path: " + tx.path)
        console.log("To: " + tx.to)
        console.log("Deadline: " +  tx.deadline)
        console.log("//////////////////////////////////////")
    
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

        tx.dispatch({type: "EMPTY_INPUT"})
    
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

//////////////////////////////////////////////////////////////////////////////////////

export interface ISwapExactETHForTokensTx {
    router2: ethers.Contract | undefined,
    provider: any,
    amountIn: CurrencyAmount,
    amountOutMin: CurrencyAmount,
    path: string[],
    to: string,
    deadline: string,
    toast: any,
    dispatch: (state: {}, action?: Object | undefined) => void,
}

export const swapExactETHForTokensSupportingFeeOnTransferTokensTx = async(tx: ISwapExactETHForTokensTx) => {
    try {
        console.log("SWAP EXACT MATIC FOR TOKENS")
        console.log("//////////////////////////////////////")
        console.log("Amount in: " + tx.amountIn.toExact())
        console.log("Amount out min: " + tx.amountOutMin.toExact())
        console.log("Path: " + tx.path)
        console.log("To: " + tx.to)
        console.log("Deadline: " +  tx.deadline)
        console.log("//////////////////////////////////////")

        //Estimation of the gas cost
        const gas = await tx.router2?.estimateGas.swapExactETHForTokensSupportingFeeOnTransferTokens(
            tx.amountOutMin.raw.toString(),
            tx.path,
            tx.to,
            tx.deadline,
            {value: tx.amountIn.raw.toString()}
        )
        //const feeData = await tx.provider.getFeeData() 
    
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.router2?.swapExactETHForTokensSupportingFeeOnTransferTokens(
            tx.amountOutMin.raw.toString(),
            tx.path!,
            tx.to,
            tx.deadline,
            {gasLimit: gas, value: tx.amountIn.raw.toString()}
        )

        tx.dispatch({type: "EMPTY_INPUT"})
    
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
            description: `MATIC swapped successfully !`,
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
            description: `Swap exact MATIC for tokens: ${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////


interface SwapExactTokenForETHTx {
    router2: ethers.Contract | undefined,
    provider: any,
    amountIn: CurrencyAmount,
    amountOutMin: CurrencyAmount,
    path: string[],
    to: string,
    deadline: string,
    toast: any,
    dispatch: (state: {}, action?: Object | undefined) => void,
}

export const swapExactTokensForETHSupportingFeeOnTransferTokensTx = async(tx: SwapExactTokenForETHTx) => {
    try {
        console.log("SWAP EXACT TOKEN FOR MATIC")
        console.log("//////////////////////////////////////")
        console.log("Amount in: " + tx.amountIn.toExact())
        console.log("Amount out min: " + tx.amountOutMin.toExact())
        console.log("Path: " + tx.path)
        console.log("To: " + tx.to)
        console.log("Deadline: " +  tx.deadline)
        console.log("//////////////////////////////////////")

        //Estimation of the gas cost
        const gas = await tx.router2?.estimateGas.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tx.amountIn.raw.toString(),
            tx.amountOutMin.raw.toString(),
            tx.path,
            tx.to,
            tx.deadline,
        ) 
        const feeData = await tx.provider.getFeeData()
        console.log(feeData.gasPrice)

        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.router2?.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tx.amountIn.raw.toString(),
            tx.amountOutMin.raw.toString(),
            tx.path,
            tx.to,
            tx.deadline,
            {...feeData, gasLimit: gas}
        )

        tx.dispatch({type: "EMPTY_INPUT"})
    
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
            description: `token swapped successfully !`,
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
            description: `Swap exact token for MATIC: ${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
}