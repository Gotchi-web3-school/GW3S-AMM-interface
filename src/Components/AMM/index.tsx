import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, useColorMode, useColorModeValue } from "@chakra-ui/react"
import Swap from "./Swap"
import { AddLiquidityProvider } from "../../Provider/AMM/AddLiquidityProvider"
import { SwapProvider } from "../../Provider/AMM/SwapProvider"
import { PoolProvider } from "../../Provider/AMM/PoolsProvider";
import { Pool } from "../../Models";
import Pools from "./Pools"
import { darkTab, lightTab } from "../../theme";
import { TokenList } from "../../Constants/list";

type AMMargs = {
    isSwap?: boolean
    isPool?: boolean
    initCode?: string
    factory?: string 
    pools?: Pool[] 
    tokenList?: TokenList[]
    bgImage?: string
}

const AMM: React.FC<AMMargs> = ({
    isSwap = true,
    isPool = true,
    initCode, 
    factory, 
    pools,
    tokenList,
    bgImage
}) => {
    const { colorMode } = useColorMode()
    return (
        <Flex textColor={useColorModeValue("black", "whiteAlpha.800")} flexDirection="column">
            <Tabs
            isFitted 
            variant="enclosed"
            mx={"auto"}
            width="md !important"
            pt={5}
            px={{ base: 2, sm: 5, md: 17 }}
            py={4}
            borderRadius={"3xl"}
            shadow="lg"
            bg={useColorModeValue("white", "gray.800")}
            zIndex={1}
            >
                <TabList color={useColorModeValue("black", "whiteAlpha.300")} border={"none"} mb='2rem'>
                    {isSwap && <Tab sx={colorMode === "dark" ? darkTab : lightTab}>Swap</Tab>}
                    {isPool && <Tab sx={colorMode === "dark" ? darkTab : lightTab}>Pools</Tab>}
                </TabList>

                <TabPanels >
                   {isSwap && <TabPanel>
                        <SwapProvider initCode={initCode} factory={factory} defaultTokenList={tokenList}>
                            <Swap />
                        </SwapProvider>
                    </TabPanel>
                   }
                    <TabPanel p="0">
                        <PoolProvider defaultPools={pools} initCode={initCode} factory={factory} defaultTokenList={tokenList}>
                            <AddLiquidityProvider initCode={initCode} factoryAddress={factory}>
                                <Pools />
                            </AddLiquidityProvider>
                        </PoolProvider>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {/* <Analytics /> */}

        </Flex>
    )
}

export default AMM