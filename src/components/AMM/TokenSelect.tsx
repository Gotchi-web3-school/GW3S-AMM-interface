import { Text, Image, Spacer } from "@chakra-ui/react"
import { SelectToken } from "../../models";
import { QuestionOutlineIcon } from "@chakra-ui/icons"

const TokenSelect: React.FC<{token: SelectToken }> = ({ token }) => {
  
    return (
        <>
            {token.logoURI ? 
                <Image borderRadius='full' boxSize='30px' src={token.logoURI} alt={token.name}/> : < QuestionOutlineIcon />
            }
            <Text pl="4">{token.symbol}</Text>
            <Spacer />
            <Text>0</Text>
        </>
    )
}

export default TokenSelect;