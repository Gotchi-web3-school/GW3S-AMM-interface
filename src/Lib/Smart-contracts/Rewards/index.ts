import { ethers } from "ethers"
import { OpennedChest } from "../../../Models"
import { interfaces } from "../../../Constants/interfaces"

export interface Reward  {
    ticker: string,
    svg: {front: string, back: string},
    levelId: number,
    type_: "unknown" | "level",
    title: string,
    text: string,
    quantity: number
}

export const fetchLootsMetadatas = async(chest: OpennedChest, signer: any): Promise<Array<Reward | undefined>>  => {
    const returnArr: Array<Reward | undefined> = []

    console.log("chest",chest)
    // Get the metadatas of each loots in the chest
    for (let i = 0; i < chest.loots.length; i++) {
        try {
            const nft = new ethers.Contract(
                chest.loots[i], 
                interfaces.IERC721RewardLevel, 
                signer.library.getSigner(signer.account)
            )

            const result = await nft.getMetadas()
            const ticker = await nft.symbol()

            returnArr.push({...result,
                levelId: parseInt(result.levelId),  
                quantity: parseInt(chest.amounts[i].toString()),
                ticker: ticker
            })
        } catch (error: any) {
            console.log(error)
            returnArr.push(undefined)
        }
    }

    return returnArr
}