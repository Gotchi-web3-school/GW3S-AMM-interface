import { Button } from "@chakra-ui/react"
import React from "react"
import { TokenPool} from "../../../../Models"

const MaxButton: React.FC<{token: TokenPool, dispatch: React.Dispatch<any>}> = ({token, dispatch}) => {
    return (
        <Button 
            onClick={() => dispatch({type: "HANDLE_INPUTS", payload: {id: token.id, amount: token.balance?.toFixed(0) ?? "0"}})} 
            size={"sm"} 
            bg="blue.500" 
            mt="1" 
            mr="3">
            Max
        </Button>
    )
}

export default MaxButton