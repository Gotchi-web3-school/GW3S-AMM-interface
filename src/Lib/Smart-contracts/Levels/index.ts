import { openL0Chest } from "./level0Facet"
import { completeL1, openL1Chest } from "./level1Facet"
import { start_l2, completeL2, openL2Chest } from "./level2Facet"
import { start_l3, completeL3, openL3Chest } from "./level3Facet"
import { start_l4, completeL4, openL4Chest } from "./level4Facet"
import { start_l5, completeL5, openL5Chest } from "./level5Facet"
import { start_l6, completeL6, openL6Chest } from "./level6Facet"
import { start_l7, completeL7, openL7Chest } from "./level7Facet"
import { start_l8, completeL8, openL8Chest } from "./level8Facet"
import { start_l9, completeL9, openL9Chest, deployErc20ByInstance } from "./level9Facet"
import { start_l10, completeL10, openL10Chest } from "./level10Facet"
import { start_l11, completeL11, openL11Chest } from "./level11Facet"
import { start_l12, completeL12, openL12Chest } from "./level12Facet"
import { CompleteTx, InitTx } from "../../../Models"
import { ContractContextType } from "../../../Provider/ContractProvider";
import {EscapeGotchi1} from "../Events/escapeGotchi1" 

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

export const events = [
    EscapeGotchi1,
]

export const opens = [
    openL0Chest,
    openL1Chest,
    openL2Chest,
    openL3Chest,
    openL4Chest,
    openL5Chest,
    openL6Chest,
    openL7Chest,
    openL8Chest,
    openL9Chest,
    openL10Chest,
    openL11Chest,
    openL12Chest,
]

export const completes: Array<undefined | ((tx: CompleteTx) => Promise<void>)> = [
    undefined,
    completeL1,
    completeL2,
    completeL3,
    completeL4,
    completeL5,
    completeL6,
    completeL7,
    completeL8,
    completeL9,
    completeL10,
    completeL11,
    completeL12,
]

export const starts: Array<undefined | ((tx: InitTx) => Promise<void>)> = [
    undefined,
    undefined,
    start_l2,
    start_l3,
    start_l4,
    start_l5,
    start_l6,
    start_l7,
    start_l8,
    start_l9,
    start_l10,
    start_l11,
    start_l12,
]

export const deployErc20ByInstances = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    deployErc20ByInstance,
]