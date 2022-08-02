import { ethers } from "ethers"

export type LevelState = {
    running: BigInt,
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
        running: result[0],
        instanceAddress: result[1],
        hasCompleted: result[2],
        hasClaimed: result[3],
        factory: result[4],
        tokens: result[5]
    }
}