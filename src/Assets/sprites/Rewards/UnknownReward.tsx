import { Box, Image } from "@chakra-ui/react"
const front = require("./Unknown front.png");
const back = require("./Unknown back.png");

/***********************************|
|              FRONT                |
|__________________________________*/
export const UnknownFront: React.FC<{size?: string}> = ({size="300"}) => {
    return (
    <Box>
        <style>
        {`
            @keyframes spin {
            from {
                transform: rotateY(0deg);
            }
            to {
                transform: rotateY(360deg);
            }
        `}
        </style>
        <Image className="spin" boxSize={size} src={front} />

    </Box>
        )
} 

/***********************************|
|               BACK                |
|__________________________________*/
export const UnknownBack: React.FC<{size?: string}> = ({size="300"}) => {
    return (
        <Box>
            <Image boxSize={size} src={back} />
        </Box>
        )
} 

/***********************************|
|              HOVERING             |
|__________________________________*/
export const UnknownHovering: React.FC<{size?: string}> = ({size = "300"}) => {
    return (
    <Box>
        <style>{`

            .flip-card {
            background-color: transparent;

            perspective: 1000px;
            }

            .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            }

            .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
            }

            .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            }

            .flip-card-front {
            color: black;
            }

            .flip-card-back {
            transform: rotateY(180deg);
            }`
        }
        </style>
        <div className="flip-card">
        <div className="flip-card-inner">

            {/*FRONT CARD*/}
            <div className="flip-card-front">
                <UnknownFront size={size} />
            </div>

            {/*BACK CARD*/}
            <div className="flip-card-back">
                <UnknownBack size={size} />
            </div>

        </div>
        </div>
    </Box>)
}

export const UnknownSpinning: React.FC<{size?: string}> = ({size = "300"}) => {
    return (
        <Box>
            <style>{`
                .flip-card {
                    background-color: transparent;
                    width: 300px;
                    height: 300px;
                    perspective: 1000px;
                  }
                  
                  .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.6s;
                    transform-style: preserve-3d;
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                  }
                  
                  .flip-card .flip-card-inner {
                    animation-name: spin;
                    animation-duration:10s;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                  }
                  
                  .flip-card-front, .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                  }
                  
                  .flip-card-front {
                    color: black;
                  }
                  
                  .flip-card-back {
                    color: white;
                    transform: rotateY(180deg)
                    `
            }
            </style>
            <div className="flip-card">
            <div className="flip-card-inner">
    
                {/*FRONT CARD*/}
                <div className="flip-card-front">
                    <UnknownFront size={size} />
                </div>
    
                {/*BACK CARD*/}
                <div className="flip-card-back">
                    <UnknownBack size={size} />
                </div>
    
            </div>
        </div>
    </Box>)
}