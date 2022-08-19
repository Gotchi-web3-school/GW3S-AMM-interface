import { Level0Spinning, Level0Hovering, Level0Front, Level0Back } from "../Assets/sprites/Rewards/Levels/common/Level0"
import { Level1Spinning, Level1Hovering, Level1Front, Level1Back } from "../Assets/sprites/Rewards/Levels/common/Level1"
import { Level2Spinning, Level2Hovering, Level2Front, Level2Back } from "../Assets/sprites/Rewards/Levels/common/Level2"
import { UnknownSpinning, UnknownHovering, UnknownFront, UnknownBack } from "../Assets/sprites/Rewards/UnknownReward"

// to find the appropriate card reward to display in any chest you must call for the metadatas of the NFT reward.
// 1: first indicate the type
// 2: second indicate his id 
// example: chests[type][id]
export const chests = {
    unknown: [{
        spinning: <UnknownSpinning />,
        hovering: <UnknownHovering />,
        front: <UnknownFront />,
        back: <UnknownBack />
    }],
    level: [
        {
            spinning: <Level0Spinning />,
            hovering: <Level0Hovering />,
            front: <Level0Front />,
            back: <Level0Back />
        },
        {
            spinning: <Level1Spinning />,
            hovering: <Level1Hovering />,
            front: <Level1Front />,
            back: <Level1Back />
        },
        {
            spinning: <Level2Spinning />,
            hovering: <Level2Hovering />,
            front: <Level2Front />,
            back: <Level2Back />
        }
    ],
}