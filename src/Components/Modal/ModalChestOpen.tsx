import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Image,
    Button,
    Stack,
  } from '@chakra-ui/react'
import { Reward } from "../../Lib/Smart-contracts/Rewards"
import { chests } from "../../Constants/chest"
import useSound from 'use-sound'
const emptyChest = require("../../Assets/chests/empty chest.png")
const closingChestSound = require("../../Assets/sounds/closing chest.mp3")

const ModalOpenChest: React.FC<{chest: Array<Reward | undefined>, isOpen: boolean, onClose: () => void}> = ({chest, isOpen, onClose}) => {
  const [play] = useSound(closingChestSound, {volume: 0.6})
  return (
    <Modal
    onClose={onClose}
    isOpen={isOpen}
    closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent 
      bg="#323232" 
      top="15%"
      px="10" 
      borderRadius={"50px"}
      minW={chest.length > 5 ? "90vw" : "max"} 
      overflowX={"scroll"} 
      >
        <ModalHeader p="0" mt="5" textAlign="center" fontSize={"2rem"}>{chest.length > 0 ? "Congratulation !" : "Empty chest"}</ModalHeader>
        <Text mb="5" textAlign={"center"} fontStyle="italic">{`You looted ${chest.length} items`}</Text>
        {chest.length > 0 ?
          <Stack direction="row" justifyContent={"center"} spacing="4rem">
            {chest.map((reward, idx) => {
              if (reward === undefined) {
                return chests["unknown"][0].spinning
              } else {
                return(
                  <Box key={idx}>
                    {chests[reward.type_][reward.levelId].spinning}
                    <Text mt="1rem" fontSize={"xl"} textAlign={"center"} fontWeight={"bold"}>{`${reward.ticker}   x ${reward.quantity}`}</Text>
                  </Box>)
              }
            })}
          </Stack>
          :
          <Box mt="-2rem" display={"flex"} justifyContent="center">
            <Image boxSize={"40vh"} src={emptyChest} />
          </Box>
        }
      <Button mx="auto" mt="3rem" mb="1rem" bgColor={"red.500"} onClick={() => {play(); onClose()}}>Close</Button>
      </ModalContent>
    </Modal>
  )
}

export default ModalOpenChest;