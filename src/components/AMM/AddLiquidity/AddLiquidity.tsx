import {
    Stack,
    Button,
    Box,
    Center,
  } from "@chakra-ui/react";
  import { AddIcon } from '@chakra-ui/icons'
  import InputToken0 from "./InputToken0"
  import InputToken1 from "./InputToken1"
  import PoolShare from "./PoolShare";
  import { useWeb3React } from "@web3-react/core";
  import { injected } from '../../../lib/connectors';

const AddLiquidity: React.FC = () => {
  const web3 = useWeb3React()

  return (
    <Box >
      <InputToken0 />
      <Center>
        <AddIcon my="4"/>
      </Center>
      <InputToken1 />

      <PoolShare />

      {!web3.active ? 
        <Button mt="3" w="100%" onClick={() =>  web3.activate(injected)}>Connect</Button>
        : 
        <Stack direction={'row'} m="4" >
          <Button w="100%" h="3rem">Approve</Button>
          <Button w="100%" h="3rem">Swap</Button>
        </Stack>
      }
    </Box>
  )
}

export default AddLiquidity