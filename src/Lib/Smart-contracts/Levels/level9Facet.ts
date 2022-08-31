import { ethers } from "ethers";
import { Token } from "gotchiw3s-sdk";
import { CompleteTx, InitTx, ClaimTx } from "../../../Models/index"
import { Reward } from "../../../Models";
import { fetchLootsMetadatas } from "../Rewards";
import { TokenList, level9List } from "../../../Constants/list";
import { Pool } from "../../../Models/index";
import { interfaces } from "../../../Constants/interfaces";
import { IDeployErc20Tx } from "../../../Models/index";

export const start_l9 = async(tx: InitTx) => {
    try {    
        console.warn("INIT")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 9)
        console.log("///////////////////////////////////////////////")

    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.initLevel9() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.initLevel9()
    
        tx.toast({
            title: `Init level 9`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Init level 9`,
            description: `level initiated successfully`,
            position: "top-right",
            status: "success",
            duration: 9000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "INIT", payload: 9})

    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Init level 9.',
            description: `${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}

export const completeL9 = async(tx: CompleteTx) => {
    try {    
        console.warn("COMPLETE")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 9)
        console.log("///////////////////////////////////////////////")
        //Estimation of the gas cost
        console.log(tx.Facet)
        const gas = await tx.Facet?.estimateGas.completeL9()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.completeL9()
        
        tx.toast({
            title: `Complete level 9`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
        })
        
        const receipt = await transaction.wait()
        
        tx.toast({
            title: `Complete level 9`,
            description: `Level completed successfully`,
            position: "top-right",
            status: "success",
            duration: 9000,
            isClosable: true,
            })
            console.log(receipt)

            const hasCompleted = await tx.LoupeFacet?.hasCompletedLevel(tx.signer.account, 9)
            tx.dispatch({type: "COMPLETED", payload: hasCompleted})
            
        } catch (error: any) {
            console.log(error)
            tx.toast({
                position: "bottom-right",
                title: 'Complete level 9.',
                description: `${error.error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            throw new Error(error.error)
    }
}

export const openL9Chest = async(tx: ClaimTx): Promise<Array<Reward | undefined>> => {
    let rewards: Array<Reward | undefined> = []
    let loots, amounts

    try {   
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 9)
        console.log("///////////////////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.openL9Chest()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const chestOpenned = await tx.Facet?.callStatic.openL9Chest()
        const transaction = await tx.Facet?.openL9Chest()
    
        tx.toast({
            title: `Open chest level 9`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Open chest level 9`,
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
            title: 'Open chest level 9.',
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
    let list: TokenList[] = level9List
    let pools: Pool[] = []
    try {
        const LeveL9Instance = new ethers.Contract(instanceAddress, interfaces.ILevel9Instance, signer.library)
        const Factory = new ethers.Contract(factory, interfaces.IFactory, signer.library?.getSigner(signer.account) ?? signer.library)
    
        for(let i = 0; i < 1; i++)
            list[i].address = await LeveL9Instance.tokens(i)

        initCode = await Factory.getInitCodeHash()
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

export const deployErc20ByInstance = async(tx: IDeployErc20Tx, instanceAddress: string) => {
    try {
        console.warn("DEPLOY ERC20 WITH FIXED SUPPLY")
        console.log("//////////////////////////////////////////////////////////")
        console.log("Name: " + tx.name)
        console.log("Ticker: " + tx.ticker)
        console.log("Supply: " + tx.supply)
        console.log("To: " + tx.signer.account)
        console.log("//////////////////////////////////////////////////////////")
        
        const ILevel9Instance = new ethers.Contract(instanceAddress, interfaces.ILevel9Instance, tx.signer.library.getSigner(tx.signer.account))

        const tokenAddress = await ILevel9Instance.callStatic.deployTokenWithFixedSupply(tx.name, tx.ticker, tx.supply, tx.signer.account)
        const transaction = await ILevel9Instance.deployTokenWithFixedSupply(tx.name, tx.ticker, tx.supply, tx.signer.account)
    
        tx.toast({
            title: `Deploy token: ${tx.name}`,
            description: `transaction pending at: ${transaction.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Deploy token: ${tx.name}`,
            description: `Token deployed successfully !\ntoken address: ${transaction.address}`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
        })
        console.log(receipt)
        
        // Keep new token created in storage
        let tokens: Array<Token>
        try {
            tokens = JSON.parse(localStorage.getItem("tokens") ?? "")
        } catch (error) {
            tokens = []
        }
        tokens.unshift(new Token(80001, tokenAddress, 18, tx.ticker, tx.name))
        localStorage.setItem(`tokens`, JSON.stringify(tokens))
        tx.setUserTokens(tokens)

        tx.toast({
            title: `Deploy token: ${tx.name}`,
            description: `Token ${tx.ticker} added to your list.`,
            position: "bottom-left",
            status: "success",
            duration: 6000,
            isClosable: true,
        })
        
    } catch (error: any) {
        console.log(error)
        tx.toast({
            position: "bottom-right",
            title: 'An error occurred.',
            description: `Deploy token: ${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
            })
    }
}