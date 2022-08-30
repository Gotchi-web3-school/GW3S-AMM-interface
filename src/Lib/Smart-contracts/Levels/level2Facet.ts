import { ethers } from "ethers";
import { CompleteTx, ClaimTx, InitTx, ApproveTx } from "../../../Models/index"
import { interfaces } from "../../../Constants/interfaces"
import { GlobalConst, DIAMOND_ADDRESS } from "../../../Constants";
import { fetchApprovedToken } from "../../Utils";
import { fetchLootsMetadatas } from "../Rewards";
import { Reward } from "../Rewards";

const REQUIRED_ALLOWANCE = 10

type ApprovedL2Tokens = {
    KEK: boolean,
    ALPHA: boolean,
    FOMO: boolean,
    FUD: boolean,
}

export const start_l2 = async(tx: InitTx) => {
    try {    
        console.warn("INIT")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 2)
        console.log("///////////////////////////////////////////////")

    
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.initLevel2() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.initLevel2()
    
        tx.toast({
            title: `Init level 2`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Init level 2`,
            description: `level initiated successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

        tx.dispatch({type: "INIT", payload: 2})

    } catch (error: any) {
        console.log(error.error)
        tx.toast({
            position: "bottom-right",
            title: 'Init level 2.',
            description: `${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.error)
    }
}

export const completeL2 = async(tx: CompleteTx) => {
    try {    
        console.warn("COMPLETE")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 2)
        console.log("///////////////////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.completeL2() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await tx.Facet?.completeL2()
        
        tx.toast({
            title: `Complete level 2`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
        })
        
        const receipt = await transaction.wait()
        
        tx.toast({
            title: `Complete level 2`,
            description: `Level completed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
            console.log(receipt)

            const hasCompleted = await tx.LoupeFacet?.hasCompletedLevel(tx.signer.account, 2)
            tx.dispatch({type: "COMPLETED", payload: hasCompleted})
            
        } catch (error: any) {
            console.log(error.error)
            tx.toast({
                position: "bottom-right",
                title: 'Complete level 2.',
                description: `${error.error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            throw new Error(error.error)
    }
}

export const openL2Chest = async(tx: ClaimTx): Promise<Array<Reward | undefined>> => {
    let rewards: Array<Reward | undefined> = []
    let loots, amounts

    try {   
        console.warn("OPEN CHEST")
        console.log("///////////////////////////////////////////////")
        console.log("Level: " + 2)
        console.log("///////////////////////////////////////////////")
        
        //Estimation of the gas cost
        const gas = await tx.Facet?.estimateGas.openL2Chest()
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))

        const chestOpenned = await tx.Facet?.callStatic.openL2Chest()
        const transaction = await tx.Facet?.openL2Chest()
    
        tx.toast({
            title: `Open chest level 2`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        tx.toast({
            title: `Open chest level 2`,
            description: `Reward claimed successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
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
            title: 'Open chest level 2.',
            description: `${error.error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
        throw new Error(error.error.message)
    }
}

export const approve = async(tx: ApproveTx) => {
    const {signer, tokenAddress, tokenName, instanceAddress, toast} = tx
    try {    
        console.warn("APPROVE " + tokenName + "\noperator: " + instanceAddress +"\namount: " + GlobalConst.utils.MAX_INT)

        const token = new ethers.Contract(tokenAddress, interfaces.IToken, signer.library.getSigner(signer.account))
        
        //Estimation of the gas cost
        const gas = await token.estimateGas.approve(instanceAddress, GlobalConst.utils.MAX_INT) 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await token.approve(instanceAddress, GlobalConst.utils.MAX_INT)
    
        toast({
            title: `Approve ${tokenName}`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        toast({
            title: `Approve ${tokenName}`,
            description: `token approved successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)
        
    } catch (error: any) {
        console.log(error.message)
        toast({
            position: "bottom-right",
            title: `Approve ${tokenName}`,
            description: `${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.message)
    }
}

export interface ShipTokensTx {
    signer: any,
    instanceAddress: string,
    toast: any,
}

export const shipTokensTx = async(tx: ShipTokensTx) => {
    try {
        const {signer, instanceAddress, toast} = tx
        console.warn("SHIP ALCHEMICAS")

        const instance = new ethers.Contract(instanceAddress, interfaces.ILevel2Instance, signer.library.getSigner(signer.account))

        //Estimation of the gas cost
        const gas = await instance.estimateGas.shipTokens() 
        console.log("Gas cost: " + (ethers.utils.formatEther(gas?.toString() ?? "") + " MATIC"))
        
        const transaction = await instance.shipTokens()
    
        toast({
            title: `Ship tokens`,
            description: `transaction pending at: ${transaction?.hash}`,
            position: "top-right",
            status: "warning",
            isClosable: true,
            })
    
        const receipt = await transaction.wait()
    
        toast({
            title: `Ship tokens`,
            description: `tokens shipped successfully`,
            position: "top-right",
            status: "success",
            duration: 6000,
            isClosable: true,
            })
        console.log(receipt)

    } catch (error: any) {
        console.log(error.message)
        tx.toast({
            position: "bottom-right",
            title: `Ship tokens`,
            description: `${error.message}`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        throw new Error(error.message)
    }
}

export const fetchApprovedL2Tokens = async(tokens: string[], operator: string, signer: any): Promise<ApprovedL2Tokens> => {
    const promises = []

    for(let i = 0; i < 4; i++) {
        promises.push(fetchApprovedToken(tokens[i], REQUIRED_ALLOWANCE, operator, signer))
    }
    const result = await Promise.all(promises)

    return {
        KEK: result[0], 
        ALPHA: result[1], 
        FOMO: result[2], 
        FUD: result[3], 
    }
}

export interface Level2State {
    running: number,
    instanceAddress: string,
    hasCompleted: boolean,
    hasClaimed: boolean,
    factories: Array<string>
    factory: string,
    tokens: string[],
    shipped: boolean
}

export const fetchLevel2State = async(signer: any, id: number): Promise<Level2State> => {
    const LevelLoupeFacet = new ethers.Contract(DIAMOND_ADDRESS, interfaces.LevelLoupeFacet, signer.library)
    let tokens: string[] = []

    const instanceAddress: string = await LevelLoupeFacet!.getLevelInstanceByAddress(signer.account, id)
    const Level2Instance = new ethers.Contract(instanceAddress, interfaces.ILevel2Instance, signer.library)
    
    const running: BigInt = LevelLoupeFacet.getRunningLevel(signer.account)
    const hasCompleted: boolean = LevelLoupeFacet.hasCompletedLevel(signer.account, id)
    const hasClaimed: boolean = LevelLoupeFacet.hasClaimedLevel(signer.account, id)
    const factories: string = LevelLoupeFacet.getFactoryLevel(id, 0)
    const shipped: boolean = Level2Instance.shipped()
    for(let i = 0; i < 4; i++) (
        tokens.push(Level2Instance.tokens(i))
    )
    
    const result = await Promise.all([running, hasCompleted, hasClaimed, factories, Promise.all(tokens), shipped])

    return {
        running: parseInt(result[0].toString()),
        instanceAddress: instanceAddress,
        hasCompleted: result[1],
        hasClaimed: result[2],
        factories: [],
        factory: result[3],
        tokens: result[4],
        shipped: result[5]
    }
}