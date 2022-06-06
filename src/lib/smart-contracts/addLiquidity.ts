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
}

export const addLiquidityTx = async(tx: AddLiquidityTx, provider: any) => {
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
        console.log("minimum amount A: " + ethers.utils.parseEther(minAmount0[0].toString()).toString())
        console.log("minimum amount B: " + ethers.utils.parseEther(minAmount1[0].toString()).toString())
        console.log("userAddress address: " + tx.userAddress)
        console.log("deadline: " + deadline)

        // Estimation of the gas cost
        const gas = await tx.router2?.estimateGas.addLiquidity(
            tx.pair?.token0.address,
            tx.pair?.token1.address,
            amountA.raw.toString(),
            amountB.raw.toString(),
            ethers.utils.parseEther(minAmount0[0].toString()),
            ethers.utils.parseEther(minAmount1[0].toString()),
            tx.userAddress,
            deadline,
            {gasLimit: 3000000}
        ) 

        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + "MATIC"))
        
        const transaction = await tx.router2?.addLiquidity(
            tx.pair?.token0.address,
            tx.pair?.token1.address,
            amountA.raw.toString(),
            amountB.raw.toString(),
            ethers.utils.parseEther(minAmount0[0].toString()),
            ethers.utils.parseEther(minAmount1[0].toString()),
            tx.userAddress,
            deadline,
            {gasLimit: gas}
        )  
        const receipt = await transaction.wait()
        console.log(receipt)
}