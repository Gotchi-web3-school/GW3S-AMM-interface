import { Pair, TokenAmount, Percent, JSBI } from "gotchiw3s-sdk";
import { ethers } from "ethers";
import { GlobalConst } from "../../Constants";
import { calculateSlippageAmount } from "../utils";
import { TokenPool } from "../../Models";

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
    
        console.warn("ADD LIQUIDITY")
        console.log("///////////////////////////////////////////////")
        console.log("token A: " + tx.pair?.token0.address)
        console.log("token B: " + tx.pair?.token1.address)
        console.log("amount A: " + amountA.raw.toString())
        console.log("amount B: " + amountB.raw.toString())
        console.log("minimum amount A: " +  ethers.utils.parseEther(minAmount0[0]))
        console.log("minimum amount B: " +  ethers.utils.parseEther(minAmount1[0]))
        console.log("userAddress address: " + tx.userAddress)
        console.log("deadline: " + deadline)
        console.log("///////////////////////////////////////////////")
    
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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

interface AddLiquidityETHTx {
    router2: ethers.Contract,
    tokenA: TokenPool,
    tokenB: TokenPool,
    to: string,
    toast: any,
}

export const addLiquidityETH = async(tx: AddLiquidityETHTx, provider: any) => {
    try {
        const slippage = new Percent(JSBI.BigInt(GlobalConst.utils.INITIAL_ALLOWED_SLIPPAGE), "10000")
        const matic: TokenPool = GlobalConst.addresses.WMATIC === tx.tokenA.token.address ? tx.tokenA : tx.tokenB
        const token: TokenPool = GlobalConst.addresses.WMATIC === tx.tokenB.token.address ? tx.tokenA : tx.tokenB
        const minAmountToken = calculateSlippageAmount(token.inputAdd!, slippage)
        const minAmountEth = calculateSlippageAmount(matic.inputAdd! , slippage)
        const deadline = await provider.getBlock().then((result: any) => ethers.BigNumber.from(result.timestamp + GlobalConst.utils.DEFAULT_DEADLINE_FROM_NOW * 10 ))
        
        console.warn("ADD LIQUIDITY MATIC")
        console.log("///////////////////////////////////////////////")
        console.log("token: " + token.token.symbol)
        console.log("amount token desired: " + token.inputAdd?.toExact())
        console.log("amount MATIC desired: " + matic.inputAdd?.toExact())
        console.log("minimum amount token: " +  ethers.utils.parseEther(minAmountToken[0]))
        console.log("minimum amount MATIC: " +  ethers.utils.parseEther(minAmountEth[0]))
        console.log("userAddress address: " + tx.to)
        console.log("deadline: " + deadline)
        console.log("///////////////////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.router2?.estimateGas.addLiquidityETH(
            token.token.address,
            token.inputAdd?.raw.toString(),
            ethers.utils.parseEther(minAmountToken[0]),
            ethers.utils.parseEther(minAmountEth[0]),
            tx.to,
            deadline,
            {value: matic.inputAdd?.raw.toString()}
            ) 
            
            console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
            
            const transaction = await tx.router2?.addLiquidityETH(
                token.token.address,
                token.inputAdd?.raw.toString(),
                ethers.utils.parseEther(minAmountToken[0]),
                ethers.utils.parseEther(minAmountEth[0]),
                tx.to,
                deadline,
                {gasLimit: gas, value: matic.inputAdd?.raw.toString()}
                )
                
                tx.toast({
                    title: `Add liquidity: ${tx.tokenA.token.symbol} + ${tx.tokenB.token.symbol}`,
                    description: `transaction pending at: ${transaction.hash}`,
                    position: "top-right",
                    status: "warning",
                    isClosable: true,
                })
                
                const receipt = await transaction.wait()
                
                tx.toast({
                    title: `Add liquidity: ${tx.tokenA.token.symbol} + ${tx.tokenB.token.symbol}`,
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////