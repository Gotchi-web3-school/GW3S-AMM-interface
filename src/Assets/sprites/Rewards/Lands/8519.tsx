import { Box, Image} from "@chakra-ui/react"
const land = require("../../../general/8519.png")


/***********************************|
|              FRONT                |
|__________________________________*/
export const Front: React.FC<{name?: any, color?: any, size?: string}> = ({ name, color, size="300"}) => {
    return <Image src={land} boxSize={size} />
} 

/***********************************|
|               BACK                |
|__________________________________*/
export const Back: React.FC<{name?: any, color?: any, size?: string}> = ({ name, color, size="300"}) => {
  return <Image src={land} boxSize={size} />
} 

/***********************************|
|              HOVERING             |
|__________________________________*/
export const Hovering: React.FC<{size?: string}> = ({size = "300"}) => {
    return (
    <Box>
        <style>{`
            div {border-radius: 30px;}

            .flip-card {
            background-color: transparent;
            width: ${size}px;
            height: ${(parseInt(size) * 1.23).toString()}px;
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
                <Front size={size} />
            </div>

            {/*BACK CARD*/}
            <div className="flip-card-back">
                <Back size={size}/>
            </div>

        </div>
        </div>
    </Box>)
}

export const Spinning: React.FC<{size?: string}> = ({size = "300"}) => {
    return (
        <Box>
            <style>{`
                div {border-radius: 30px;}
    
                .flip-card {
                    background-color: transparent;
                    width: ${size}px;
                    height: ${(parseInt(size) * 1.23).toString()}px;
                    perspective: 2000px;
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
                transform: rotateY(180deg);
                }`
            }
            </style>
            <div className="flip-card">
            <div className="flip-card-inner">
    
                {/*FRONT CARD*/}
                <div className="flip-card-front">
                    <Front size={size} />
                </div>

                {/*BACK CARD*/}
                <div className="flip-card-back">
                    <Back size={size}/>
                </div>
    
            </div>
        </div>
    </Box>)
}