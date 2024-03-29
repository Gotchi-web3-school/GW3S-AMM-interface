import { Box, Text, Image, useDisclosure, Link } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ListItem,
    UnorderedList,
  } from '@chakra-ui/react'
  const book = require("../../Assets/general/pixel book.png")

export type RessourceParams = {
  title: string | null,
  text: string | null
  extraRessources: string[] | null
}  

const Ressource: React.FC<RessourceParams> = ({title, text, extraRessources}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Box as="button" minW="18%" onClick={onOpen}>
          <Image boxSize={"5rem"} src={book}/>
        </Box>
        
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="4xl">{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>{text}</Box>
            </ModalBody>
            <UnorderedList p="5">
              <Text mb="3" textAlign="center" fontSize={"xl"} fontWeight="bold">See more</Text>
              {extraRessources?.map((ressource: string, idx) => {
                return (
                  <ListItem key={idx}>
                    <Link  href={ressource} isExternal>{ressource}</Link>
                  </ListItem>
                )
              })}
            </UnorderedList>
          </ModalContent>
        </Modal>
      </>
    )
}

export default Ressource;