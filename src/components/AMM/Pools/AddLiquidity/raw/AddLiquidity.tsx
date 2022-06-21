import { useContext, useState } from "react"
import { useWeb3React } from "@web3-react/core";
import {Button, Box, Text, Center, Stack, HStack, Spacer, Spinner, useToast } from "@chakra-ui/react";
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { injected } from '../../../../../Connectors/connectors';
import { AddLiquidityContext } from "../../../../../Provider/AddLiquidityProvider";
import { ContractContext } from "../../../../../Provider/ContractProvider";
import { Token } from "gotchiw3s-sdk";
import { ROUTER_ADDRESS, GlobalConst } from "../../../../../Constants";
import InputToken0 from "./InputToken0";
import InputToken1 from "./InputToken1";
import PoolShare from "./PoolShare";
import MintButton from "./MintButton";

const AddLiquidity: React.FC<{setState: React.Dispatch<string>}> = ({setState}) => {
  const { active, activate } = useWeb3React();
  const { pair, isApproved } = useContext(AddLiquidityContext);
  const { ERC20 } = useContext(ContractContext);
  const toast = useToast()
  const [loading0, setLoading0] = useState<boolean>(false)
  const [loading1, setLoading1] = useState<boolean>(false)

  const handleClickButton = async (token: Token, idx: number) => {
    try {
      const contract = ERC20?.attach(token.address)
      const tx = await contract?.approve(ROUTER_ADDRESS, GlobalConst.utils.MAX_INT)
      idx === 0 ? setLoading0(true) : setLoading1(true)
      toast({
        title: `Approve: ${token.symbol}`,
        description: `transaction pending at: ${tx.hash}`,
        position: "top-right",
        status: "warning",
        isClosable: true,
        })
      const receipt = await tx.wait()
      toast({
        title: `Approve: ${token.symbol}`,
        description: `${token.symbol} token approved successfully !`,
        position: "top-right",
        status: "success",
        duration: 6000,
        isClosable: true,
        })
      console.log(receipt)
      idx === 0 ? setLoading0(false) : setLoading1(false)
      if (isApproved) 
        idx === 0 ? isApproved.token0 = true : isApproved.token1 = true
    } catch (error: any) {
      toast({
        position: "bottom-right",
        title: 'An error occurred.',
        description: `Add Liquidity: ${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      idx === 0 ? setLoading0(false) : setLoading1(false)
    }
  }

  return (
    <Box >
      <HStack mb="3rem">
          <Button w="45%" pr="0" bgGradient='linear(to-l, red.500, transparent)' _hover={{bg: 'red.500'}} justifyContent={"left"} onClick={() => setState("remove")}>
              <Text fontSize={"sm"}><ChevronLeftIcon />Remove liquidity</Text>
          </Button>
          <Spacer />
          <Button w="45%" pl="0" bgGradient='linear(to-r, blue.500, transparent)' _hover={{bg: 'blue.500'}} justifyContent={"right"} onClick={() => setState("pool")}>
              <Text fontSize={"sm"}>Pools<ChevronRightIcon /></Text>
          </Button>
      </HStack>
      <InputToken0 />
      <Center>
        <AddIcon my="4"/>
      </Center>
      <InputToken1 />

      {pair && <PoolShare />}
      <Stack mt="3"  direction="row">
        {isApproved?.token0 ? "" : pair && isApproved !== undefined && <Button disabled={loading0} key={0} onClick={() => handleClickButton(pair.token0, 0)} bg="yellow.600" _hover={{bg: "yellow.700"}} w="100%">{loading0 ? <Spinner /> : `Approve ${pair.token0?.symbol}`}</Button>}
        {isApproved?.token1 ? "" : pair && isApproved !== undefined && <Button disabled={loading1} key={1} onClick={() => handleClickButton(pair.token1, 1)} bg="yellow.600" _hover={{bg: "yellow.700"}} w="100%">{loading1 ? <Spinner /> : `Approve ${pair.token1?.symbol}`}</Button>}
      </Stack>

      {!active ? 
        <Button mt="3" w="100%" h="4rem" onClick={() =>  activate(injected)}>Connect</Button>
        : 
        <MintButton />
      }
    </Box>
  )
}

export default AddLiquidity