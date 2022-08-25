import { Link, Image, Center, Text, Box, } from "@chakra-ui/react"
const metamask = require("../Assets/general/Metamask-face.png")
const polygonscan = require("../Assets/general/polygonscan.png")


export type LevelCard = {
    id: string,
    title: string,
    learn: {title: string, text: string | null},
    ressources: string[] | null,
    description: React.ReactElement<any>,
    help: React.ReactElement<any, any>,
}

export const levels: LevelCard[] = [
    {
        id: '0',
        title: "Landing",
        learn: {
            title: "Wallets",
            text: ""
        },
        ressources: [
            "https://beincrypto.com/learn/web3-wallet/", 
            "https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc"
        ],
        description: <Text>Connect your wallet.</Text>,
        help: 
        <Link color="blue.300" href="https://metamask.io/" isExternal>
            <Center>
                <Image boxSize={20} src={metamask}/>
            </Center>
        </Link>,
    },
    {
        id: '1',
        title: "May i have your signature ?",
        learn: {
            title: "Wallets",
            text: ""
        },
        ressources:["https://github.com/ethereumbook/ethereumbook/blob/develop/04keys-addresses.asciidoc#private-keys"],
        description: <Text>Sign a message with you wallet.</Text>,
        help: <></>,
    },
    {
        id: '2',
        title: "Approve",
        learn: {
            title: "",
            text: "As the tokens comes from a smart contract written in a virtual ledger securised by the blockchain the owner of a token need to “approve” an operator with a certain ammount in order to let him transfert your token to another address."
        },
        ressources: ["https://github.com/ethereumbook/ethereumbook/blob/develop/04keys-addresses.asciidoc#private-keys"],
        description: 
        <Box>
            <Text display={"inline-block"} mb="3" color={"teal.400"}>You are given 4 tokens, </Text> 
            <Text display={"inline-block"} color={"teal.400"} fontWeight={"bold"}>“FOMO”</Text>, 
            <Text display={"inline-block"} color={"teal.400"} fontWeight={"bold"}>“ALPHA”</Text>, 
            <Text display={"inline-block"} color={"teal.400"} fontWeight={"bold"}>“KEK”</Text>, 
            <Text display={"inline-block"} color={"teal.400"} fontWeight={"bold"}>“FUD”</Text>
            <Text>Approve them to John.gotchi in order to let him ship your tokens</Text>
        </Box>,
        help: <></>,
    },
    {
        id: '3',
        title: "Swap",
        learn: {
            title: "",
            text: "As the tokens comes from a smart contract written in a virtual ledger securised by the blockchain the owner of a token need to “approve” an operator with a certain ammount in order to let him transfert your token to another address."
        },
        ressources: null,
        description: 
        <Box>
            <Text display={"inline-block"} mb="3" color={"teal.400"}>Your are given 10 DAI</Text>
            <Text> swap them against GHST tokens</Text>
        </Box>,
        help: <></>,
    },
    {
        id: '4',
        title: "All roads lead to Rom..., GHST !",
        learn: {
            title: "",
            text: "Sometimes you will want to swap a token against another but unfortunately the pool didn't exist yet 😱. Good news most of the main swap exchange include an auto routing which find amongst many other pairs the most efficient route (up to 7 tokens swap for 1 transactions !). But right now you have to find yourself the right route :)"
        },
        ressources: null,
        description: 
        <Box>
            <Text display={"inline-block"} mb="3" color={"teal.400"}>Your are given 10 DAI</Text>
            <Text> swap them against GHST tokens</Text>
        </Box>,
        help: <Text px="5">Look at the “pools” tab in the AMM, there are interesting informations !</Text>,
    },
    {
        id: '5',
        title: "Catch me if you can",
        learn: {
            title: "Wallets",
            text: "One major key concept in the blockchain is that it is  100% transparent, yes ser you heard it you can see every single transactions that happenned since its creation ! Each blockchains/networks has its own “Ledger” and with it a “Block explorer” to naviguate through and find pertinent informations to the state of the ledger, you can find the Mumbai one here"
        },
        ressources: ["https://mumbai.polygonscan.com/"],
        description: 
        <Box>
            <Text display={"inline-block"} mb="3" color={"teal.400"}>You are given 1 CATCH token</Text>
            <Text>Find the address of this token</Text>
        </Box>,
        help: <Link target={"_blank"} href="https://mumbai.polygonscan.com/"><Image mt="1" width="40" src={polygonscan}/></Link>,
    },
    {
        id: '6',
        title: "Where is WalDAI ?",
        learn: {
            title: "Wallets",
            text: ""
        },
        ressources: ["Be careful some token can have the same name or same symbol but that does not mean they are the same ! The only true and unique identifier is his address."],
        description: 
        <Box>
            <Text display={"inline-block"} mb="3" color={"teal.400"}>You are given 10 GHST token</Text><br/>
            <Text display={"inline-block"} mb="3" color={"teal.400"}>You are given 0.001 DAI token</Text>
            <Text>Swap your GHST to finish the level with at least 1 DAI token</Text>
        </Box>,
        help: <Link target={"_blank"} href="https://mumbai.polygonscan.com/"><Image mt="1" width="40" src={polygonscan}/></Link>,
    },
    {
        id: '7',
        title: "Market maker",
        learn: {
            title: "",
            text: "We know it, DeFi everything is permissionless, that's also mean that anyone can become a market maker allowing other people swapping one token for another including a small fee for the persons who added liquidity for it."
        },
        ressources:["Liquidity is key in an AMM ! The more liquidity there is inside the less the price impact will be when exchanging large amount of token against another "],
        description: 
        <Box>
            <Text display={"inline-block"} mb="3" color={"teal.400"}>Your are given 100 DAI<br />Your are given 100 GHST</Text>
            <Text>Create a liquidity pool with these two tokens</Text>
        </Box>,
        help: <Link href="https://research.paradigm.xyz/amm-price-impact">https://research.paradigm.xyz/amm-price-impact</Link>,
    },
    {
        id: '8',
        title: "Price impact",
        learn: {
            title: "Wallets",
            text: ""
        },
        ressources: ["Be careful some token can have the same name or same symbol but that does not mean they are the same ! The only true and unique identifier is his address."],
        description:
            <Box>
                <Text display={"inline-block"} mb="3" color={"teal.400"}>Your are given 100 DAI<br />Your are given 100 GHST<br />A DAI/GHST pool is created.</Text>
                <Text>Quadruple (+300%) the price of GHST against DAI</Text>
                <Text>(5% slippage allowed)</Text>
            </Box>,
        help: <></>,
    },
    {
        id: '9',
        title: "Printer goes bRrRrRrRrRR",
        learn: {
            title: "",
            text: "What make the price of an asset ? Well by comparing with a another one ! :D",
        },
        ressources: ["Be careful some token can have the same name or same symbol but that does not mean they are the same ! The only true and unique identifier is his address."],
        description: 
        <Box>
            <Text display={"inline-block"} mb="3" color={"teal.400"}>Your given 25 USDC</Text>
            <Text>Become a millionnaire.</Text>
        </Box>,
        help: <Text px="5">Create token ERC 20 module</Text>,
    },
    {
        id: '10',
        title: "The spread",
        learn: {
            title: "Wallets",
            text: ""
        },
        ressources: ["https://academy.binance.com/en/articles/what-is-an-automated-market-maker-amm"],
        description: <Box><Text>Your given 1 USDC Your given 1 GHST Become a GHST trillionnaire using your AMM.</Text></Box>,
        help: <></>,
    },
    {
        id: '11',
        title: "Price impact 2",
        learn: {
            title: "",
            text: "Liquidity is key in an AMM ! The more liquidity there is inside the less the price impact will be when exchanging large amount of token against another "
        },
        ressources: null,
        description: <Box><Text>Your are given 10.000.000 DAI Your are given 10.000.000 GHST A DAI/GHST pool is created. swap at least 10.000 GHST without causing more than 1% of price impact</Text></Box>,
        help: <></>,
    },
    {
        id: '12',
        title: "Arbitrage",
        learn: {
            title: "Wallets",
            text: ""
        },
        ressources: ["https://academy.binance.com/en/articles/what-is-an-automated-market-maker-amm"],
        description: <Box><Text>You are given 100 USDC Your are given 2 AMM with the same pool GHST/USDC finish the level with 200 USDC</Text></Box>,
        help: <></>,
    },
    {
        id: '13',
        title: "Kimchi premium",
        learn: {
            title: "Wallets",
            text: ""
        },
        ressources: ["https://academy.binance.com/en/articles/what-is-an-automated-market-maker-amm"],
        description: <Box><Text>You are given 1000 USDC You are given 1000 GHST You are given 2 AMM within one a pool USDC/GHST with a ratio 1/1 Decrease the value of GHST against USDC by at least 50% whitout making any swap</Text></Box>,
        help: <></>,
    },
]