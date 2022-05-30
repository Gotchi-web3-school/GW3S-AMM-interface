import { useContext } from "react"
import { Stack, Button } from "@chakra-ui/react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"

const MintButton: React.FC = () => {
    const { token0, token0Logo, token0Balance } = useContext(AddLiquidityContext)
    return (
        <Stack direction={'row'} m="4" >
          <Button w="100%" h="3rem">Approve</Button>
          <Button w="100%" h="3rem">Swap</Button>
        </Stack>
    )
}

export default MintButton