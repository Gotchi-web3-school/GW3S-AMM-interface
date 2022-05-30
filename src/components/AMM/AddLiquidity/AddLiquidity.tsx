import { useContext } from "react"
import { useWeb3React } from "@web3-react/core";
import {Button, Box, Center, Stack } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import { injected } from '../../../lib/connectors';
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import InputToken0 from "./InputToken0"
import InputToken1 from "./InputToken1"
import PoolShare from "./PoolShare";
import MintButton from "./MintButton";

const AddLiquidity: React.FC = () => {
  const web3 = useWeb3React()
  const { pair, isApproved, token0, token1 } = useContext(AddLiquidityContext)

  return (
    <Box >
      <InputToken0 />
      <Center>
        <AddIcon my="4"/>
      </Center>
      <InputToken1 />

      {pair && <PoolShare />}
      <Stack mt="3"  direction="row">
        {!isApproved.token0 ? <Button bg="yellow.600" _hover={{bg: "yellow.700"}} w="100%">Approve {token0?.symbol}</Button> : ""}
        {!isApproved.token1 ? <Button bg="yellow.600" _hover={{bg: "yellow.700"}} w="100%">Approve {token1?.symbol}</Button> : ""}
      </Stack>

      {!web3.active ? 
        <Button mt="3" w="100%" h="4rem" onClick={() =>  web3.activate(injected)}>Connect</Button>
        : 
        <MintButton />
      }
    </Box>
  )
}

export default AddLiquidity