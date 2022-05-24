import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import {useWeb3React} from '@web3-react/core';
import { injected } from '../../lib/connectors';
  
const Navbar: React.FC = () => {
  const {chainId, account, active, activate, deactivate} = useWeb3React();

  const handleConnect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    active ? deactivate() : activate(injected)
  }

  return (
    <Box>
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minH={'10vh'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'left', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Logo
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}>
            {active ? chainId : "Network"}
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}
            onClick={handleConnect}>
            {active ? account : "Connect"}
          </Button>
        </Stack>

      </Flex>
    </Box>
  );
}

export default Navbar