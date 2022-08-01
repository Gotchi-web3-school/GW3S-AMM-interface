import React from "react"
import { Text, Box } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { injected } from "../../Lib/Connectors/connectors"
import { switchNetwork } from "../../Lib/Connectors/connectors"


const ConnectorButtonL0: React.FC = () => {
    const signer = useWeb3React()

    return (
        <>
            {signer.active ? 
                <Box 
                as="button" 
                h="5Ovh" 
                w="50vh" 
                rounded="full" 
                bg="orange.500" 
                onClick={() => switchNetwork(window, 80001)}
                >
                    <Text fontWeight={"bold"} fontSize="5xl">Switch to mumbai network</Text>
                </Box> 
                : 
                <Box 
                as="button"
                position={"relative"}
                display="inline-block"
                boxShadow="0 1px 3px 0px rgba(#0F0F0F, .5)"
                inset="0 1px rgba(#FFF, .2)"
                border="1px solid #1F1F1F"
                borderRadius="3px"
                outline="none"
                bg="linear-gradient(#737373, #333333)"
                bgSize="auto 150%"
                h="5Ovh" 
                w="50vh" 
                rounded="full"
                onClick={() => {console.log("active"); signer.activate(injected)}}
                _hover={{
                    backgroundPosition: "0 50%",
                }}
                _active={{
                    color: "#000",
                    backgroundPosition: "0 50%",
                    background: "#333333",
                    boxShadow: "0 1px 1px rgba(white, .1)",
                    inset: "inset 0 2px 3px rgba(black, .5)",
                }}
                >
                    <Text  
                    fontWeight={"bold"} 
                    fontSize="5xl"
                    _before={{
                        color: "#111",
                        textShadow: "0 1px rgba(white, .1)"
                    }}
                    >Connect</Text>
                    
                </Box>
            }
        </>
    )
}

export default ConnectorButtonL0