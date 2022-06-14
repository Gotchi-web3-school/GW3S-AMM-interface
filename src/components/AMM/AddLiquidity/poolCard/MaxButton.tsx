import { Button, Icon } from "@chakra-ui/react"
import React from "react"
import { TokenPool} from "../../../../Models"

const MaxButton: React.FC<{token: TokenPool, dispatch: React.Dispatch<any>}> = ({token, dispatch}) => {
    return (
        <Button 
            onClick={() => dispatch({type: "HANDLE_INPUTS", payload: {id: token.id, amount: token.balance?.toExact() ?? "0"}})} 
            size={"xxs"} 
            bg="blue.500"
            mx="2"
            fontSize={"xxs"}
            value={" yo"}
            >
            <Icon viewBox='0 0 0 0' color='blue.500'>
            <path fill='currentColor' d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        />
            </Icon>
        </Button>
    )
}

export default MaxButton