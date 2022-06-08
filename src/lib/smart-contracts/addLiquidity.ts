import { Pair, TokenAmount, Percent, JSBI } from "quickswap-sdk";
import { ethers } from "ethers";
import { GlobalConst } from "../../Constants";
import { calculateSlippageAmount } from "../utils";

interface AddLiquidityTx {
    router2: ethers.Contract | undefined,
    pair: Pair | undefined,
    amount0: TokenAmount,
    amount1: TokenAmount,
    userAddress: string,
    toast: any,
}

export const addLiquidityTx = async(tx: AddLiquidityTx, provider: any) => {
    try {
        const slippage = new Percent(JSBI.BigInt(GlobalConst.utils.INITIAL_ALLOWED_SLIPPAGE), "10000")
        const amountA = tx.pair?.token0.equals(tx.amount0?.token) ? tx.amount0 : tx.amount1;
        const amountB =  tx.pair?.token1.equals(tx.amount0?.token) ? tx.amount0 : tx.amount1;
        const minAmount0 = calculateSlippageAmount(amountA, slippage)
        const minAmount1 = calculateSlippageAmount(amountB, slippage)
        const deadline = await provider.getBlock().then((result: any) => ethers.BigNumber.from(result.timestamp + GlobalConst.utils.DEFAULT_DEADLINE_FROM_NOW * 10 ))
    
        console.log("token A: " + tx.pair?.token0.address)
        console.log("token B: " + tx.pair?.token1.address)
        console.log("amount A: " + amountA.raw.toString())
        console.log("amount B: " + amountB.raw.toString())
        console.log("minimum amount A: " +  ethers.utils.parseEther(minAmount0[0]))
        console.log("minimum amount B: " +  ethers.utils.parseEther(minAmount1[0]))
        console.log("userAddress address: " + tx.userAddress)
        console.log("deadline: " + deadline)
    
        //Estimation of the gas cost
        const gas = await tx.router2?.estimateGas.addLiquidity(
            tx.pair?.token0.address,
            tx.pair?.token1.address,
            amountA.raw.toString(),
            amountB.raw.toString(),
            ethers.utils.parseEther(minAmount0[0]),
            ethers.utils.parseEther(minAmount1[0]),
            tx.userAddress,
            deadline,
        ) 
    
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.router2?.addLiquidity(
            tx.pair?.token0.address,
            tx.pair?.token1.address,
            amountA.raw.toString(),
            amountB.raw.toString(),
            ethers.utils.parseEther(minAmount0[0]),
            ethers.utils.parseEther(minAmount1[0]),
            tx.userAddress,
            deadline,
            {gasLimit: gas}
        )
    
        tx.toast({
            title: `Add liquidity: ${tx.amount0.token.symbol} + ${tx.amount1.token.symbol}`,
            description: `transaction pending at: ${transaction.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Add liquidity: ${tx.amount0.token.symbol} + ${tx.amount1.token.symbol}`,
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