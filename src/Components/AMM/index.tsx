import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from "@chakra-ui/react"
import Swap from "./Swap"
import { AddLiquidityProvider } from "../../Provider/AMM/AddLiquidityProvider"
import { SwapProvider } from "../../Provider/AMM/SwapProvider"
import { PoolProvider } from "../../Provider/AMM/PoolsProvider";
import { Pool } from "../../Models";

import Pools from "./Pools"
import { TokenList } from "../../Constants/list";

const AMM: React.FC<{initCode?: string, factoryAddress?: string, pools?: Pool[], tokenList?: TokenList[], bgImage?: string}> = ({
    initCode, 
    factoryAddress, 
    pools,
    tokenList,
    bgImage
}) => {
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
                <TabList 
                color={useColorModeValue("black", "whiteAlpha.300")} 
                border={"none"} 
                mb='2rem'
                >
                    <Tab
                    mr="3"
                    background={useColorModeValue("gray.200", "")}
                    transition=".5s" 
                    borderRadius={"xl"} 
                    _selected={{boxShadow: useColorModeValue("2px 2px 10px black", "0px 0px, 0px 4px 5px white"), 
                                textShadow: useColorModeValue("0px 0px 10px black", "0px 0px 20px white"),
                                fontWeight: "bold",
                                color: useColorModeValue("black", "white")}} 
                    border={"none"}
                    >Swap</Tab>
                    <Tab
                    background={useColorModeValue("gray.200", "")}
                    borderRadius={"xl"} 
                    _selected={{boxShadow: useColorModeValue("2px 2px 10px black", "0px 0px, 0px 4px 5px white"), 
                                textShadow: useColorModeValue("0px 0px 10px black", "0px 0px 20px white"),
                                fontWeight: "bold",
                                color: useColorModeValue("black", "white")}}
                    border={"none"}>Pools</Tab>
                </TabList>

                <TabPanels >
                    <TabPanel>
                        <SwapProvider initCode={initCode} factoryAddress={factoryAddress}>
                            <Swap />
                        </SwapProvider>
                    </TabPanel>
                    <TabPanel p="0">
                        <PoolProvider pools={pools}>
                            <AddLiquidityProvider>
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