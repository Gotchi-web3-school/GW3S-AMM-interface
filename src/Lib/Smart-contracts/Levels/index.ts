import { openL0Chest } from "./level0Facet"
import { completeL1, openL1Chest } from "./level1Facet"
import { start_l2, completeL2, openL2Chest } from "./level2Facet"
import { start_l3, completeL3, openL3Chest } from "./level3Facet"
import { start_l4, completeL4, openL4Chest } from "./level4Facet"
import { start_l5, completeL5, openL5Chest } from "./level5Facet"
import { start_l6, completeL6, openL6Chest } from "./level6Facet"
import { CompleteTx, InitTx } from "../../../Models"
import { ContractContextType } from "../../../Provider/ContractProvider";

export const fetchLevelState = async(signer: any, contracts: ContractContextType, level: number): Promise<{
    running: number,
    instanceAddress: string,
    hasCompleted: boolean,
    hasClaimed: boolean,
    factories: string[],
    tokens: string[]
} | undefined> => {
    try {
        const {LevelLoupeFacet} = contracts
        const instanceAddress: string = await LevelLoupeFacet!.getLevelInstanceByAddress(signer.account, level)
        
        const running: BigInt = LevelLoupeFacet!.getRunningLevel(signer.account)
        const hasCompleted: boolean = LevelLoupeFacet!.hasCompletedLevel(signer.account, level)
        const hasClaimed: boolean = LevelLoupeFacet!.hasClaimedLevel(signer.account, level)
        const factory: string = LevelLoupeFacet!.getFactoryLevel(level, 0)
        const tokens: string[] = LevelLoupeFacet!.getTokensLevel(level)
        
        const result = await Promise.all([running, hasCompleted, hasClaimed, factory, tokens])
        return {
            running: parseInt(result[0].toString()),
            instanceAddress: instanceAddress,
            hasCompleted: result[1],
            hasClaimed: result[2],
            factories: [result[3]],
            tokens: result[4],
        }
        
    } catch (error: any) {
        console.log(error.message)
        throw new Error("REKT")
    }
}

export const opens = [
    openL0Chest,
    openL1Chest,
    openL2Chest,
    openL3Chest,
    openL4Chest,
    openL5Chest,
    openL6Chest,
]

export const completes: Array<undefined | ((tx: CompleteTx) => Promise<void>)> = [
    undefined,
    completeL1,
    completeL2,
    completeL3,
    completeL4,
    completeL5,
    completeL6,
]

export const starts: Array<undefined | ((tx: InitTx) => Promise<void>)> = [
    undefined,
    undefined,
    start_l2,
    start_l3,
    start_l4,
    start_l5,
    start_l6,
]