import {
    Stack,
    Button,
    Box,
    Center,
  } from "@chakra-ui/react";
  import { AddIcon } from '@chakra-ui/icons'
  import InputToken from "../InputToken"
  import PoolShare from "./PoolShare";

const AddLiquidity: React.FC = () => {
    return (
      <Box >
        <InputToken idx={0} />
        <Center>
          <AddIcon my="4"/>
        </Center>
        <InputToken idx={1} />

        <PoolShare />

        <Stack direction={'row'} m="4" >
          <Button w="100%" h="3rem">Approve</Button>
          <Button w="100%" h="3rem">Swap</Button>
        </Stack>
      </Box>
    )
}

export default AddLiquidity