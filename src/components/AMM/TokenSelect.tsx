import { Text, Image, Spacer } from "@chakra-ui/react"
import { SelectToken } from "../../models";

const TokenSelect: React.FC<{token: SelectToken}> = ({ token }) => {
    return (
        <>
            <Image
            borderRadius='full'
            boxSize='30px'
            src={token.logoURI}
            alt={token.name}
            />
            <Text pl="4">{token.symbol}</Text>
            <Spacer />
            <Text>0</Text>
        </>
    )
}

export default TokenSelect;