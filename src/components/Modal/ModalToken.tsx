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
import { AddLiquidityContext } from "../../Provider/AddLiquidityProvider"
import { DEFAULT_TOKEN_LIST_URL } from "../../Constants/list"
import { SelectToken } from "../../Models"
import { fetchTokenData } from "../../lib/utils"
import TokenSelect from "../AMM/Pools/AddLiquidity/raw/TokenSelect"
import { Token } from "quickswap-sdk";


const ModalTokens: React.FC<{isOpen: boolean, onClose: () => void, idx: number}> = ({isOpen, onClose, idx}) => {
  let { token0, token1, dispatch } = useContext(AddLiquidityContext)
  const { library, chainId } = useWeb3React()
  const [tokens] = useState<SelectToken[]>(DEFAULT_TOKEN_LIST_URL.tokens)
  const [searchInput, setSearchInput] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchedToken, setSearchedToken] = useState<SelectToken | null>(null)

  const handleSearchButton = () => {
    if (searchedToken) {
      tokens.unshift(searchedToken)
      dispatch({type: "SET_TOKEN", payload: {id: idx, token: searchedToken}})
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
                  <Button disabled={token0?.address === searchedToken.address || token1?.address === searchedToken.address} onClick={handleSearchButton} w="100%" py="2rem" borderRadius={"0"} bg="0">
                    <TokenSelect token={new Token(searchedToken.chainId, searchedToken.address, searchedToken.decimals)} img={""} />
                  </Button>
                }
              </Box>
              :
              <Stack >
                {DEFAULT_TOKEN_LIST_URL.tokens.map((token, key) => {
                  tokens[key] = token
                  const isDisabled = token0?.address === token.address || token1?.address === token.address
                    return (
                      <Button 
                        disabled={isDisabled} 
                        py="2rem" borderRadius={"0"} 
                        bg="0" 
                        key={key} 
                        onClick={() =>  {dispatch({type: "SET_TOKEN", payload: {id: idx, token: tokens[key]}});  onClose()}}
                      >
                        <TokenSelect token={new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)} img={token.logoURI} />
                      </Button>
                    )
                  }
                )}
              </Stack>
            }
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default ModalTokens;