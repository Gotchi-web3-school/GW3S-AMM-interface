import React, { useEffect, useState } from "react"
import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Image,
    Button,
    Center,
  } from '@chakra-ui/react'
import { fetchLootsMetadatas, Reward } from "../../Lib/Smart-contracts/Rewards"
import { useWeb3React } from "@web3-react/core"
import { chests } from "../../Constants/chest"
import { OpennedChest } from "../../Models"
const emptyChest = require("../../Assets/chests/empty chest.png")

const ModalOpenChest: React.FC<{chest: OpennedChest, isOpen: boolean, onClose: () => void}> = ({chest, isOpen, onClose}) => {
  const signer = useWeb3React()
  const [rewards, setRewards] = useState<Array<Reward | undefined>>([])

  // Call the metatadas of all the loots (all the loots are NFTs)
  useEffect(() => {
    if (chest.loots.length > 0)
      fetchLootsMetadatas(chest, signer).then(result => {console.log(result); setRewards(result)})
  }, [chest, signer])
  
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent minW="50vh" bg="#323232" borderRadius={"50px"} maxH="50vh" top="15%">
        <ModalHeader textAlign="center" fontSize={"2rem"}>{chest.loots.length > 0 ? "Congratulation !" : "Empty chest"}</ModalHeader>
        <Box>
          {rewards.length > 0 ?
          <>
            {rewards.map((reward, idx) => {
              if (reward === undefined) {
                return (<Center key={idx}>{chests["unknown"][0].spinning}</Center>)
              } else {
                return(
                  <Box key={idx}>
                    {chests[reward.type][parseInt(reward.levelId)].spinning}
                    <Text>{reward.quantity}</Text>
                  </Box>
                  )
                }
              })}
          </>
          :
          <Box mt="-2rem" display={"flex"} justifyContent="center">
            <Image boxSize={"40vh"} src={emptyChest} />
          </Box>
        }
        </Box>
      <Button mx="auto" mb="5" p="5" onClick={onClose}>Close</Button>
      </ModalContent>
    </Modal>
  )
}

export default ModalOpenChest;