import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { Text, Box, Stack, Spacer, Center, Button, Container, HStack, useToast } from "@chakra-ui/react"
import { ContractContext } from "../../Provider/ContractProvider"
import { LevelCard } from "../../Constants/levels"
import { LevelContext } from "../../Provider/LevelProvider"
import { fetchLevelState } from "../../Lib/Smart-contracts/Levels"
import { CompleteTx, InitTx } from "../../Models"
import { starts, completes } from "../../Lib/Smart-contracts/Levels"
import Ressource from "./Ressources"
import ChestLevel from "../Chests/ChestLevel"


const Card: React.FC<{level: LevelCard}> = ({level}) => {
    const { id } = useParams()
    const signer = useWeb3React()
    const toast = useToast()
    const {running} = useContext(LevelContext)
    const {LevelFacets, LevelLoupeFacet} = useContext(ContractContext)
    const { hasCompleted, dispatch} = useContext(LevelContext)

    const complete = () => {
        const tx: CompleteTx = {
            signer: signer,
            Facet: LevelFacets[parseInt(id!)],
            LoupeFacet: LevelLoupeFacet,
            toast: toast,
            dispatch: dispatch
        }
        completes[parseInt(id!)]!(tx)
    }

    const start = () => {
        const tx: InitTx = {
            Facet: LevelFacets[parseInt(id!)],
            toast: toast,
            dispatch: dispatch
        }
        starts[parseInt(id!)]!(tx)
    }

    const restart = () => {
        const tx: InitTx = {
            Facet: LevelFacets[parseInt(id!)],
            toast: toast,
            dispatch: dispatch
        }
        starts[parseInt(id!)]!(tx).then(() => {
            console.log("navigate")
            window.location.reload()
        })
    }

    useEffect(() => {
        try {
            fetchLevelState(LevelLoupeFacet!, signer, parseInt(id!)).then(result => {
                dispatch({type: "SET_LEVEL_STATE", payload: result})
            })
        } catch (error) {
            console.log(error)
        }
    }, [LevelLoupeFacet, signer, dispatch, id])
    

    return (
        <Box
        display={"flex"}
        height={"50vh"}
        minW="450px"
        maxW="28%"
        mt="5rem" 
        p="1rem"
        bg="rgba(0, 0, 0, 0.21)" 
        boxShadow="0px 0px 10px 7px #FFFFFF" 
        backdropFilter=" blur(15px)" 
        borderRadius="20px"
        overflow={"hidden"}
        >
            <Stack direction={"column"} w="100%">
                <Stack direction={"row"}>
                    <Text fontSize={"5xl"} fontWeight="bold">{level.id}</Text>
                    <Spacer />
                    <Container>
                        <Text textAlign="center" pl="5" fontSize={"3xl"} fontWeight="bold">{level.title}</Text>
                    </Container>
                    <Spacer />
                    <Ressource  title={level.learn.title} text={level.learn.text} extraRessources={level.ressources}/>
                </Stack>
                <Spacer />
                <Box textAlign={"center"}>{level.description}</Box>
                <Spacer />
                <Box marginX={"auto"} minH="5rem" background="rgba(153, 114, 193, 0.99)" border="3px solid #7F00FE" borderRadius="50px">
                    <Text ml="7" pt="1" fontSize={"xs"}>Things that might help</Text>
                    {level.help}
                </Box>
                {running === parseInt(id ?? '-1') ? 
                    <HStack>
                        <Button bg={hasCompleted ? "green.500" : ""} border="2px solid green" onClick={complete}>Complete</Button>
                        <Spacer />
                        <Button bg="orange.500" onClick={restart}>Restart</Button>
                        <Spacer />
                        <ChestLevel id={parseInt(id!)} />
                    </HStack>
                    :
                    <>
                        {id === '0'|| id === '1' ? '' :
                        <Center mt="4">
                            <Button bg="teal.500" _hover={{background: "teal.600"}} onClick={start}>Start Level</Button>
                        </Center>
                        }   
                    </>
                }
            </Stack>
        </Box>
    )
}

export default Card