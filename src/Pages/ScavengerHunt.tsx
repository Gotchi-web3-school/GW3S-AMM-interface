import { useNavigate } from "react-router-dom";
import { Box, Input, Center, VStack, Button, Text } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchChest } from "../Lib/Smart-contracts/Chests"
import Chest from "../Components/Chests/Chest"

const ScavengerHunt: React.FC = () => {
  const signer = useWeb3React()
  const navigate = useNavigate();
  const { address } = useParams()
  const [isChest, setIsChest] = useState(false)
  const [searchInput, setSeachInput] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (address && signer.account) {
      setLoading(true)
      fetchChest(signer, address).then(result => {
        setIsChest(result.found)
        setLoading(false)
      })
    }
  }, [address, signer])

  return (
  <Box h="100vh">
    {isChest ? 
      <Center>
        <VStack maxW="50%" mt="15%">
          <Text>Chest found !</Text>
          <Chest /> 
        </VStack>
      </Center>
      :
      <Center>
        <VStack maxW="50%" mt="15%">
            {!loading && address && <Text>Chest not Found</Text>}
            <Input onChange={(e) => setSeachInput(e.target.value)} placeholder='Search chest' size='lg' />
            <Button isLoading={loading} onClick={() => navigate(`/chest/${searchInput}`)}>Dig</Button>
        </VStack>
      </Center>
    }
  </Box>
  )
}

export default ScavengerHunt