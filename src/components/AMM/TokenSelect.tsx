import { Token } from "@uniswap/sdk";
import { Text, Image, Spacer } from "@chakra-ui/react"

const TokenSelect: React.FC<{token: Token, logo: string}> = (props) => {
    return (
        <>
            <Image
            borderRadius='full'
            boxSize='30px'
            src={props.logo}
            alt={props.token.name}
            />
            <Text pl="4">{props.token.symbol}</Text>
            <Spacer />
            <Text>0</Text>
        </>
    )
}

export default TokenSelect;