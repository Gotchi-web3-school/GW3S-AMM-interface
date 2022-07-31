import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import {  SunIcon, MoonIcon, } from '@chakra-ui/icons'
import {useWeb3React} from '@web3-react/core';
import { getChainIdName } from '../../Lib/Utils';
import ConnectorButton from '../Buttons/ConnectorButton';
  
const Navbar: React.FC = () => {
  const {chainId, account, active} = useWeb3React();
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box >
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minH={'10vh'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'left', md: 'start' }}>
          <Text
            fontFamily={"Tourney"}
            fontStyle={"italic"}
            fontWeight={"bold"}
            fontSize={"3xl"}
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            color={useColorModeValue('gray.800', 'white')}>
            Gotchi web3 school
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          
          <Flex p="2" align={'center'} borderRadius={"lg"} boxShadow={"inset 0px 0px 5px 1px pink"}>
            {chainId && 
            <Text mr="1" fontWeight={600} bg={'transparent'} display="inline">
              {getChainIdName(chainId)}
            </Text>
            }
            <Text>{active ? chainId === 80001 ? '🟢' : '🟠' : '🔴'}</Text>
          </Flex>
          
          {chainId !== 80001 ? 
            <ConnectorButton /> 
            : 
            <Box p="2" fontWeight={"bold"} borderRadius={"lg"} boxShadow={"inset 0px 0px 5px 1px pink"}>{account}</Box>
          }

          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <SunIcon />: <MoonIcon />}
          </Button>
        </Stack>

      </Flex>
    </Box>
  );
}

export default Navbar