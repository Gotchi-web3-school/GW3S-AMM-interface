import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  Stack,
} from '@chakra-ui/react'
import useSound from 'use-sound'
import { chests } from '../../Constants/chest'
const closingChestSound = require("../../Assets/sounds/closing chest.mp3")

const ModalChest: React.FC<{content: number, isOpen: boolean, onClose: () => void}> = ({content, isOpen, onClose}) => {
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
    minW={"max"} 
    overflowX={"scroll"} 
    >
      <ModalHeader p="0" mt="5" textAlign="center" fontSize={"2rem"}>{"Congratulation !"}</ModalHeader>
      <Text mb="5" textAlign={"center"} fontStyle="italic">{`You looted 1 item`}</Text>
        <Stack direction="row" justifyContent={"center"} spacing="4rem">
          {content === 0 ?
          <Box>
            {chests.land[0].front}
            <Text mt="1rem" fontSize={"xl"} textAlign={"center"} fontWeight={"bold"}>{`gotchiverse land: 8519 x 1`}</Text>
            <Text mt="1rem" fontSize={"xl"} textAlign={"center"} fontWeight={"bold"}>{`Coming Rounds Humble`}</Text>
          </Box>
          : ""}
          <Box>
            {chests.escape[0].spinning}
            <Text mt="1rem" fontSize={"xl"} textAlign={"center"} fontWeight={"bold"}>{`escape gotchi x 1`}</Text>
          </Box>
        </Stack>
    <Button mx="auto" mt="3rem" mb="1rem" bgColor={"red.500"} onClick={() => {play(); onClose()}}>Close</Button>
    </ModalContent>
  </Modal>
)
}

export default ModalChest;