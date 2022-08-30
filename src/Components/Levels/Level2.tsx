import { useContext, useEffect, useReducer, useState } from "react";
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
import { level2Reducer } from "../../Reducers/level2Reducer";
import { useParams } from "react-router-dom";
const oceanSfx = require("../../Assets/sounds/oceanWave.mp3")

const shipKeyFrames = keyframes `
    from {transform: translateX(0)}
    to {transform: translateX(100rem)} 
`

const shipAnimation = `${shipKeyFrames} 5s linear forwards`

const defaultButtons = {
    KEK: {
        id: 0,
        name: "KEK",
        loading: false,
        approved: false,
    },
    ALPHA: {
        id: 1,
        name: "ALPHA",
        loading: false,
        approved: false,
    },
    FOMO: {
        id: 2,
        name: "FOMO",
        loading: false,
        approved: false,
    },
    FUD: {
        id: 3,
        name: "FUD",
        loading: false,
        approved: false,
    },
    SHIP: {loading: false, shipped: false},
}

const Level2: React.FC = () => {
    const {id} = useParams()
    const signer = useWeb3React();
    const toast = useToast();
    const {LevelLoupeFacet} = useContext(ContractContext);
    const {instanceAddress, tokens, dispatch, running} = useContext(LevelContext);
    const [play, {stop}] = useSound(oceanSfx, {volume: 0.6})
    const [shipped, setShipped] = useState(false);
    const [buttons, dispatchL2] = useReducer(level2Reducer, defaultButtons)
    const {KEK, ALPHA, FOMO, FUD, SHIP} = buttons

    // Approve one of the four tokens
    const approveTx = (e: any) => {
        const tx: ApproveTx = {
            signer: signer,
            tokenAddress: tokens[parseInt(e.target.id)],
            tokenName: e.target.name,
            instanceAddress: instanceAddress,
            toast: toast,
        }

        dispatchL2({type: "LOADING", payload: {token : e.target.name, isLoading: true}})
        
        approve(tx)
        .then(() =>  {
            dispatchL2({type: "APPROVED", payload: e.target.name})
            dispatchL2({type: "LOADING", payload: {token : e.target.name, isLoading: false}})
        })
        
    }

    const shipTx = (e: any) => {
        const tx: ShipTokensTx = {
            signer: signer,
            instanceAddress: instanceAddress,
            toast: toast
        }
        dispatchL2({type: "LOADING", payload: {token: e.target.name, isLoading: true}})
        shipTokensTx(tx).then(() => {
            play()
            setShipped(true)
            dispatchL2({type: "LOADING", payload: {token: e.target.name, isLoading: false}})
            setTimeout(stop, 7000)
        })
    }
    //console.log(buttons)
    // Fetch the state of the level
    useEffect(() => {
        try {
            if (signer.account && LevelLoupeFacet && parseInt(id ?? '-1') === 2) {
                console.log("fetch state")
                dispatchL2({type: "LOADING_ALL"})
                fetchLevel2State(signer, 2).then((result: Level2State) => {
                    dispatch({type: "SET_LEVEL_STATE", payload: result})
                    setShipped(result.shipped)
                    fetchApprovedL2Tokens(result.tokens, result.instanceAddress, signer)
                    .then(result => {
                        dispatchL2({type: "LOADING_ALL"})
                        dispatchL2({type: "INIT_APPROVED", payload: result})
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }, [LevelLoupeFacet, signer, dispatch, instanceAddress, id])

    return (
    <Box margin={"auto"} overflow="hidden" width={"100%"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />
           {running === 2 && 
                <Stack>
                    <Center>
                        <Box animation={shipped ? shipAnimation : ''} position={"relative"} >
                            <JohnAaveBoat size={"25rem"} />
                            <HStack position={"relative"} bottom="10rem" zIndex={1} ml="2rem">
                                {KEK.approved && <Kek size={"5rem"} />}
                                {ALPHA.approved && <Alpha size={"5rem"} />}
                                {FOMO.approved &&  <Fomo size={"5rem"} />}
                                {FUD.approved && <Fud size={"5rem"} />}
                            </HStack>
                        </Box>
                    </Center >
                    <HStack justifyContent={"space-between"} >
                        <Button id="0" name="KEK" isLoading={KEK.loading} bg={KEK.approved ? "green.300" : ""} onClick={approveTx}>Approve KEK</Button>
                        <Button id="1" name="ALPHA" isLoading={ALPHA.loading} bg={ALPHA.approved ? "green.300" : ""}  onClick={approveTx}>Approve ALPHA</Button>
                        <Button id="2" name="FOMO" isLoading={FOMO.loading} bg={FOMO.approved ? "green.300" : ""}  onClick={approveTx}>Approve FOMO</Button>
                        <Button id="3" name="FUD" isLoading={FUD.loading} bg={FUD.approved ? "green.300" : ""}  onClick={approveTx}>Approve FUD</Button>
                    </HStack>
                    <Button
                    name="SHIP"
                    bg={shipped ? "green.300" : "whiteAlpha.500"}
                    isLoading={SHIP.loading}
                    disabled={!KEK.approved || !ALPHA.approved || !FOMO.approved || !FUD.approved} 
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