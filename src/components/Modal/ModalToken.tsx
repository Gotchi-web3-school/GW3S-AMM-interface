import { DEFAULT_TOKEN_LIST_URL } from "../../constants/list"
import { Token } from '@uniswap/sdk'
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

const ModalTokens: React.FC<{isOpen: boolean, onClose: () => void, idx: number}> = (props) => {
  
    return (
        <Modal
          onClose={props.onClose}
          isOpen={props.isOpen}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack spacing='24px'>
                    {DEFAULT_TOKEN_LIST_URL.tokens.map((el, idx) => {
                    const logo: string = el.logoURI
                    const token: Token = new Token(el.chainId, el.address, el.decimals, el.symbol, el.name)
                    return (<Button py="7" key={idx}><TokenSelect token={token} logo={logo} /></Button>)
                    })}
                </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={props.onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default ModalTokens;