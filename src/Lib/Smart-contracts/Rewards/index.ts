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

export const fetchLootsMetadatas = async(loots: OpennedChest, signer: any): Promise<Array<Reward | undefined>>  => {
    const promises = []
    const returnArr: Array<Reward> = []
    for (const loot of loots.addresses) {
        try {
            const contract = new ethers.Contract(
                loot, 
                "function getMetadas() public view returns(Metadatas memory metadatas)", 
                signer.library.getSigner(signer.account)
            )
            promises.push(contract.getMetadas())
        } catch (error: any) {
            console.log(error.message)
            promises.push(undefined)
        }
    }
    const result = await Promise.all(promises)
    result.map((elem, idx) => returnArr.push({...elem, quantity: loots.quantities[idx]}))

    return returnArr
}