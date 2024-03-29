import { useState, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { VStack, Text, Box, Input, Button, Spinner, useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { useColorModeValue } from "@chakra-ui/react";
import { deployErc20Tx } from "../../Lib/Smart-contracts/erc20"
import { IDeployErc20Tx } from "../../Models";
import { GeneralContext } from "../../Provider/GeneralProvider";
import { deployErc20ByInstances } from "../../Lib/Smart-contracts/Levels";

const Erc20Generator: React.FC<{instanceLevel?: number, instanceAddress?: string}> = ({instanceLevel, instanceAddress}) => {
    const signer = useWeb3React()
    const {chainId} = signer
    const { setUserTokens } = useContext(GeneralContext)
    const toast = useToast()
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = (data: any) => {
        const tx: IDeployErc20Tx = {
            signer: signer,
            name: data.name,
            ticker: data.ticker,
            supply: data.supply,
            toast: toast,
            setUserTokens: setUserTokens,
        }
        setLoading(true)
        if (instanceLevel) {
            switch (instanceLevel){
                case 9:
                    deployErc20ByInstances[9]!(tx, instanceAddress!).then(() => setLoading(false))
                    break
                default:
                    console.error("The instance doesn't include eth erc20 module");
            }
        }
        else
            deployErc20Tx(tx).then(() => setLoading(false))
    }
    return (<>
        
        <Box 
        ml="3"
        pt={5}
        px={{ base: 2, sm: 5, md: 17 }}
        py={4}
        minH="28rem"
        width="md !important"
        textShadow={useColorModeValue( "", "1px 1px 15px white")}
        borderBlockEnd="solid"
        borderBlockStart="solid"
        bg="blackAlpha.400"
        borderRadius={"3xl"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack display={"flex"} justifyContent="left" spacing={6} textAlign="left">
                    <Box textAlign="center">
                        <Text fontStyle={"italic"} fontWeight="bold" fontSize={"3xl"}>Smart Contract</Text>
                        <Text>ERC20 token</Text>
                    </Box>
                    <Box  >
                        <Text fontWeight="bold">Name</Text>
                        <Input 
                        placeholder="Best token ever"
                        {...register("name", { required: true })}
                        />
                    </Box>
                    <Box >
                        <Text fontWeight="bold">Ticker</Text>
                        <Input
                        border={useColorModeValue( "1px solid black", "1px solid white")}
                        placeholder="BTE"
                        {...register("ticker", { required: true })}
                        />
                    </Box>
                    <Box >
                        <Text fontWeight="bold">Total supply</Text>
                        <Input 
                        placeholder="1.000.000"
                        type="number"
                        {...register("supply", { required: true })}
                        />
                    </Box>
                    {chainId === 80001 ? loading ? <Spinner /> : <Button type="submit">Deploy token</Button> : ""}
                </VStack>
            </form>
        </Box>
    </>)
}

export default Erc20Generator