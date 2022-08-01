import { Box, Button, Text, Image, useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  const book = require("../../Assets/pixel book.png")

const Ressource: React.FC<{ressource: string | null, learn: string | null}> = ({ressource, learn}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Box as="button" onClick={onOpen}>
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
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{ressource}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default Ressource;