import { useContext, useState } from "react"
import { Token } from "quickswap-sdk";
import { useWeb3React } from "@web3-react/core";
import { Box, Stack, Button } from "@chakra-ui/react";
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider";
import { ContractContext } from "../../../Provider/ContractsProvider";
import { DEFAULT_TOKEN_LIST_URL } from "../../../Constants/list"
import { SelectToken } from "../../../Models";
import TokenSelect from "../TokenSelect"


const Pools: React.FC = () => {
    // const { active, activate } = useWeb3React();
    // const { pair, isApproved } = useContext(AddLiquidityContext);
    // const { ERC20 } = useContext(ContractContext);
    const [tokens] = useState<SelectToken[]>(DEFAULT_TOKEN_LIST_URL.tokens)
  
    
  
    return (
      <Box >
       <Stack >
            {DEFAULT_TOKEN_LIST_URL.tokens.map((token, key) => {
                return (
                    <Button 
                    py="2rem" borderRadius={"0"} 
                    bg="0" 
                    key={key} 
                    >
                    <TokenSelect token={new Token(token.chainId, token.address, token.decimals)} img={token.logoURI} />
                    </Button>
                )
                }
            )}
        </Stack>
      </Box>
    )
} 

export default Pools