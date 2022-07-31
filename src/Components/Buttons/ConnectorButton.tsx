import React from "react"
import { Button, Box } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { injected } from "../../Lib/Connectors/connectors"
import { switchNetwork } from "../../Lib/Connectors/connectors"


const ConnectorButton: React.FC = () => {
    const signer = useWeb3React()

    return (
        <Box>
        {signer.active ? 
            <Button bg="orange.500" onClick={() => switchNetwork(window, 80001)}>Switch to mumbai</Button>
            : 
            <Button onClick={() => {console.log("active"); signer.activate(injected)}}>Connect</Button>}
        </Box>
    )
}

export default ConnectorButton