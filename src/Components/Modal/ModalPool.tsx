import React, { useContext, useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core";
import {
    Stack,
    Box,
    Text,
    Button,
    Input,
    Divider,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
  } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { PoolContext } from "../../Provider/AMM/PoolsProvider"
import { GeneralContext } from "../../Provider/GeneralProvider";
import { SelectToken } from "../../Models"
import { fetchTokenData } from "../../Lib/Utils"
import TokenSelect from "../AMM/Pools/Addliquidity/Raw/TokenSelect"
import { Token } from "gotchiw3s-sdk";


const ModalPool: React.FC<{isOpen: boolean, onClose: () => void, idx: number}> = ({isOpen, onClose, idx}) => {
  let { tokenA, tokenB, defaultTokenList, dispatch } = useContext(PoolContext)
  const { userTokens } = useContext(GeneralContext)
  const { library, chainId } = useWeb3React()
  const [tokens] = useState<SelectToken[]>(defaultTokenList)
  const [searchInput, setSearchInput] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchedToken, setSearchedToken] = useState<SelectToken | null>(null)

  const handleSearchButton = () => {
    if (searchedToken) {
      tokens.unshift(searchedToken)
      dispatch({type: "SET_IMPORTED_TOKEN", payload: {id: idx, token: searchedToken}})
      onClose()
      setSearchInput("")
      setSearchedToken(null)
    }
  }

  useEffect(() => {
    if (searchInput.length === 42 && chainId) {
      setIsSearching(true)
      fetchTokenData(searchInput, chainId, library).then(result => {
        setSearchedToken(result)
        setIsSearching(false)
      })
    }
  }, [searchInput, library, chainId])
  
  return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a token</ModalHeader>
          <ModalCloseButton />
          <Box p="1rem">
            <Input 
              id="search"
              name="search"
              placeholder="Search name or paste address"
              p="1rem"
              fontSize="xl"
              border={"1px"}
              borderRadius={"3xl"}
              borderColor={"gray.600"}
              variant="unstyled"
              onChange={e => setSearchInput(e.target.value)}
              value={searchInput}
              color={useColorModeValue("gray.700", "white")}
            />
          </Box>
          <Divider />
          <ModalBody m="0" p="0">
            <Text fontSize={"xl"} p="3">Token Name</Text>
            {searchInput ? 
              <Box h="50%">
                {isSearching ? <Spinner m="5" p="2" /> : searchedToken && 
                  <Button disabled={tokenA?.address === searchedToken.address || tokenB?.address === searchedToken.address} onClick={handleSearchButton} w="100%" py="2rem" borderRadius={"0"} bg="0">
                    <TokenSelect token={new Token(searchedToken.chainId, searchedToken.address, searchedToken.decimals)} img={""} />
                  </Button>
                }
              </Box>
              :
              <Tabs isManual variant='enclosed'>
                <TabList>
                  <Tab>Default list</Tab>
                  <Tab>Your tokens</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Stack >
                      {defaultTokenList.map((token, key) => {
                        tokens[key] = token
                        const isDisabled = tokenA?.address === token.address || tokenB?.address === token.address
                          return (
                            <Button 
                              disabled={isDisabled} 
                              py="2rem" borderRadius={"0"} 
                              bg="0" 
                              key={key} 
                              onClick={() => {dispatch({type: "SET_IMPORTED_TOKEN", payload: {id: idx, token: tokens[key]}});  onClose()}}
                            >
                              <TokenSelect token={new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)} img={token.logoURI ?? ""} />
                            </Button>
                          )
                        }
                      )}
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                  <Stack>
                      {userTokens && userTokens.map((token, key) => {
                        const isDisabled = tokenA?.address === token.address || tokenB?.address === token.address
                        return (
                          <Button 
                            disabled={isDisabled} 
                            py="2rem" borderRadius={"0"} 
                            bg="0" 
                            key={key} 
                            onClick={() =>  {dispatch({type: "SET_IMPORTED_TOKEN", payload: {id: idx, token: token}});  onClose()}}
                          >
                            <TokenSelect token={new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)} img={""} />
                          </Button>
                        )
                        })}
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            }
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default ModalPool;