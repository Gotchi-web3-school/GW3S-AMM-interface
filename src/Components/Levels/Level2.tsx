import { useContext, useEffect, useState } from "react";
import {Box, Stack, Spacer, HStack, Button, Center, useToast, keyframes} from "@chakra-ui/react"
import useSound from 'use-sound';
import { LevelContext } from "../../Provider/LevelProvider";
import { levels } from "../../Constants/levels"
import { ApproveTx } from "../../Models";
import { approve, fetchApprovedL2Tokens, fetchLevel2State, Level2State, ShipTokensTx, shipTokensTx } from "../../Lib/Smart-contracts/Levels/level2Facet";
import Card from "./Card"
import { useWeb3React } from "@web3-react/core";
import { ContractContext } from "../../Provider/ContractProvider";
import Kek from "../../Assets/sprites/Kek";
import Alpha from "../../Assets/sprites/Alpha";
import Fomo from "../../Assets/sprites/Fomo";
import Fud from "../../Assets/sprites/Fud";
import JohnAaveBoat from "../../Assets/sprites/JohnAaveBoat";
const oceanSfx = require("../../Assets/sounds/oceanWave.mp3")

const shipKeyFrames = keyframes `
    from {transform: translateX(0)}
    to {transform: translateX(100rem)} 
`

const shipAnimation = `${shipKeyFrames} 5s linear forwards`

const Level2: React.FC = () => {
    const signer = useWeb3React();
    const {LevelLoupeFacet} = useContext(ContractContext);
    const {instanceAddress, tokens, dispatch, running} = useContext(LevelContext);
    const [play, {stop}] = useSound(oceanSfx, {volume: 0.6})
    const toast = useToast();
    const [shipped, setShipped] = useState(false);
    const [loading, setLoading] = useState({KEK: false, ALPHA: false, FOMO: false, FUD: false});
    //const [loadingKEK, setLoadingKEK] = useState(false)
    const [approved, setApproved] = useState({KEK: false, ALPHA: false, FOMO: false, FUD: false});

    // Approve one of the four tokens
    const approveTx = (e: any) => {
        e.preventDefault();
        const tx: ApproveTx = {
            signer: signer,
            tokenAddress: tokens[parseInt(e.target.id)],
            tokenName: e.target.name,
            instanceAddress: instanceAddress,
            toast: toast,
        }

        setLoading({...loading, [`${e.target.name}`]: true})
        console.log(loading)
        
        approve(tx)
        .then(() => setApproved({...approved, [`${e.target.name}`]: true}))
        
        setLoading({...loading, [`${e.target.name}`]: false})
    }

    const shipTx = () => {
        const tx: ShipTokensTx = {
            signer: signer,
            instanceAddress: instanceAddress,
            toast: toast
        }
        shipTokensTx(tx).then(() => {
            play()
            setShipped(true)
            setTimeout(stop, 7000)
        })
    }

    // Fetch the state of the level
    useEffect(() => {
        try {
            if (signer.account && LevelLoupeFacet) {
                setLoading({KEK: true, ALPHA: true, FOMO: true, FUD: true})
                fetchLevel2State(signer, 2).then((result: Level2State) => {
                    dispatch({type: "SET_LEVEL_STATE", payload: result})
                    setShipped(result.shipped)
                    fetchApprovedL2Tokens(result.tokens, instanceAddress, signer)
                    .then(result => {
                        setLoading({KEK: false, ALPHA: false, FOMO: false, FUD: false})
                        setApproved(result)
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }, [LevelLoupeFacet, signer, dispatch, instanceAddress, running])

    return (
    <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />
           {running === 2 && 
                <Stack>
                    <Center>
                        <Box animation={shipped ? shipAnimation : ''} position={"relative"}>
                            <JohnAaveBoat size={"25rem"} />
                            <HStack position={"relative"} bottom="10rem" zIndex={1} ml="2rem">
                                {approved.KEK && <Kek size={"5rem"} />}
                                {approved.ALPHA && <Alpha size={"5rem"} />}
                                {approved.FOMO &&  <Fomo size={"5rem"} />}
                                {approved.FUD && <Fud size={"5rem"} />}
                            </HStack>
                        </Box>
                    </Center >
                    <HStack justifyContent={"space-between"} >
                        <Button id="0" name="KEK" isLoading={loading.KEK} bg={approved.KEK ? "green.300" : ""} onClick={approveTx}>Approve KEK</Button>
                        <Button id="1" name="ALPHA" isLoading={loading.ALPHA} bg={approved.ALPHA ? "green.300" : ""} onClick={approveTx}>Approve ALPHA</Button>
                        <Button id="2" name="FOMO" isLoading={loading.FOMO} bg={approved.FOMO ? "green.300" : ""} onClick={approveTx}>Approve FOMO</Button>
                        <Button id="3" name="FUD" isLoading={loading.FUD} bg={approved.FUD ? "green.300" : ""} onClick={approveTx}>Approve FUD</Button>
                    </HStack>
                    <Button
                    bg={shipped ? "green.300" : "whiteAlpha.500"}
                    // disabled={!approved.KEK || !approved.ALPHA || !approved.FOMO || !approved.FUD} 
                    onClick={shipTx}>
                        Ship alchemicas
                    </Button>
                </Stack>
            }
            <Spacer />
            <Card level={levels[2]}/>
        </Stack>
    </Box>
    )
}

export default Level2