import { Level0Spinning, Level0Hovering, Level0Front, Level0Back } from "../Assets/sprites/Rewards/Levels/common/Level0"
import { Level1Spinning, Level1Hovering, Level1Front, Level1Back } from "../Assets/sprites/Rewards/Levels/common/Level1"
import { Level2Spinning, Level2Hovering, Level2Front, Level2Back } from "../Assets/sprites/Rewards/Levels/common/Level2"
import { Level3Spinning, Level3Hovering, Level3Front, Level3Back } from "../Assets/sprites/Rewards/Levels/common/Level3"
import { Level4Spinning, Level4Hovering, Level4Front, Level4Back } from "../Assets/sprites/Rewards/Levels/common/Level4"
import { Level5Spinning, Level5Hovering, Level5Front, Level5Back } from "../Assets/sprites/Rewards/Levels/common/Level5"
import { Level6Spinning, Level6Hovering, Level6Front, Level6Back } from "../Assets/sprites/Rewards/Levels/common/Level6"
import { Level7Spinning, Level7Hovering, Level7Front, Level7Back } from "../Assets/sprites/Rewards/Levels/common/Level7"
import { Level8Spinning, Level8Hovering, Level8Front, Level8Back } from "../Assets/sprites/Rewards/Levels/common/Level8"
import { Level9Spinning, Level9Hovering, Level9Front, Level9Back } from "../Assets/sprites/Rewards/Levels/common/Level9"
import { Level10Spinning, Level10Hovering, Level10Front, Level10Back } from "../Assets/sprites/Rewards/Levels/common/Level10"
import { UnknownSpinning, UnknownHovering, UnknownFront, UnknownBack } from "../Assets/sprites/Rewards/UnknownReward"
import { EscapeGotchi1Front, EscapeGotchi1Back, EscapeGotchi1Hovering, EscapeGotchi1Spinning } from "../Assets/sprites/Rewards/Escape/EscapeGotchi1"
import { Front, Back, Spinning, Hovering } from "../Assets/sprites/Rewards/Lands/8519"

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
    
    land: [{
        spinning: <Spinning />,
        hovering: <Hovering />,
        front: <Front />,
        back: <Back />
    }],
    escape: [{
        spinning: <EscapeGotchi1Spinning />,
        hovering: <EscapeGotchi1Hovering />,
        front: <EscapeGotchi1Front />,
        back: <EscapeGotchi1Back />
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
        },
        {
            spinning: <Level3Spinning />,
            hovering: <Level3Hovering />,
            front: <Level3Front />,
            back: <Level3Back />
        },
        {
            spinning: <Level4Spinning />,
            hovering: <Level4Hovering />,
            front: <Level4Front />,
            back: <Level4Back />
        },
        {
            spinning: <Level5Spinning />,
            hovering: <Level5Hovering />,
            front: <Level5Front />,
            back: <Level5Back />
        },
        {
            spinning: <Level6Spinning />,
            hovering: <Level6Hovering />,
            front: <Level6Front />,
            back: <Level6Back />
        },
        {
            spinning: <Level7Spinning />,
            hovering: <Level7Hovering />,
            front: <Level7Front />,
            back: <Level7Back />
        },
        {
            spinning: <Level8Spinning />,
            hovering: <Level8Hovering />,
            front: <Level8Front />,
            back: <Level8Back />
        },
        {
            spinning: <Level9Spinning />,
            hovering: <Level9Hovering />,
            front: <Level9Front />,
            back: <Level9Back />
        },
        {
            spinning: <Level10Spinning />,
            hovering: <Level10Hovering />,
            front: <Level10Front />,
            back: <Level10Back />
        },
        // {
        //     spinning: <Level2Spinning />,
        //     hovering: <Level2Hovering />,
        //     front: <Level2Front />,
        //     back: <Level2Back />
        // },
        // {
        //     spinning: <Level2Spinning />,
        //     hovering: <Level2Hovering />,
        //     front: <Level2Front />,
        //     back: <Level2Back />
        // },
        // {
        //     spinning: <Level2Spinning />,
        //     hovering: <Level2Hovering />,
        //     front: <Level2Front />,
        //     back: <Level2Back />
        // },
    ],
}