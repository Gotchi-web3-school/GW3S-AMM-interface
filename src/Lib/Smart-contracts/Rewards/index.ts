import { ethers } from "ethers"
import { OpennedChest } from "../../../Models"

export interface Reward  {
    svg: {front: string, back: string},
    levelId: string,
    type: "unknown" | "level",
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
            const contract = new ethers.Contract(
                chest.loots[i], 
                ["function getMetadas() public view returns(Metadatas memory metadatas)"], 
                signer.library.getSigner(signer.account)
            )
            const result = await contract.getMetadas()
            returnArr.push({...result, quantity: chest.amounts[i]})
        } catch (error: any) {
            console.log(error.message)
            returnArr.push(undefined)
        }
    }

    console.log(returnArr)
    return returnArr
}