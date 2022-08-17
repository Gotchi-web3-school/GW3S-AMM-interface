import React, { useEffect, useState } from "react"
import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { fetchLootsMetadatas, Reward } from "../../Lib/Smart-contracts/Rewards"
import { useWeb3React } from "@web3-react/core"
import { chests } from "../../Constants/chest"
import { OpennedChest } from "../../Models"

const ModalOpenChest: React.FC<{loots: OpennedChest, isOpen: boolean, onClose: () => void}> = ({loots, isOpen, onClose}) => {
  const signer = useWeb3React()
  const [rewards, setRewards] = useState<Array<Reward | undefined>>([])

  // Call the metatadas of all the loots (all the loots are NFTs)
  useEffect(() => {
    fetchLootsMetadatas(loots, signer).then(result => setRewards(result))
  }, [loots, signer])
  
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent maxW="100vh">
        <ModalHeader>{loots.addresses.length > 0 ? "Congratulation !" : "This chest is empty"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody m="0" p="0">
          {rewards.map(reward => {
            if (reward === undefined) {
              return chests["unknown"][0].spinning
            } else {
              return(
                <Box>
                  {chests[reward.type][parseInt(reward.levelId)].spinning}
                  <Text>{reward.quantity}</Text>
                </Box>
                )
            }
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalOpenChest;