import { TokenAmount, Percent, JSBI, Pair } from "gotchiw3s-sdk"
import { ethers } from "ethers";
import { GlobalConst } from "../../Constants";
import { calculateSlippageAmount } from "../Utils";
import { LPTokenPool, TokenPool } from "../../Models";

interface RemoveLiquidityTx {
    router2: ethers.Contract,
    liquidityAmount: TokenAmount,
    pair: Pair,
    amountAOut: TokenAmount,
    amountBOut: TokenAmount,
    userAddress: string,
    toast: any,
}

export const removeLiquidityTx = async(tx: RemoveLiquidityTx, provider: any): Promise<any> => {
    try {
        const slippage = new Percent(JSBI.BigInt(GlobalConst.utils.INITIAL_ALLOWED_SLIPPAGE), "10000")
        const liquidity = tx.liquidityAmount
        const amountA = tx.pair.token0.equals(tx.amountAOut.token) ? tx.amountAOut : tx.amountBOut;
        const amountB =  tx.pair.token1.equals(tx.amountAOut.token) ? tx.amountAOut : tx.amountBOut;
        const amountAMin = calculateSlippageAmount(amountA, slippage)
        const amountBMin = calculateSlippageAmount(amountB, slippage)
        const deadline = await provider.getBlock().then((result: any) => ethers.BigNumber.from(result.timestamp + GlobalConst.utils.DEFAULT_DEADLINE_FROM_NOW * 10 ))
        
        console.log("REMOVE LIQUIDITY")
        console.log("/////////////////////////")
        console.log("token A: " + amountA.token.symbol + " " + amountA.token.address)
        console.log("token B: " + amountB.token.symbol + " " + amountB.token.address)
        console.log("LP token: " + liquidity.token.symbol + " " + liquidity.token.address)
        console.log("LP token amount: " + ethers.utils.parseEther(liquidity.toExact()))
        console.log("minimum amount A: " +  ethers.utils.parseEther(amountAMin[0]))
        console.log("minimum amount B: " +  ethers.utils.parseEther(amountBMin[0]))
        console.log("userAddress address: " + tx.userAddress)
        console.log("deadline: " + deadline)
        console.log("/////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.router2.estimateGas.removeLiquidity(
            amountA.token.address,
            amountB.token.address,
            ethers.utils.parseEther(liquidity.toExact()),
            ethers.utils.parseEther(amountAMin[0]),
            ethers.utils.parseEther(amountBMin[0]),
            tx.userAddress,
            deadline,
        ) 
    
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.router2.removeLiquidity(
            amountA.token.address,
            amountB.token.address,
            ethers.utils.parseEther(liquidity.toExact()),
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

interface RemoveLiquidityETHTx {
    router2: ethers.Contract,
    lp: LPTokenPool,
    tokenA: TokenPool
    tokenB: TokenPool
    to: string,
    toast: any,
}

export const removeLiquidityETHTx = async(tx: RemoveLiquidityETHTx, provider: any): Promise<any> => {
    try {
        const slippage = new Percent(JSBI.BigInt(GlobalConst.utils.INITIAL_ALLOWED_SLIPPAGE), "10000")
        const liquidity = tx.lp
        const token: TokenPool = GlobalConst.addresses.WMATIC === tx.tokenB.token.address ? tx.tokenA : tx.tokenB
        const matic: TokenPool = GlobalConst.addresses.WMATIC === tx.tokenA.token.address ? tx.tokenA : tx.tokenB
        const minAmountToken = calculateSlippageAmount(token.inputRemove!, slippage)
        const minAmountMatic = calculateSlippageAmount(matic.inputRemove!, slippage)
        const deadline = await provider.getBlock().then((result: any) => ethers.BigNumber.from(result.timestamp + GlobalConst.utils.DEFAULT_DEADLINE_FROM_NOW * 10 ))
        
        console.log("REMOVE LIQUIDITY ETH")
        console.log("////////////////////////////////")
        console.log("token: " + token.token.symbol + " " + token.token.address)
        console.log("LP token: " + liquidity.token!.symbol + " " + liquidity.token!.address)
        console.log("LP token amount: " + ethers.utils.parseEther(liquidity.lpRemoveInput!.toExact()))
        console.log("minimum amount token: " +  ethers.utils.parseEther(minAmountToken[0]))
        console.log("minimum amount Matic: " +  ethers.utils.parseEther(minAmountMatic[0]))
        console.log("userAddress address: " + tx.to)
        console.log("deadline: " + deadline)
        console.log("/////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.router2.estimateGas.removeLiquidityETH(
            token.token.address,
            liquidity.lpRemoveInput!.raw.toString(),
            ethers.utils.parseEther(minAmountToken[0]),
            ethers.utils.parseEther(minAmountMatic[0]),
            tx.to,
            deadline,
        ) 
    
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.router2.removeLiquidityETH(
            token.token.address,
            liquidity.lpRemoveInput!.raw.toString(),
            ethers.utils.parseEther(minAmountToken[0]),
            ethers.utils.parseEther(minAmountMatic[0]),
            tx.to,
            deadline,
            {gasLimit: gas}
        )
    
        tx.toast({
            title: `Remove liquidity: ${tx.tokenA.token.symbol} + ${tx.tokenB.token.symbol}`,
            description: `transaction pending at: ${transaction.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Remove liquidity: ${tx.tokenA.token.symbol} + ${tx.tokenB.token.symbol}`,
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

