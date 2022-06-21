import { useState, useEffect } from "react";
import { ethers } from "ethers"
import { TokenAmount, Token } from "gotchiw3s-sdk";
import { useWeb3React } from "@web3-react/core";
import { Text, Image, Spacer, Spinner } from "@chakra-ui/react"
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { fetchBalance } from "../../../../../Lib/Utils";

const TokenSelect: React.FC<{token: Token, img: string }> = ({ token, img }) => {
    const { account, library } = useWeb3React()
    const [balance, setBalance] = useState<TokenAmount | undefined>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (account) {
            setLoading(true)
            fetchBalance(token.address, account, library)
            .then(result => {setLoading(false); setBalance(new TokenAmount(token, ethers.utils.parseEther(result).toString()))})
        }
    }, [account, library, token])
    
    return (
        <>
            {img ? 
                <Image borderRadius='full' boxSize='30px' src={img} alt={token.name}/> : < QuestionOutlineIcon />
            }
            <Text pl="4">{token.symbol}</Text>
            <Spacer />
            {loading ? <Spinner /> : <Text>{balance?.toFixed(2)}</Text>}
        </>
    )
}

export default TokenSelect;