import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue } from "@chakra-ui/react"
import Swap from "./Swap"
import { AddLiquidityContextProvider } from "../../Provider/AddLiquidityProvider"
import { SwapContextProvider } from "../../Provider/SwapProvider"
import { PoolContextProvider } from "../../Provider/PoolsProvider";

import Pools from "./Pools"

const AMM: React.FC = () => {
    return (
        <Flex textColor={useColorModeValue("black", "whiteAlpha.800")} flexDirection="column">
            <Tabs
            isFitted 
            variant="enclosed"
            mx={"auto"}
            overflow={"scroll"}
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

                <TabPanels>
                    <TabPanel>
                        <SwapContextProvider>
                            <Swap />
                        </SwapContextProvider>
                    </TabPanel>
                    <TabPanel p="0">
                        <PoolContextProvider>
                            <AddLiquidityContextProvider>
                                <Pools />
                            </AddLiquidityContextProvider>
                        </PoolContextProvider>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {/* <Analytics /> */}

        </Flex>
    )
}

export default AMM