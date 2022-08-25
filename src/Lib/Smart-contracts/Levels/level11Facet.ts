import { ethers } from "ethers";
import { CompleteTx, InitTx, ClaimTx } from "../../../Models/index"
import { Reward } from "../../../Models";
import { fetchLootsMetadatas } from "../Rewards";
import { TokenList, level11List } from "../../../Constants/list";
import { Pool } from "../../../Models/index";
import { interfaces } from "../../../Constants/interfaces";
import { Token, CurrencyAmount } from "gotchiw3s-sdk";

export const start_l11 = async(tx: InitTx) => {
    try {    
        console.warn("INIT")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 11)
        console.log("///////////////////////////////////////////////")

    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.initLevel11() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.initLevel11()
    
        tx.toast({
            title: `Init level 11`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Init level 11`,
            description: `level initiated successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "INIT", payload: 11})

    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Init level 11.',
            description: `${error.message}`,
            status: 'error',
            duration: 6000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}

export const completeL11 = async(tx: CompleteTx) => {
    try {    
        console.warn("COMPLETE")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 11)
        console.log("///////////////////////////////////////////////")
        //Estimation of the gas cost
        console.log(tx.Facet)
        const gas = await tx.Facet?.estimateGas.completeL11()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.completeL11()
        
        tx.toast({
            title: `Complete level 11`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
        })
        
        const receipt = await transaction.wait()
        
        tx.toast({
            title: `Complete level 11`,
            description: `Level completed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
            console.log(receipt)

            const hasCompleted = await tx.LoupeFacet?.hasCompletedLevel(tx.signer.account, 11)
            tx.dispatch({type: "COMPLETED", payload: hasCompleted})
            
        } catch (error: any) {
            console.log(error)
            tx.toast({
                position: "bottom-right",
                title: 'Complete level 11.',
                description: `${error.error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            throw new Error(error.error)
    }
}

export const openL11Chest = async(tx: ClaimTx): Promise<Array<Reward | undefined>> => {
    let rewards: Array<Reward | undefined> = []
    let loots, amounts

    try {   
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 11)
        console.log("///////////////////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.openL11Chest()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const chestOpenned = await tx.Facet?.callStatic.openL11Chest()
        const transaction = await tx.Facet?.openL11Chest()
    
        tx.toast({
            title: `Open chest level 11`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Open chest level 11`,
            description: `Reward claimed successfully`,
            position: "top-right",
            status: "success",
            duration: 9000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "CLAIM", payload: true})
        
        loots = chestOpenned.loots.filter((elem: any) => elem !== "0x0000000000000000000000000000000000000000")
        amounts = chestOpenned.amounts.filter((elem: any) => ethers.utils.formatEther(elem) !== '0.0')
        if (loots)
            rewards = await fetchLootsMetadatas({loots: loots, amounts: amounts}, tx.signer)
            
        return rewards
    } catch (error: any) {
        console.log(error)
        tx.toast({
            position: "bottom-right",
            title: 'Open chest level 11.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        throw new Error(error.error.message)
    }
}

export const fetchAMMState = async(signer: any, instanceAddress: string, factory: string): Promise<{
    initCode: string,
    list: TokenList[],
    pools: Pool[] 
} | undefined> => {

    let initCode = '';
    let list: TokenList[] = level11List
    let pools: Pool[] = []
    try {
        const LeveL11Instance = new ethers.Contract(instanceAddress, interfaces.ILevel11Instance, signer.library)
        const Factory = new ethers.Contract(factory, interfaces.IFactory, signer.library?.getSigner(signer.account) ?? signer.library)
    
        for(let i = 0; i < 2; i++)
            list[i].address = await LeveL11Instance.tokens(i)

        initCode = await Factory.getInitCodeHash()

        let tokenA = new Token( signer.chainId, list[0].address, 18, list[0].symbol, list[0].name)
        let tokenB = new Token( signer.chainId, list[1].address, 18, list[1].symbol, list[1].name)
        pools.push(new Pool(0, `${list[0].symbol} - ${list[1].symbol}`, tokenA, tokenB,  factory, initCode,  {tokenA: list[0].logoURI, tokenB: list[1].logoURI}))
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
    
    return {
        initCode: initCode,
        list: list,
        pools: pools
    }
}

export interface SwapTx {
    signer: any
    instanceAddress: string,
    amountIn: CurrencyAmount,
    amountOutMin: CurrencyAmount,
    path: string[],
    toast: any,
    dispatch: (state: {}, action?: Object | undefined) => void,
}

export const swap = async(tx: SwapTx) => {
    try {
        const LeveL11Instance = new ethers.Contract(tx.instanceAddress, interfaces.ILevel11Instance, tx.signer.library)

        console.log("SWAP EXACT TOKENS FOR TOKENS")
        console.log("//////////////////////////////////////")
        console.log("Amount in: " + tx.amountIn.toExact())
        console.log("Amount out min: " + tx.amountOutMin.toExact())
        console.log("Path: " + tx.path)
        console.log("//////////////////////////////////////")
    
        //Estimation of the gas cost
        const gas = await LeveL11Instance.estimateGas.swap(
            tx.amountIn.raw.toString(),
            tx.amountOutMin.raw.toString(),
            tx.path,
        ) 
    
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await LeveL11Instance.swap(
            tx.amountIn.raw.toString(),
            tx.amountOutMin.raw.toString(),
            tx.path,
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