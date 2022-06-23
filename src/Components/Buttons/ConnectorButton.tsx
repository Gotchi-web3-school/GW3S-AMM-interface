import React, { useState, useEffect } from "react"
import { Button, Box } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { injected } from "../../Lib/Connectors/connectors"
import { switchNetwork } from "../../Lib/Connectors/connectors"


const ConnectorButton: React.FC<{children: React.ReactNode}> = ({children}) => {
    const signer = useWeb3React()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then(result => setIsAuthorized(result))
    },[])

    return (
        <Box justifyContent={"center"}>
        {isAuthorized ? 
            <Box justifyContent={"center"}>
                {signer.chainId === 80001 ?
                    children 
                    : 
                    <Button bg="orange.500" onClick={() => switchNetwork(window, 80001)}>Switch to mumbai</Button>
                }
            </Box>
        : 
        <Button onClick={() => signer.activate(injected)}>Connect</Button>}
        </Box>
    )
}

export default ConnectorButton