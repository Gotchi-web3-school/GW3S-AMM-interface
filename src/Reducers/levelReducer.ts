import { LevelContextType } from "../Provider/LevelProvider";

export const levelReducer = (state: LevelContextType, action: any): LevelContextType => {
  //let {running, instanceAddress, hasCompleted, hasClaimed, factories, tokens} = state;

    // POOLS COMPONENT
    switch(action.type) {

        case "SET_LEVEL_STATE":
          return {
            ...state, 
            running: action.payload.running,
            instanceAddress: action.payload.instanceAddress,
            hasCompleted: action.payload.hasCompleted,
            hasClaimed: action.payload.hasClaimed,
            factories: action.payload.factories,
            tokens: action.payload.tokens
          }
        case "CLAIM":
          return {...state, hasClaimed: action.payload}

        case "COMPLETED":
          return {...state, hasCompleted: action.payload}

        case "INIT":
          return {...state, running: action.payload}

        case "RESET":
            return state

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }