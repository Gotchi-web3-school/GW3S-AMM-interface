import { ethers } from "ethers"
import { openL0Chest } from "./level0Facet"
import { completeL1, openL1Chest } from "./level1Facet"
import { start_l2, completeL2, openL2Chest } from "./level2Facet"
import { CompleteTx, InitTx } from "../../../Models"

export type LevelState = {
    running: number,
    instanceAddress: string,
    hasCompleted: boolean,
    hasClaimed: boolean,
    factory: string,
    tokens: string[]
}

export const fetchLevelState = async(LevelLoupeFacet: ethers.Contract, signer: any, id: number): Promise<LevelState> => {
    const running: BigInt = LevelLoupeFacet!.getRunningLevel(signer.account)
    const instanceAddress: string = LevelLoupeFacet!.getLevelInstanceByAddress(signer.account, id)
    const hasCompleted: boolean = LevelLoupeFacet!.hasCompletedLevel(signer.account, id)
    const hasClaimed: boolean = LevelLoupeFacet!.hasClaimedLevel(signer.account, id)
    const factories: string = LevelLoupeFacet!.getFactoryLevel(id, 0)
    const tokens: string[] = LevelLoupeFacet!.getTokensLevel(id)

    const result = await Promise.all([running, instanceAddress, hasCompleted, hasClaimed, factories, tokens])

    return {
        running: parseInt(result[0].toString()),
        instanceAddress: result[1],
        hasCompleted: result[2],
        hasClaimed: result[3],
        factory: result[4],
        tokens: result[5]
    }
}

export const opens = [
    openL0Chest,
    openL1Chest,
    openL2Chest,
]

export const completes: Array<undefined | ((tx: CompleteTx) => Promise<void>)> = [
    undefined,
    completeL1,
    completeL2,
]

export const starts: Array<undefined | ((tx: InitTx) => Promise<void>)> = [
    undefined,
    undefined,
    start_l2,
]