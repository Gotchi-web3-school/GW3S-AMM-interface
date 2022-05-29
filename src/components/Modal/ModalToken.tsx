import React, { useContext, useState } from "react"
import { AddLiquidityContext } from "../../Provider/AddLiquidityProvider"
import { DEFAULT_TOKEN_LIST_URL } from "../../constants/list"
import {
    Stack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import TokenSelect from "../AMM/TokenSelect"
import { SelectToken } from "../../models"


const ModalTokens: React.FC<{isOpen: boolean, onClose: () => void, idx: number}> = ({isOpen, onClose, idx}) => {
    const [tokens] = useState<SelectToken[]>([])
    let { newToken } = useContext(AddLiquidityContext)
  
    return (
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack spacing='24px'>
                    {DEFAULT_TOKEN_LIST_URL.tokens.map((token, key) => {
                    tokens[key] = token
                    return (
                      <Button py="7" key={key} onClick={e => newToken(idx, tokens[key], onClose)}>
                        <TokenSelect token={token} />
                      </Button> )
                    })}
                </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default ModalTokens;