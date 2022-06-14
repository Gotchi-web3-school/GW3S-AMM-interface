import { TokenAmount, Percent, JSBI } from "quickswap-sdk"
import { ethers } from "ethers";
import { GlobalConst } from "../../Constants";
import { calculateSlippageAmount } from "../utils";

interface RemoveLiquidityTx {
    router2: ethers.Contract | undefined,
    liquidityAmount: TokenAmount,
    amountAOut: TokenAmount,
    amountBOut: TokenAmount,
    userAddress: string,
    toast: any,
}

export const removeLiquidityTx = async(tx: RemoveLiquidityTx, provider: any): Promise<any> => {
    try {
        const slippage = new Percent(JSBI.BigInt(GlobalConst.utils.INITIAL_ALLOWED_SLIPPAGE), "10000")
        const liquidity = tx.liquidityAmount
        const amountAMin = calculateSlippageAmount(tx.amountAOut, slippage)
        const amountBMin = calculateSlippageAmount(tx.amountBOut, slippage)
        const deadline = await provider.getBlock().then((result: any) => ethers.BigNumber.from(result.timestamp + GlobalConst.utils.DEFAULT_DEADLINE_FROM_NOW * 10 ))
    
        console.log("token A: " + tx.amountAOut.token.symbol + " " + tx.amountAOut.token.address)
        console.log("token B: " + tx.amountBOut.token.symbol + " " + tx.amountBOut.token.address)
        console.log("LP token: " + liquidity.token.symbol + " " + liquidity.token.address)
        console.log("amount A out: " + tx.amountAOut.toExact())
        console.log("amount B out: " + tx.amountAOut.toExact())
        console.log("minimum amount A: " +  ethers.utils.parseEther(amountAMin[0]))
        console.log("minimum amount B: " +  ethers.utils.parseEther(amountBMin[0]))
        console.log("userAddress address: " + tx.userAddress)
        console.log("deadline: " + deadline)
    
        //Estimation of the gas cost
        const gas = await tx.router2?.estimateGas.addLiquidity(
            tx.amountAOut.token.address,
            tx.amountBOut.token.address,
            liquidity.quotient.toString(),
            ethers.utils.parseEther(amountAMin[0]),
            ethers.utils.parseEther(amountBMin[0]),
            tx.userAddress,
            deadline,
        ) 
    
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.router2?.addLiquidity(
            tx.amountAOut.token.address,
            tx.amountBOut.token.address,
            liquidity.quotient.toString(),
            ethers.utils.parseEther(amountAMin[0]),
            ethers.utils.parseEther(amountBMin[0]),
            tx.userAddress,
            deadline,
            {gasLimit: gas}
        )
    
        tx.toast({
            title: `Add liquidity: ${tx.amountAOut.token.symbol} + ${tx.amountBOut.token.symbol}`,
            description: `transaction pending at: ${transaction.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Add liquidity: ${tx.amountAOut.token.symbol} + ${tx.amountBOut.token.symbol}`,
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
            description: `Add Liquidity: ${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
}

export const isSufficientLPBalance = (input: TokenAmount, balance: TokenAmount): boolean => {
    return parseInt(input.toExact()) <= parseInt(balance.toExact())
}