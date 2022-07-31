import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const Ressource: React.FC<{ressource: string | null, learn: string | null}> = ({ressource, learn}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
    <Box width="607px" height="146px" background="rgba(153, 114, 193, 0.99)" border="3px solid #7F00FE" borderRadius="50px">
        <Button onClick={onOpen}>Open Modal</Button>
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
    </Box>
    )
}

export default Ressource;